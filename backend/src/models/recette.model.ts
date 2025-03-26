import { ObjectId } from "../../deps.ts";

export enum Category {
  Entree = "Entrée",
  Plat = "Plat",
  Dessert = "Dessert",
  Autre = "Autre",
}

export interface IngredientQuantity {
  ingredient: ObjectId;
  quantite_gr: number;
}

export default interface Recette {
  id: string;
  nom: string;
  description: string;
  category: Category;
  sous_category: string[];
  tps_preparation_min: number;
  tps_cuisson_min: number;
  type_cuisson: string;
  origine: string;
  ingredients: IngredientQuantity[];
}
