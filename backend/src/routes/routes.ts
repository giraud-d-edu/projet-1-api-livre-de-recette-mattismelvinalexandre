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

ingredientRouter.prefix("/ingredients");
ingredientRouter.get("/", ingredientController.getAllIngredients);
ingredientRouter.get("/:id", ingredientController.getIngredientById);
ingredientRouter.post("/", ingredientController.createIngredient);
ingredientRouter.put("/:id", ingredientController.updateIngredient);
ingredientRouter.delete("/:id", ingredientController.deleteIngredient);

recetteRouter.prefix("/recettes");
recetteRouter.get("/", recetteController.getAllRecettes);
recetteRouter.get(
  "/unique-informations",
  recetteController.getAllUniqueInformations
);
recetteRouter.get("/search", recetteController.searchRecettes);
recetteRouter.get("/:id", recetteController.getRecetteById);
recetteRouter.post("/", recetteController.createRecette);
recetteRouter.put("/:id", recetteController.updateRecette);
recetteRouter.delete("/:id", recetteController.deleteRecette);
