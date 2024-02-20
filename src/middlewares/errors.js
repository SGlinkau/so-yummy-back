import { responseError } from "../helpers/apiHelpers.js";
import { BaseError, ServerError } from "../helpers/errors.js";

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (error, _req, res, _next) => {
  if (error instanceof BaseError) {
    return res.status(error.code).json(responseError(error));
  }

  return res.status(500).json(responseError(new ServerError(error.message)));
};

export default errorMiddleware;
