import { ObjectId } from "../../deps.ts";

export enum Category {
  Entree = "Entrée",
  Plat = "Plat",
  Dessert = "Dessert",
  Autre = "Autre",
}

export enum SousCategory {
  Salade = "Salade",
  Soupe = "Soupe",
  Viande = "Viande",
  Poisson = "Poisson",
  Vegetarien = "Végétarien",
  Vegan = "Vegan",
  Legume = "Légume",
  Patisserie = "Pâtisserie",
  Glace = "Glace",
  Yaourt = "Yaourt",
  Fruit = "Fruit",
  Chocolat = "Chocolat",
  Tarte = "Tarte",
  Gateau = "Gâteau",
  Cake = "Cake",
  Biscuit = "Biscuit",
  Pates = "Pâtes",
  Riz = "Riz",
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
  sous_category: SousCategory[];
  tps_preparation_min: number;
  tps_cuisson_min: number;
  type_cuisson: string;
  origine: string;
  ingredients: IngredientQuantity[];
}
