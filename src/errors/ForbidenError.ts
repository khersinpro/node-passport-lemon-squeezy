import BaseError from "./BaseError";

class ForbiddenError extends BaseError {
  constructor(description = "Forbidden") {
    super("ForbiddenError", 403, description);
  }
}

export default ForbiddenError;