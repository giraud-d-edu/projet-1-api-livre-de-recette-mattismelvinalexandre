import * as recetteRepository from "../repositories/recette.repository.ts";
import Recette from "../models/recette.model.ts";
import * as ingredientRepository from "../repositories/ingredient.repository.ts";
import { SearchQueryParamType } from "../controllers/dtos/search.dto.ts";
import UniqueInformations from "../models/uniqueInformations.model.ts";

export const getAllRecettes = async () => {
  return await recetteRepository.getAllRecettes();
};

export const getRecetteById = async (id: string) => {
  return await recetteRepository.getRecetteById(id);
};

export const createRecette = async (recette: Recette) => {
  return await recetteRepository.createRecette(recette);
};

export const updateRecette = async (recette: Recette) => {
  return await recetteRepository.updateRecette(recette);
};

export const deleteRecette = async (id: string) => {
  return await recetteRepository.deleteRecette(id);
};

export const searchRecettes = async (
  searchQueryParams: SearchQueryParamType
) => {};

export const getAllUniqueInformations = async () => {
  const recettes = await recetteRepository.getAllRecettes();
  const uniqueInformations: UniqueInformations = {
    category: Array.from(
      new Set(recettes.flatMap((recette) => recette.sous_category))
    ),
    origine: Array.from(new Set(recettes.map((recette) => recette.origine))),
    tps_preparation_min: Array.from(
      new Set(recettes.map((recette) => recette.tps_preparation_min))
    ),
    tps_cuisson_min: Array.from(
      new Set(recettes.map((recette) => recette.tps_cuisson_min))
    ),
    type_cuisson: Array.from(
      new Set(recettes.map((recette) => recette.type_cuisson))
    ),
    ingredients: Array.from(
      new Set(
        recettes.flatMap((recette) =>
          recette.ingredients.map((ingredientQuantity) =>
            ingredientQuantity.ingredient.toString()
          )
        )
      )
    ),
  };
  console.log(uniqueInformations);

  return uniqueInformations;
};
