import { object } from "joi";
import { validationFields, validationRequest } from "../helpers/validation";

import { query } from "../types/requestFieldType";

const querySchema = object({
  value: validationFields.value.optional(),
});

export const getIngredients = validationRequest(querySchema, query);
