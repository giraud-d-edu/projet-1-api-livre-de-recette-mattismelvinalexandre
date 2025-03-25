import type { Recette } from "../types/recette.ts";

export const findAll = async () => {
    const response = await fetch("http://localhost:8000/recettes");
    return await response.json();
};

export const findOne = async (id: string) => {
    const response = await fetch(`http://localhost:8000/recettes/${id}`);
    return await response.json();
};

export const deleteOne = async (id: string) => {
    const response = await fetch(`http://localhost:8000/recettes/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Basic ${btoa("admin:test")}`,
        }
    });
    return await response.text();
}

export const create = async (recette: Recette) => {
    const response = await fetch(`http://localhost:8000/recettes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recette),
    });
    return await response.text();
}