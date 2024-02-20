import { find } from "../models/ingredient";
import { asyncWrapper } from "../helpers/apiHelpers";

const getIngredient = async (req, res) => {
  const ingredients = await find();
  res.send(ingredients);
};

export const getIngredient = asyncWrapper(getIngredient);
