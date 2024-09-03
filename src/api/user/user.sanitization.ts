import { Schema } from "express-validator";

export const CreateUserSchema: Schema = {
  username: {
    isString: true,
    trim: true,
    escape: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "Username must be at least 3 characters long",
    },
    in: ["body"],
    errorMessage: "Invalid username",
  },
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
    escape: true,
    in: ["body"],
    errorMessage: "Invalid password",
  },
};

export const UpdateUserSchema: Schema = {
  id: {
    isInt: true,
    in: ["params"],
    errorMessage: "Invalid id",
    escape: true,
  },
  username: {
    isString: true,
    in: ["body"],
    errorMessage: "Invalid username",
    optional: true,
    escape: true,
  },
};

export const UpdateUserPasswordSchema: Schema = {
  id: {
    isInt: true,
    in: ["params"],
    errorMessage: "Invalid id",
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
  confirmPassword: {
    custom: {
      options: (value, { req }) => value === req.body.password,
      errorMessage: "Passwords do not match",
    },
  },
};
