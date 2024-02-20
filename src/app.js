import express, { json } from "express";
import logger from "morgan";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { responseError } from "./helpers/apiHelpers.js";
import { RouteNotFoundError } from "./helpers/errors.js";
import { errorMiddleware } from "./middlewares/errors.js";
import { auth } from "./routes/api/auth.js";
import { ingredients } from "./routes/api/ingredients.js";
import { users } from "./routes/api/users.js";
import { shoppingListRouter } from "./routes/api/shoppingList.js";
import { recipes } from "./routes/api/recipes.js";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());

// add you routes here

app.use("/api-docs", serve, setup(swaggerDocument));
app.use("/api/auth", auth);
app.use("/api/ingredients", ingredients);
app.use("/api/users", users);
app.use("/api/shopping-lists", shoppingListRouter);
app.use("/api/recipes", recipes);

//==========================

app.use((_, res) => {
  res.status(404).json(responseError(new RouteNotFoundError()));
});

app.use(errorMiddleware);

export default app;
