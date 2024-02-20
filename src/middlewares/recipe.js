import { object } from "joi";

import { RequestFieldType } from "../types";
import { validationFields } from "../helpers/validation.js";
import { validationRequest } from "../helpers/validation.js";
import { validationRequestWithImg } from "../helpers/validation.js";

const recipeSchema = object({
  title: validationFields.title.required(),
  category: validationFields.category.required(),
  instructions: validationFields.instructions.required(),
  description: validationFields.description.required(),
  time: validationFields.time.required(),
  ingredients: validationFields.ingredients.required(),
});

const recipeIdSchema = object({
  recipeId: validationFields.id.required(),
});

const recipeCategoryNameSchema = object({
  categoryName: validationFields.category.required(),
});

export const recipe = validationRequestWithImg(
  recipeSchema,
  RequestFieldType.body
);
export const recipeId = validationRequest(
  recipeIdSchema,
  RequestFieldType.params
);
export const recipeCategoryName = validationRequest(
  recipeCategoryNameSchema,
  RequestFieldType.params
);
