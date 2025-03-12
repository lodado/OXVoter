import { RepositoryError } from "./error";

export class NetworkPermissionError extends RepositoryError {
  constructor(params: { message?: string; originalError?: unknown | Error; propagateStack?: boolean }) {
    super(params);
  }
}
