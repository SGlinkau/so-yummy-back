import { Router } from "express";
const router = Router();

import {
  auth as authMiddleware,
  ingredients as middleware,
} from "../../middlewares";
import { ingredients as controller } from "../../controllers";

router.use(authMiddleware.auth);
router.get("/", middleware.getIngredients, controller.getIngredients);

export default router;
