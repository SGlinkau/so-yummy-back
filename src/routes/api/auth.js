import { Router } from "express";
import { authenticate } from "passport";
import { auth as controller } from "../../controllers";
import { auth as middleware } from "../../middlewares";

const authRouter = Router();

authRouter.post("/register", middleware.register, controller.register);
authRouter.post("/login", middleware.login, controller.login);
authRouter.post("/logout", middleware.auth, controller.logout);
authRouter.get("/current", middleware.auth, controller.current);
authRouter.post("/refresh", middleware.refresh, controller.refresh);
authRouter.get(
  "/google",
  authenticate("google", { scope: ["email", "profile"] })
);
authRouter.get(
  "/google/callback",
  authenticate("google", { session: false }),
  controller.google
);

export default authRouter;
