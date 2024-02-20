import pkg from "joi";
const { object } = pkg;
import { validationFields, validationRequest } from "../helpers/validation.js";

const favoritesSchema = object({
  recipeId: validationFields.id.required(),
});

export function recipeId(type) {
  return validationRequest(favoritesSchema, type);
}
