import { object } from "joi";
import { validationFields, validationRequest } from "../helpers/validation";
import { RequestFieldType } from "../types";

const paginationSchema = object({
  page: validationFields.page.optional(),
  limit: validationFields.limit.optional(),
});

export const pagination = validationRequest(
  paginationSchema,
  RequestFieldType.query
);
