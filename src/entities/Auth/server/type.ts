import { NextRequest } from "next/server";
import { Account, Profile, Session } from "next-auth";
import { CredentialInput } from "next-auth/providers/credentials";

import { UserEntity } from "@/entities/Auth/core";

export type JWT = {
  user: UserEntity;
  error?: string;

  expiresAt: number;
  accessToken: string;
  refreshToken?: string; // 깃허브는 존재하지 않음
  provider: "github" | "kakao" | "google" | "naver";
};

export type SignInParams = {
  user: UserEntity;
  account: Account | undefined;
  profile: Profile | undefined;
  email: string | undefined;
  credentials: Record<string, CredentialInput> | undefined;
};

export type AuthorizedParams = {
  auth: Session | null;
  request: NextRequest;
};

export type JWTParams = {
  token: JWT;
  account?: Account | null;
  user?: UserEntity | null;
};

export type SessionParams = {
  session: Session;
  token: JWT;
};

export type NextAuthSessionResponse = Session & {
  user: UserEntity | null;
  error?: string;
  expiresAt: number;
  provider: Account["provider"];
};
