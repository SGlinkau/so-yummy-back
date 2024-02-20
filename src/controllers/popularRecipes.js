import { asyncWrapper, responseData } from "../helpers/apiHelpers";
import {
  MAX_LIMIT_PER_PAGE,
  DEFAULT_LIMIT_PER_PAGE,
  DEFAULT_PAGE,
} from "../helpers/variables";
import { popularRecipes as service } from "../services";

const popularRecipes = async (req, res) => {
  let { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT_PER_PAGE } = req.query;
  limit = +limit > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : +limit;

  const recipes = await service.get(page, limit);

  res.json(
    responseData(
      {
        ...recipes,
      },
      200
    )
  );
};

export const getRecipes = asyncWrapper(popularRecipes);
