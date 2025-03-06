import { adminRoute, authenticatedRoute } from "../middleware/auth.ts";
import * as ingredientController from "../controllers/ingredient.controller.ts";
import { Router } from "../deps.ts";
import * as recetteController from "../controllers/recette.controller.ts";

export const pingRouter = new Router();
export const ingredientRouter = new Router();
export const recetteRouter = new Router();

pingRouter.get("/", (ctx) => {
  ctx.response.body = "Bienvenue sur l'API de MMA";
});

ingredientRouter.get("/ingredients", ingredientController.getAllIngredients);
ingredientRouter.get(
  "/ingredients/:id",
  ingredientController.getIngredientById
);
ingredientRouter.post(
  "/ingredients",
  authenticatedRoute,
  ingredientController.createIngredient
);
ingredientRouter.put(
  "/ingredients/:id",
  authenticatedRoute,
  ingredientController.updateIngredient
);
ingredientRouter.delete(
  "/ingredients/:id",
  adminRoute,
  ingredientController.deleteIngredient
);

recetteRouter.get("/recettes", recetteController.getAllRecettes);
recetteRouter.get("/recettes/:id", recetteController.getRecetteById);
recetteRouter.post(
  "/recettes",
  authenticatedRoute,
  recetteController.createRecette
);
recetteRouter.put(
  "/recettes/:id",
  authenticatedRoute,
  recetteController.updateRecette
);
recetteRouter.delete(
  "/recettes/:id",
  adminRoute,
  recetteController.deleteRecette
);
recetteRouter.get("/search", recetteController.searchRecettes);
