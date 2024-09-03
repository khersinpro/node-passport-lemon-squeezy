import { Schema } from "express-validator";

export const createCheckoutSchema: Schema = {
  variantId: {
    isInt: true,
    escape: true,
    in: ["body"],
    errorMessage: "Invalid variantId",
  },
};