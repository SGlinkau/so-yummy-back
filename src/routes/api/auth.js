import { Router } from "express";
// ZAMIENIONO IMPORT Z PASSPORT NA IMPORT PKG I INNY IMPORT
import pkg from "passport";
const { authenticate } = pkg;
// import { authenticate } from "passport";
import { auth as controller } from "../../controllers/index.js";
import { auth as middleware } from "../../middlewares/index.js";

export const authRouter = Router();

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
