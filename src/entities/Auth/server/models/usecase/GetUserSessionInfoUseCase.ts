import { cache } from "react";

import { mapRepositoryErrorToUseCaseError } from "@/shared/constants/error/error";

import { NextAuthSessionResponse } from "../../type";
import { AuthServerRepository } from "../index.server";

export class GetUserSessionInfoUseCase {
  constructor(private AuthRepository: AuthServerRepository) {}

  execute = cache(async (): Promise<NextAuthSessionResponse | undefined> => {
    try {
      return await this.AuthRepository.getUserSessionInfo();
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error);
    }
  });
}
