import { object } from "joi";
import { validationFields, validationRequest } from "../helpers/validation";

import { query } from "../types/requestFieldType";

const querySchema = object({
  type: validationFields.type.required(),
  value: validationFields.value.required(),
  page: validationFields.page.optional(),
  limit: validationFields.limit.optional(),
});

export const searchRecipe = validationRequest(querySchema, query);
