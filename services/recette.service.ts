import * as recetteRepository from "../repositories/recette.repository.ts";
import Recette from "../models/recette.model.ts";

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
