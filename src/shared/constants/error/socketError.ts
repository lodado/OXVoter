import { BaseError } from "./error";

// Entity Layer Error
export class SocketConnectionError extends BaseError {
  constructor(params: { message?: string; originalError?: unknown | Error; propagateStack?: boolean }) {
    super({ ...params, message: "Socket connection error :" });
  }
}
