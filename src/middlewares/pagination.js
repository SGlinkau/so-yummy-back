// import { object } from "joi";
import pkg from "joi";
const { object } = pkg;
import { validationFields, validationRequest } from "../helpers/validation.js";
import { RequestFieldType } from "../types/requestFieldType.js";

const paginationSchema = object({
  page: validationFields.page.optional(),
  limit: validationFields.limit.optional(),
});

export const pagination = validationRequest(
  paginationSchema,
  RequestFieldType.query
);
