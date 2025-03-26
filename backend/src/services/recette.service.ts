import * as recetteRepository from "../repositories/recette.repository.ts";
import Recette from "../models/recette.model.ts";
import UniqueInformations from "../models/uniqueInformations.model.ts";
import Search from "../models/search.model.ts";

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

export const searchRecettes = async (search: Search) => {
  return await recetteRepository.searchRecettes(search);
};

export const getAllUniqueInformations = async () => {
  const recettes = await recetteRepository.getAllRecettes();
  const uniqueInformations: UniqueInformations = {
    sous_category: Array.from(
      new Set(recettes.flatMap((recette) => recette.sous_category))
    ),
    origine: Array.from(new Set(recettes.map((recette) => recette.origine))),
    tps_max:
      Math.max(...recettes.map((recette) => recette.tps_preparation_min)) +
      Math.max(...recettes.map((recette) => recette.tps_cuisson_min)),
    type_cuisson: Array.from(
      new Set(recettes.map((recette) => recette.type_cuisson))
    ),
  };
  return uniqueInformations;
};
