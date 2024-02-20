import { Router } from "express";
import { shoppingList as controller } from "../../controllers";
import {
  shoppingList as middleware,
  auth as authMiddleware,
  pagination as paginationMiddleware,
} from "../../middlewares";

const shoppingListRouter = Router();

shoppingListRouter.use(authMiddleware.auth);
shoppingListRouter
  .get("/", paginationMiddleware.pagination, controller.get)
  .post("/", middleware.add, controller.add)
  .delete("/:id", middleware.delete, controller.delete);

export default shoppingListRouter;
