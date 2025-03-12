import { beforeEach,describe, expect, it } from "vitest";

import { mapRepositoryErrorToUseCaseError } from "@/shared";

import { UserEntity } from "../entity";
import { AuthRepositoryImpl } from "../repository";
import { LogoutUseCase } from "./LogoutUseCase";

// In-memory AuthRepository implementation for testing
class InMemoryAuthRepository implements AuthRepositoryImpl {
  public loggedIn: boolean = true;
  private throwError: boolean = false;

  setThrowError(value: boolean) {
    this.throwError = value;
  }

  async login(): Promise<void> {
    this.loggedIn = true;
  }

  async logout(): Promise<void> {
    if (this.throwError) {
      throw new Error("Repository error");
    }
    this.loggedIn = false;
  }

  async getUserInfo() {
    return Promise.resolve(new UserEntity({ id: "123", name: "testUser", email: "" }));
  }
}

describe("LogoutUseCase", () => {
  let logoutUseCase: LogoutUseCase;
  let inMemoryAuthRepository: InMemoryAuthRepository;

  beforeEach(() => {
    inMemoryAuthRepository = new InMemoryAuthRepository();
    logoutUseCase = new LogoutUseCase(inMemoryAuthRepository);
  });

  describe("as is", () => {
    describe("when logout is successful", () => {
      it("should call the logout method of the auth repository", async () => {
        await logoutUseCase.execute();
        // We check if the loggedIn state is set to false after logout
        expect(inMemoryAuthRepository.loggedIn).toBe(false);
      });
    });

    describe("when logout fails", () => {
      it("should map and throw the repository error using mapRepositoryErrorToUseCaseError", async () => {
        inMemoryAuthRepository.setThrowError(true);

        await expect(logoutUseCase.execute()).rejects.toThrow();
        expect(inMemoryAuthRepository.loggedIn).toBe(true);
      });
    });
  });
});
