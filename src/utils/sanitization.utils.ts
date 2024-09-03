import { NextFunction, Response, Request } from "express";
import { checkExact, checkSchema, Schema, validationResult } from "express-validator";

export function validationErrorHandler(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export function checkExactSchemaSanitization(schema: Schema) {
  return [
    checkExact(checkSchema(schema)),
    validationErrorHandler
  ];
}

export function checkSchemaSanitization(schema: Schema) {
  return [
    checkSchema(schema),
    validationErrorHandler
  ];
}
