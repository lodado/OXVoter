import { createClient } from "@supabase/supabase-js";

import { isServerSide } from "@/shared/utils";

import Database from "./type";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/**
 * 서버에서는 높은 수준의 권한이 필요하고, 클라이언트에서는 제한된 권한을 가져야함(anon_key)
 * 다만 클라이언트에서 supabaseInstance를 직접 쓰진 말고
 * api interface를 호출해서 구현할 것
 */
export const SUPABASE_KEY = isServerSide()
  ? process.env.SUPABASE_SERVICE_ROLE_KEY!
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;


export const supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
