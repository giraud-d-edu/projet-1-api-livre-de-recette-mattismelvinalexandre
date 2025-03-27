import { writable } from 'svelte/store';
import * as IngredientsApi from '../api/ingredient.ts';
import type { Ingredient } from '../types/ingredient.ts';

export const ingredients = writable<Ingredient[]>([]);

export async function getAllIngredients() {
	const data = await IngredientsApi.findAll();
	ingredients.set(data);
}
