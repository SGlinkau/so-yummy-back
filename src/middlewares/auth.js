import { object, string } from "joi";
import { verify } from "jsonwebtoken";

import { user as service } from "../services/user.js";
import { UnAuthorizedError } from "../helpers/errors.js";
import { convertUserData } from "../helpers/convertUserData.js";
import { validationFields, validationRequest } from "../helpers/validation.js";
import { RequestFieldType } from "../types/requestFieldType.js";

const { JWT_ACCESS_SECRET } = process.env;

const loginSchema = object({
  email: validationFields.email.required(),
  password: string().min(1).required(),
});

const registerSchema = object({
  name: validationFields.name.required(),
  email: validationFields.email.required(),
  password: validationFields.password.required(),
});

const refreshSchema = object({
  refreshToken: validationFields.refreshToken.required(),
});

const auth = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(new UnAuthorizedError("No token provided"));
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      return next(new UnAuthorizedError("No token provided"));
    }
    const payload = verify(token, JWT_ACCESS_SECRET);

    const user = await service.getUserById(payload.id);

    if (!user || user.accessToken !== token) {
      return next(new UnAuthorizedError("Invalid token"));
    }

    req.user = convertUserData(user);

    next();
  } catch (err) {
    next(new UnAuthorizedError("Invalid token"));
  }
};

export default {
  register: validationRequest(registerSchema, RequestFieldType.body),
  login: validationRequest(loginSchema, RequestFieldType.body),
  refresh: validationRequest(refreshSchema, RequestFieldType.body),
  auth,
};
