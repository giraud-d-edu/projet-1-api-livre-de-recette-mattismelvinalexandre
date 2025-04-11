import { writable } from 'svelte/store';
import * as IngredientsApi from '../api/ingredient.ts';
import type { Ingredient } from '../types/ingredient.ts';

export const ingredients = writable<Ingredient[]>([]);

export async function getAllIngredients() {
	const data = await IngredientsApi.findAll();
	ingredients.set(data);
}

export async function addIngredient(ingredient: string) {
	const data = await IngredientsApi.create(ingredient);
	ingredients.update((current) => [...current, data]);
}

export async function deleteIngredient(id: string) {
	console.log('Deleting ingredient with id:', id);
	await IngredientsApi.remove(id);
	ingredients.update((current) => current.filter((i) => i.id !== id));
}
