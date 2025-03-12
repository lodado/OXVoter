 

import { sanitizeUrl } from "@/shared/utils/sanitizeUrl";

import { AuthorizedParams, JWT, JWTParams, NextAuthSessionResponse, SessionParams, SignInParams } from "../../type";
import { AuthPort } from "../Port/index.server";
import refreshTokenFactory from "./refresh/refreshTokenFactory";

class AuthService {
  private AuthPort: typeof AuthPort;

  constructor(authPort: typeof AuthPort) {
    this.AuthPort = authPort;
  }

  refreshAccessToken = async (token: JWT): Promise<JWT> => {
    try {
      const refreshToken = (await refreshTokenFactory(token)) as JWT;

      this.AuthPort.updateAccount({
        newAccount: {
          refresh_token: refreshToken.refreshToken,
          access_token: refreshToken.accessToken,
          expires_at: refreshToken.expiresAt,
        },
      });

      return refreshToken;
    } catch (err) {
      console.log(`token error: ${JSON.stringify(err)}`);
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  };
  signIn = async ({ user, account }: SignInParams): Promise<boolean> => {
    if (account?.provider && ["github", "google", "naver", "kakao"].includes(account.provider)) {
      try {
        return await this.AuthPort.findOrCreateUser({ user, account });
      } catch (e) {
        console.log(e);
        return false;
      }
    }

    // console.log(`login ${user.id}, ${user.name} ${user.email}`)
    return true;
  };

  // unused
  authorized = ({ auth, request: { nextUrl } }: AuthorizedParams): boolean => {
    const isLoggedIn = !!auth?.user;

    const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
    return isOnDashboard || isLoggedIn;
  };

  jwt = async ({ token, account, user }: JWTParams): Promise<JWT> => {
    const nowTime = Math.floor(Date.now() / 1000);
    const isSignIn = !!user;

    if (isSignIn && account) {
      return {
        accessToken: account.access_token!,
        expiresAt:
          account.expires_at ??
          Math.floor(Date.now() / 1000 + (typeof account?.expires_in === "number" ? account.expires_in : 60000)),
        refreshToken: account.refresh_token,
        user,
        provider: account.provider as JWT["provider"],
      };
    }

    const shouldRefreshTime = token.expiresAt - 7 * 60 - nowTime;

    // console.log(shouldRefreshTime, 'ref', token.provider)

    if (shouldRefreshTime > 0) {
      return token;
    }

    return this.refreshAccessToken(token);
  };

  session = async ({ session: _session, token }: SessionParams): Promise<NextAuthSessionResponse> => {
    return {
      ..._session,
      user: token.user,
      error: token.error,
      expiresAt: token.expiresAt,
      provider: token.provider,
    };
  };

  async redirect(params: {
    url: string; // URL provided as callback URL by the client
    baseUrl: string; // Default base URL of site (can be used as fallback)
  }) {
    const { url, baseUrl } = params;

    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`;

    // Allows callback URLs on the same origin
    if (new URL(url).origin === baseUrl) return url;

    return sanitizeUrl(url);
  }
}

const AuthServiceInstance = new AuthService(AuthPort);
export default AuthServiceInstance;
