"use server";

import { AuthError } from "next-auth";

import { EDGE_DI_REPOSITORY } from "@/DI/edge.server";
import { Oauth2LoginUsecase } from "@/entities/Auth/core";
import { request } from "@/shared";

import { LOGIN_METHOD } from "./constant";

/**
 * 주의 - 이 명령은 되돌릴 수 없음
 */
export const handleDeleteUserId = async () => {
  return request({
    method: "DELETE",
    url: "/api/auth",
  });
};
 
export async function authenticateAction(formData: FormData) {
  const signupMethod = formData.get(LOGIN_METHOD);
  const href = formData.get("href") as string;
  try {
    await new Oauth2LoginUsecase(new EDGE_DI_REPOSITORY.Auth(signupMethod as string)).execute({ href });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
