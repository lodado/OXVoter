import { mapRepositoryErrorToUseCaseError } from "@/shared";

import { AuthRepositoryImpl } from "../repository";

export class Oauth2LoginUsecase {
  constructor(private AuthRepository: AuthRepositoryImpl) {}

  execute = async ({ href }: { href: string }) => {
    try {
      return this.AuthRepository.login({ href });
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error);
    }
  };
}
