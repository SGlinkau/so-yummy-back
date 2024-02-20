import pkg from "joi";
const { object } = pkg;
import { validationFields } from "../helpers/validation.js";
import { validationRequest } from "../helpers/validation.js";
import { RequestFieldType } from "../types/index.js";

const ShoppingListSchema = object({
  value: validationFields.value.required(),
  ingredientId: validationFields.id.required(),
  recipeId: validationFields.id.required(),
});

const deleteSchema = object({
  id: validationFields.id.required(),
});

export const add = validationRequest(ShoppingListSchema, RequestFieldType.body);
export const deleteValidator = validationRequest(
  deleteSchema,
  RequestFieldType.params
);
