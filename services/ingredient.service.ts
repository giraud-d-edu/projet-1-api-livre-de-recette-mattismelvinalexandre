import * as ingredientRepository from "../repositories/ingredient.repository.ts";
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

export const updateIngredient = async (id: string, ingredient: Ingredient) => {
  return await ingredientRepository.updateIngredient(id, ingredient);
};

export const deleteIngredient = async (id: string) => {
  return await ingredientRepository.deleteIngredient(id);
};
