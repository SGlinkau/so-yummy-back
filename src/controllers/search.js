import { search as service } from "../services";
import { asyncWrapper, responseData } from "../helpers/apiHelpers";
import { SearchType } from "../types";
import {
  MAX_LIMIT_PER_PAGE,
  DEFAULT_LIMIT_PER_PAGE,
  DEFAULT_PAGE,
} from "../helpers/variables";

const getRecipeByTitleController = async (req, res) => {
  const {
    type,
    value,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT_PER_PAGE,
  } = req.query;
  const searchMethod =
    type === SearchType.title
      ? service.getRecipeByTitle
      : service.getRecipeByIngredient;
  const pageLimit =
    parseInt(limit) > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : parseInt(limit);
  const [result] = await searchMethod(value, parseInt(page), pageLimit);

  res.status(200).json(
    responseData(
      {
        ...result,
        limit: pageLimit,
        page: parseInt(page),
      },
      200
    )
  );
};

export const getRecipeByTitleOrIngredient = asyncWrapper(
  getRecipeByTitleController
);
