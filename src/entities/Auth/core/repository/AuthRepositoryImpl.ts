import exp from "constants";

import { UserEntity } from "../entity";

interface AuthRepositoryImpl {
  login({ href }: { href: string }): Promise<void>;
  logout(): Promise<void>;
  getUserInfo(): Promise<UserEntity | undefined>;
}

export default AuthRepositoryImpl;
