import { Router } from "express";
import {
  getAllRecipes,
  getCategories,
  getNewest,
  getRecipesByCategory,
  getRecipeById,
} from "../../controllers/recipes";
import {
  ownRecipes,
  popularRecipes,
  search,
  favorites,
} from "../../controllers";
import middlewares from "../../middlewares";
const {
  auth: authMiddleware,
  recipe: middleware,
  search: serachMiddleware,
  favorites: favoritesMiddleware,
  pagination: paginationMiddleware,
  newest: newestMiddleware,
  uploadImage: { recipeImage },
} = middlewares;
import { body, params } from "../../types/requestFieldType";
const routerRecipe = Router();

routerRecipe.use(authMiddleware.auth);

routerRecipe.get("/", paginationMiddleware.pagination, getAllRecipes);
routerRecipe.get("/categories", getCategories);
routerRecipe.get("/newest", newestMiddleware.newest, getNewest);
routerRecipe.get(
  "/own",
  paginationMiddleware.pagination,
  ownRecipes.getOwnRecipes
);
routerRecipe.get(
  "/popular",
  paginationMiddleware.pagination,
  popularRecipes.getRecipes
);
routerRecipe.get(
  "/search",
  serachMiddleware.searchRecipe,
  search.getRecipeByTitleOrIngredient
);
routerRecipe.get(
  "/favorites",
  paginationMiddleware.pagination,
  favorites.getFavorite
);
routerRecipe.get(
  "/categories/:categoryName",
  middleware.recipeCategoryName,
  paginationMiddleware.pagination,
  getRecipesByCategory
);
routerRecipe.get("/:recipeId", middleware.recipeId, getRecipeById);

routerRecipe.post(
  "/own",
  recipeImage.single("thumb"),
  middleware.recipe,
  ownRecipes.createRecipe
);
routerRecipe.post(
  "/favorites",
  favoritesMiddleware.recipeId(body),
  favorites.addFavorite
);
routerRecipe.delete(
  "/own/:recipeId",
  middleware.recipeId,
  ownRecipes.deleteRecipe
);
routerRecipe.delete(
  "/favorites/:recipeId",
  favoritesMiddleware.recipeId(params),
  favorites.deleteFavorite
);

export default routerRecipe;
