import { isValidObjectId } from "mongoose";
import { string, number } from "joi";
import { RequestFieldType, SearchType } from "../types";
import { ValidationError } from "./errors";
import { v2 } from "cloudinary";
import { CATEGORIES } from "./variables";

const idValidation = (value, helpers) => {
  // Use error to return an existing error code
  if (!isValidObjectId(value)) {
    return helpers.message('"id" should be of type "ObjectId"');
  }

  // Return the value unchanged
  return value;
};

// Validation rules
const validationFields = {
  id: string().custom(idValidation, "Invalid id"),
  name: string().min(1).max(16),
  email: string().email({ tlds: { allow: false } }),
  password: string()
    .min(6)
    .max(16)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
    .messages({
      "string.min": "Must have at least 6 characters",
      "string.max": "Must be less then or equal 16 characters",
      "string.pattern.base":
        "At least one uppercase letter, one lowercase letter and one number",
    }),
  refreshToken: string(),
  title: string().min(3).max(30),
  category: string().equal(...Object.values(CATEGORIES)),
  instructions: string().min(10),
  description: string().min(8),
  time: string().min(1),
  ingredients: string(),
  // Search, ingredients
  type: string().equal(...Object.values(SearchType)),
  value: string().min(1).max(30),
  // ShoppingList
  ingredientId: string().custom(idValidation, "Invalid id"),
  // Pages
  page: number().integer().min(1),
  limit: number().integer().min(1),
};

// Email validation for mongoose schema
const isEmailValid = (email) => !validationFields.email.validate(email).error;

// Request validation function
const validationRequest =
  (schema, type = RequestFieldType.body) =>
  (req, _res, next) => {
    const validationResult = schema.validate(req[type]);

    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }

    next();
  };

//Request validation function after upload image middleware
const validationRequestWithImg =
  (schema, type = RequestFieldType.body) =>
  (req, _res, next) => {
    const validationResult = schema.validate(req[type]);

    if (validationResult.error) {
      v2.uploader.destroy(req.file.filename, "image");
      throw new ValidationError(validationResult.error.message);
    }

    next();
  };

export default {
  idValidation,
  validationFields,
  isEmailValid,
  validationRequest,
  validationRequestWithImg,
};
