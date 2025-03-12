import { JWT } from "../../../type";

/*
 * github는 refresh token이 없다
 */
export default async function githubfreshToken({ token }: { token: JWT }) {
  throw token;
}
