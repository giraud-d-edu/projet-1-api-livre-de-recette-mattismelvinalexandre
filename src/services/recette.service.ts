import * as recetteRepository from "../repositories/recette.repository.ts";
import Recette, { SousCategory } from "../models/recette.model.ts";
import * as ingredientRepository from "../repositories/ingredient.repository.ts";
import BadRequestError from "../errors/BadRequest.error.ts";
import NotFoundError from "../errors/NotFound.error.ts";

export const getAllRecettes = async () => {
  return await recetteRepository.getAllRecettes();
};

export const getRecetteById = async (id: string) => {
  return await recetteRepository.getRecetteById(id);
};

export const createRecette = async (recette: Recette) => {
  return await recetteRepository.createRecette(recette);
};

export const updateRecette = async (id: string, recette: Recette) => {
  return await recetteRepository.updateRecette(id, recette);
};

export const deleteRecette = async (id: string) => {
  return await recetteRepository.deleteRecette(id);
};

export const searchRecettes = async (query: string, type: string) => {
  switch (type) {
    case "nom":
      return await recetteRepository.searchRecettesByNom(query);
    case "ingredient": {
      const ingredient = await ingredientRepository.searchIngredientsByNom(
        query
      );
      if (!ingredient[0]) {
        throw new NotFoundError("Ingredient not found");
      }
      return await recetteRepository.searchRecettesByIngredientId(
        ingredient[0].id
      );
    }
    case "category": {
      if (!Object.values(SousCategory).includes(query as SousCategory)) {
        throw new BadRequestError(
          "Invalid category: should be one of " +
            Object.values(SousCategory).join(", ")
        );
      }
      return await recetteRepository.searchRecettesByCategory(
        query as SousCategory
      );
    }
    case "origine":
      return await recetteRepository.searchRecettesByOrigine(query);
    default:
      throw new BadRequestError(
        "Invalid tpye : should be 'nom', 'ingredient', 'category' or 'origine'"
      );
  }
};
