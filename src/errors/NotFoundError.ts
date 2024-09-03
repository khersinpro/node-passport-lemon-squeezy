import BaseError from "./BaseError";

class NotFoundError extends BaseError {
  constructor(description = "Not Found") {
    super("NotFoundError", 404, description);
  }
}

export default NotFoundError;
