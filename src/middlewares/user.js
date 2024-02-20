import { object } from "joi";
import { validationFields, validationRequest } from "../helpers/validation";
import { ValidationError } from "../helpers/errors";
import { RequestFieldType } from "../types";

const editProfileSchema = object({
  name: validationFields.name.optional(),
});

const addSubscriptionSchema = object({
  email: validationFields.email.required(),
});

function isReqDataMissing(req, _res, next) {
  if (req.file?.fieldname !== "avatar" && !req.body?.name) {
    return next(new ValidationError("No data to update"));
  }
  next();
}

export const noData = isReqDataMissing;
export const edit = validationRequest(editProfileSchema, RequestFieldType.body);
export const subscribe = validationRequest(
  addSubscriptionSchema,
  RequestFieldType.body
);
