//import { adminRoute, authenticatedRoute } from "../middleware/auth.ts";
import * as ingredientController from "../controllers/ingredient.controller.ts";
import { Router } from "../../deps.ts";
import * as recetteController from "../controllers/recette.controller.ts";
import * as contactController from "../controllers/contact.controller.ts";

export const globalRouter = new Router();
export const ingredientRouter = new Router();
export const recetteRouter = new Router();

globalRouter.get("/", (ctx) => {
  ctx.response.body = "Bienvenue sur l'API de MMA";
});

globalRouter.post("/contact", contactController.createContact);

ingredientRouter.get("/ingredients", ingredientController.getAllIngredients);
ingredientRouter.get(
  "/ingredients/:id",
  ingredientController.getIngredientById
);
ingredientRouter.post("/ingredients", ingredientController.createIngredient);
ingredientRouter.put("/ingredients/:id", ingredientController.updateIngredient);
ingredientRouter.delete(
  "/ingredients/:id",
  ingredientController.deleteIngredient
);

recetteRouter.get("/recettes", recetteController.getAllRecettes);
recetteRouter.get(
  "/recettes/unique-informations",
  recetteController.getAllUniqueInformations
);
recetteRouter.get("/recettes/search", recetteController.searchRecettes);
recetteRouter.get("/recettes/:id", recetteController.getRecetteById);
recetteRouter.post("/recettes", recetteController.createRecette);
recetteRouter.put("/recettes/:id", recetteController.updateRecette);
recetteRouter.delete("/recettes/:id", recetteController.deleteRecette);
