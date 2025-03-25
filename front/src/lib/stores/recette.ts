import { writable } from "svelte/store";
import * as RecettesApi from "../api/recette.ts";
import type { Recette } from "../types/recette.ts";
import * as IngredientsApi from "../api/ingredient.ts";
import type { Ingredient } from "../types/ingredient.ts";

export const recettes = writable<Recette[]>([]);
export const recette = writable<Recette | null>(null);

export async function getAllRecettes() {
    const data = await RecettesApi.findAll();
    for (const recette of data) {
        recette.ingredients = await Promise.all(
            recette.ingredients.map(async (ingredient: Ingredient) => {
                const ingredientData = await IngredientsApi.findOne(ingredient.ingredient as string);
                return {
                    ...ingredient,
                    nom: ingredientData.nom,
                };
            })
        );
    }
    recettes.set(data);
}

export async function getRecette(id: string) {
    const data = await RecettesApi.findOne(id);
    data.ingredients = await Promise.all(
        data.ingredients.map(async (ingredient: Ingredient) => {
            const ingredientData = await IngredientsApi.findOne(ingredient.ingredient as string);
            return {
                ...ingredient,
                nom: ingredientData.nom,
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