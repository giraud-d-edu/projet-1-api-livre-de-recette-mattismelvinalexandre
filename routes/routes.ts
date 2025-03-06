import { adminRoute, authenticatedRoute } from "../middleware.ts";
import * as ingredientController from "../controllers/ingredient.controller.ts";
import { Router } from "../deps.ts";

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
