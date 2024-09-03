import BaseError from "./BaseError";

class ValidationError extends BaseError {
  constructor(description = 'Invalid Data') {
      super("ValidationError", 400, description);
  }
}

export default ValidationError;