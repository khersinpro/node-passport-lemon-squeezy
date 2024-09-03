import { Schema } from "express-validator";

export const CredentialsLoginSchema: Schema = {
  email: {
    isEmail: true,
    in: ["body"],
    errorMessage: "Invalid email",
    escape: true,
  },
  password: {
    isString: true,
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
    in: ["body"],
    errorMessage: "Invalid password",
    escape: true,
  },
};