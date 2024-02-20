import { Router } from "express";
import { ingredient as controller } from "../../controllers";

const ingredientRouter = Router();

ingredientRouter.get("/", controller.getIngredient);

export default ingredientRouter;
