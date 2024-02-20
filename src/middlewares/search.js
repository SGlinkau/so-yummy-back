// import { object } from "joi";
import pkg from "joi";
const { object } = pkg;
import { validationFields } from "../helpers/validation.js";
import { validationRequest } from "../helpers/validation.js";
import { query } from "../types/requestFieldType.js";

const querySchema = object({
  type: validationFields.type.required(),
  value: validationFields.value.required(),
  page: validationFields.page.optional(),
  limit: validationFields.limit.optional(),
});

export const searchRecipe = validationRequest(querySchema, query);
