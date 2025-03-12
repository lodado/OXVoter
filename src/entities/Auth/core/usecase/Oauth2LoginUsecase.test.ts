import { beforeEach,describe, expect, it } from "vitest";

import { mapRepositoryErrorToUseCaseError } from "@/shared";

import { UserEntity } from "../entity";
import { AuthRepositoryImpl } from "../repository";
import { Oauth2LoginUsecase } from "./Oauth2LoginUsecase";

// In-memory AuthRepository implementation for testing
class InMemoryAuthRepository implements AuthRepositoryImpl {
  private users: UserEntity[] = [];
  private throwError: boolean = false;

  setUser(user: UserEntity) {
    this.users.push(user);
  }

  // Helper method to control whether login should throw an error in tests
  setThrowError(value: boolean) {
    this.throwError = value;
  }

  async login(): Promise<void> {
    if (this.throwError) {
      throw new Error("Repository error");
    }
  }

  async logout(): Promise<void> {
    // No-op for this test
  }

  async getUserInfo(): Promise<UserEntity> {
    return Promise.resolve(this.users[0]);
  }
}

describe("LoginUseCase", () => {
  let loginUseCase: Oauth2LoginUsecase;
  let inMemoryAuthRepository: InMemoryAuthRepository;

  const userEntityMock = new UserEntity({
    id: "123",
    name: "testUser",
    email: "test@example.com",
    image: "https://example.com/image.png",
  });

  beforeEach(() => {
    inMemoryAuthRepository = new InMemoryAuthRepository();
    loginUseCase = new Oauth2LoginUsecase(inMemoryAuthRepository);
  });

  describe("as is", () => {
    describe("when login is successful", () => {
      it("should call the login method of the auth repository", async () => {
        inMemoryAuthRepository.setUser(userEntityMock);

        await loginUseCase.execute({ href: "test" });

        // Check if the user has been added to the in-memory store
        const storedUser = await inMemoryAuthRepository.getUserInfo();
        expect(storedUser).toEqual(userEntityMock);
      });

      it("should create a new UserEntity with the provided properties", async () => {
        inMemoryAuthRepository.setUser(userEntityMock);

        await loginUseCase.execute({ href: "test" });

        // Verify that the user entity properties are correct
        const storedUser = await inMemoryAuthRepository.getUserInfo();
        expect(storedUser).toEqual(
          expect.objectContaining({
            id: "123",
            name: "testUser",
            email: "test@example.com",
            image: "https://example.com/image.png",
          })
        );
      });
    });

    describe("when login fails", () => {
      it("should map and throw the repository error using mapRepositoryErrorToUseCaseError", async () => {
        inMemoryAuthRepository.setThrowError(true);

        // Expect the error to be mapped and thrown
        await expect(loginUseCase.execute({ href: "test" })).rejects.toThrow();
      });
    });
  });
});
