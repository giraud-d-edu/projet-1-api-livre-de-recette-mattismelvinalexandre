import { writable } from 'svelte/store';
import * as RecettesApi from '../api/recette.ts';
import type { IngredientQuantity, Recette, Search, UniqueInformations } from '../types/recette.ts';
import * as IngredientsApi from '../api/ingredient.ts';

export const recettes = writable<Recette[]>([]);
export const recette = writable<Recette | null>(null);
export const uniqueInformations = writable<UniqueInformations | null>(null);

export async function getAllRecettes() {
	const data = await RecettesApi.findAll();
	recettes.set(data);
}

export async function getRecette(id: string) {
	const data = await RecettesApi.findOne(id);
	data.ingredients = await Promise.all(
		data.ingredients.map(async (ingredient: IngredientQuantity) => {
			const ingredientData = await IngredientsApi.findOne(ingredient.ingredient as string);
			return {
				...ingredient,
				nom: ingredientData.nom
			};
		})
	);
	recette.set(data);
}

export async function deleteRecette(id: string) {
	await RecettesApi.deleteOne(id);
	recette.update((value) => {
		if (value && value.id === id) {
			return null;
		}
		return value;
	});
}

export async function createRecette(newRecette: Recette) {
	const data = await RecettesApi.create(newRecette);
	recettes.update((values) => [...values, data]);
	return data.id;
}

export async function updateRecette(updatedRecette: Recette) {
	const data = await RecettesApi.update(updatedRecette);
	recettes.update((values) => values.map((value) => (value.id === data.id ? data : value)));
}

export async function getAllUniqueInformations() {
	const data = await RecettesApi.findAllUniqueInformations();
	uniqueInformations.set(data);
}

export async function searchRecettes(search: Search) {
	const data = await RecettesApi.search(search);
	recettes.set(data);
}
