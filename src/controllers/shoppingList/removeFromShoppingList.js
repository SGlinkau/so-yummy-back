import { shoppingList as service } from "../../services";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers";
import { NotFoundError } from "../../helpers/errors";
import { convertShoppingItemData } from "../../helpers/convertShoppingItemData";

const removeFromShoppingList = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const shoppingItem = await service.removeById(id, userId);

  if (!shoppingItem) {
    throw new NotFoundError("Deleted item not found");
  }

  res
    .status(200)
    .json(
      responseData({ shoppingItem: convertShoppingItemData(shoppingItem) }, 200)
    );
};

export default asyncWrapper(removeFromShoppingList);
