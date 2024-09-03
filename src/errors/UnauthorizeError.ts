import BaseError from "./BaseError";

class UnauthorizedError extends BaseError {
  constructor(description = "Unauthorized") {
    super("UnauthorizedError", 401, description);
  }
}

export default UnauthorizedError;
