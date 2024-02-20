import { object, string } from "joi";
import { validationRequest } from "../helpers/validation";
import { CATEGORIES } from "../helpers/variables";
import { RequestFieldType } from "../types";

const newestSchema = object({
  categories: string()
    .regex(
      new RegExp(`^(${CATEGORIES.join("|")})(,(${CATEGORIES.join("|")}))*$`)
    )
    .message("Invalid type of category"),
});

export const newest = validationRequest(newestSchema, RequestFieldType.query);
