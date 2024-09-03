import BaseError from "./BaseError";

class DatabaseError extends BaseError {
  constructor(description = 'Database Error') {
      super("DatabaseError", 500, description);
  }
}

export default DatabaseError;
