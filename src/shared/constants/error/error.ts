import { z } from "zod";

// Base Error Class for Clean Architecture
export class BaseError extends Error {
  constructor(params: { message?: string; originalError?: unknown; propagateStack?: boolean }) {
    const { originalError, message = "", propagateStack = true } = params;
    let error = originalError as Error;

    if (!(originalError instanceof Error)) {
      error = new Error((originalError ?? message ?? "") as string);
    }

    // Construct the final message
    let finalMessage = message ?? error.message;
    if (error) {
      finalMessage = `${message} ${error.message}`;
    }
    super(finalMessage);

    this.name = this.constructor.name;

    // Conditionally propagate stack trace
    if (propagateStack && error && error.stack) {
      this.stack = `${this.name} => ${error.stack}`;
    }
  }
}

// Entity Layer Error
export class EntityError extends BaseError {
  constructor(params: { message?: string; originalError?: unknown | Error; propagateStack?: boolean }) {
    super(params);
  }
}

// Repository Layer Error
export class RepositoryError extends BaseError {
  constructor(params: { message?: string; originalError?: unknown | Error; propagateStack?: boolean }) {
    super(params);
  }
}

// Use Case Layer Error
export class UseCaseError extends BaseError {
  constructor(params: { message?: string; originalError?: unknown | Error; propagateStack?: boolean }) {
    super(params);
  }
}

// Adapter Layer Error
export class AdapterError extends BaseError {
  constructor(params: { message?: string; originalError?: unknown | Error; propagateStack?: boolean }) {
    super(params);
  }
}

// Error Mappers Interfaces

// 매퍼 함수: Entity Layer -> Repository Layer
export function mapEntityErrorToRepositoryError(error: EntityError | Error | unknown): RepositoryError {
  if (error instanceof EntityError) {
    return new RepositoryError({
      originalError: error,
    });
  }

  if (error instanceof z.ZodError) {
    return new RepositoryError({
      message: "zod validation error",
      originalError: error,
    });
  }

  return new RepositoryError({
    originalError: error,
  });
}

// 매퍼 함수: Repository Layer -> Use Case Layer
export function mapRepositoryErrorToUseCaseError(error: RepositoryError | Error | unknown): UseCaseError {
  if (error instanceof RepositoryError) {
    return new UseCaseError({
      originalError: error,
    });
  }
  // 일반 Error 인스턴스인 경우, 기본 UseCaseError로 변환
  return new UseCaseError({
    originalError: error,
  });
}

// 매퍼 함수: Use Case Layer -> Adapter Layer

export function mapUseCaseErrorToAdapterError(error: UseCaseError | Error | unknown): AdapterError {
  if (error instanceof UseCaseError) {
    return new AdapterError({
      originalError: error,
    });
  }
  // 일반 Error 인스턴스인 경우, 기본 AdapterError로 변환
  return new AdapterError({
    originalError: error,
  });
}
