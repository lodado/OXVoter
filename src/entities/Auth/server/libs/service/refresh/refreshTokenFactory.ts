import { JWT } from "../../../type";
import githubRefreshToken from "./githubRefreshToken";
import googleRefreshToken from "./googleRefreshToken";
import kakaoRefreshToken from "./kakaoRefreshToken";

export default async function refreshTokenFactory(token: JWT) {
  const { provider } = token;

  switch (provider) {
    case "google":
      return googleRefreshToken({ token });
    case "kakao":
      return kakaoRefreshToken({ token });
    case "github":
      return githubRefreshToken({ token });
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
