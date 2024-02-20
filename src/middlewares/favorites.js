import { object } from "joi";
import { validationFields, validationRequest } from "../helpers/validation";

const favoritesSchema = object({
  recipeId: validationFields.id.required(),
});

export function recipeId(type) {
  return validationRequest(favoritesSchema, type);
}
