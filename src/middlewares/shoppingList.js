import { object } from "joi";
import { validationRequest, validationFields } from "../helpers/validation";
import { RequestFieldType } from "../types";

const ShoppingListSchema = object({
  value: validationFields.value.required(),
  ingredientId: validationFields.id.required(),
  recipeId: validationFields.id.required(),
});

const deleteSchema = object({
  id: validationFields.id.required(),
});

export const add = validationRequest(ShoppingListSchema, RequestFieldType.body);
export const delete = validationRequest(deleteSchema, RequestFieldType.params);
