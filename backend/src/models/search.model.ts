import { Category } from "./recette.model.ts";

export default interface Search {
  nom?: string;
  category?: Category;
  sous_category?: string[];
  origine?: string;
  tps_max?: number;
  type_cuisson?: string;
  ingredients?: string[];
}
