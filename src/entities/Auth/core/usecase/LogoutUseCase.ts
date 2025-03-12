import { mapRepositoryErrorToUseCaseError } from "@/shared";

import { AuthRepositoryImpl } from "../repository";

export class LogoutUseCase {
  constructor(private userAuthRepository: AuthRepositoryImpl) {}

  async execute(): Promise<void> {
    try {
      await this.userAuthRepository.logout();
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error);
    }
  }
}
