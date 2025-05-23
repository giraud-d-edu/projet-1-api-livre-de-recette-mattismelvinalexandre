import * as ingredientRepository from "../repositories/ingredient.repository.ts";
import * as recetteRepository from "../repositories/recette.repository.ts";
import Ingredient from "../models/ingredient.model.ts";

export const getAllIngredients = async () => {
  return await ingredientRepository.getAllIngredients();
};

export const getIngredientById = async (id: string) => {
  return await ingredientRepository.getIngredientById(id);
};

export const createIngredient = async (ingredient: Ingredient) => {
  return await ingredientRepository.createIngredient(ingredient);
};

export const updateIngredient = async (ingredient: Ingredient) => {
  return await ingredientRepository.updateIngredient(ingredient);
};

export const deleteIngredient = async (id: string) => {
  await recetteRepository.deleteIngredientFromAllRecette(id);
  return await ingredientRepository.deleteIngredient(id);
};
