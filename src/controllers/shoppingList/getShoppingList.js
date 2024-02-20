import { shoppingList as service } from "../../services";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers";
import {
  MAX_LIMIT_PER_PAGE,
  DEFAULT_LIMIT_PER_PAGE,
  DEFAULT_PAGE,
} from "../../helpers/variables";

const getShoppingList = async (req, res) => {
  const { id } = req.user;
  const { limit = DEFAULT_LIMIT_PER_PAGE, page = DEFAULT_PAGE } = req.query;
  const pageLimit =
    parseInt(limit) > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : parseInt(limit);

  let shoppingList;

  if (req.query.page) {
    shoppingList = await service.getByUserId(id, pageLimit, parseInt(page));
  } else {
    shoppingList = await service.getAll(id);
  }

  res.status(200).json(responseData(shoppingList, 200));
};

export default asyncWrapper(getShoppingList);
