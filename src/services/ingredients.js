import { find } from "../models/ingredient.js";

const getIngredients = async (value) => {
  const searchQuery = {};

  if (value) {
    searchQuery.ttl = { $regex: new RegExp(`^${value}`, "i") };
  }

  return await find(searchQuery);
};

export default {
  getIngredients,
};
