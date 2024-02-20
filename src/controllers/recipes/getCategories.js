import { asyncWrapper, responseData } from "../../helpers/apiHelpers";
import { CATEGORIES } from "../../helpers/variables";

const getCategories = async (_req, res) => {
  return res.status(200).json(
    responseData(
      {
        categories: CATEGORIES,
      },
      200
    )
  );
};

export default asyncWrapper(getCategories);
