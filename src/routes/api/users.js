import { Router } from "express";
import { user as controller, achievements } from "../../controllers";
import middlewares from "../../middlewares";
const {
  user: middleware,
  auth: authMiddleware,
  uploadImage: { avatarImage },
} = middlewares;

const usersRouter = Router();

usersRouter.use(authMiddleware.auth);
usersRouter.patch(
  "/",
  avatarImage.single("avatar"),
  middleware.noData,
  middleware.edit,
  controller.editProfile
);
usersRouter.patch(
  "/subscribe",
  middleware.subscribe,
  controller.addSubscription
);
usersRouter.get("/achievements", achievements.get);
export default usersRouter;
