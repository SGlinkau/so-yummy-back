// import { object } from "joi";
import pkg from "joi";
const { object } = pkg;
import { validationFields, validationRequest } from "../helpers/validation.js";

import { query } from "../types/requestFieldType.js";

const querySchema = object({
  value: validationFields.value.optional(),
});

export const getIngredients = validationRequest(querySchema, query);
