import { signOut } from "next-auth/react";

import { AuthRepositoryImpl, UserEntity } from "@/entities/Auth/core";

export default class AuthClientRepository implements AuthRepositoryImpl {
  private user: UserEntity;

  constructor(user?: UserEntity) {
    this.user = user!;
  }

  // 필요 없음
  login(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async logout(): Promise<void> {
    await signOut({ redirect: false });
  }
  getUserInfo(): Promise<UserEntity | undefined> {
    return Promise.resolve(this.user);
  }
}
