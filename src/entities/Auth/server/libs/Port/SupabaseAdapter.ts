import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";

import { USER_ID_SPLITTER } from "@/shared";
import { SUPABASE_KEY, SUPABASE_URL, supabaseInstance } from "@/shared/index.server";
import Database from "@/shared/libs/supabase/type";

const columnNames = [
  "expires_at",
  "type",
  "provider",
  "providerAccountId",
  "refresh_token",
  "access_token",
  "token_type",
  "scope",
  "id_token",
  "session_state",
  "oauth_token_secret",
  "oauth_token",
  "id",
  "userId",
];

const supabaseAdapterWrapper = () => {
  const supaAdapter = SupabaseAdapter({
    url: SUPABASE_URL,
    secret: SUPABASE_KEY,
  }) as any; // 타입 지원이 잘 안됨;

  const supabase = createClient<Database, "next_auth">(SUPABASE_URL, SUPABASE_KEY, {
    db: { schema: "next_auth" },
    global: { headers: { "X-Client-Info": "@auth/supabase-adapter" } },
    auth: { persistSession: false },
  });

  const updateAccount = async ({ newAccount }: any) => {
    const updatedValue = {
      refresh_token: newAccount.refreshToken,
      access_token: newAccount.accessToken,
      expires_at: newAccount.expiresAt,
    };

    const { error } = await supabase
      .from("accounts")
      .update(updatedValue)
      .match({ providerAccountId: newAccount.providerAccountId });

    if (error) throw error;
  };

  const preprocessedUserData = ({ user, account }: any) => {
    const providerId = `${USER_ID_SPLITTER}${account?.provider}`;

    return { ...user, id: user.id + providerId };
  };

  return () => {
    const findOrCreateUser = async ({ user, account }: any) => {
      const clonedUser = preprocessedUserData({ user, account });

      const row = await supaAdapter.getUserByAccount(account);

      // 이미 가입한 경우 pass, UX에 따라 수정해야할 수도 있음
      if (row) return true;

      const { id } = (await supaAdapter.createUser(clonedUser)) as { id: string };

      account.userId = id;

      const newAccount: { [key in string]: number | string } = {};

      // 특정 oauth의 경우 필요없는 key 값을 보내기도 함 (ex-google)
      columnNames.forEach((name) => {
        newAccount[name] = account[name];
      });

      await supaAdapter.linkAccount(newAccount);

      return true;
    };

    return { ...supaAdapter, updateAccount, findOrCreateUser } as any;
  };
};

const supabaseAdapterInstance = supabaseAdapterWrapper();
export default supabaseAdapterInstance;
