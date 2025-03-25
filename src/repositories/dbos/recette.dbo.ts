import { ObjectId, WithId } from "../../../deps.ts";
import Recette, {
  Category,
  IngredientQuantity,
  SousCategory,
} from "../../models/recette.model.ts";

export interface RecetteDBO {
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

export const RecetteDBOToModel: (recette: WithId<RecetteDBO>) => Recette = (
  recette
) => {
  return {
    id: recette._id.toString(),
    nom: recette.nom,
    description: recette.description,
    category: recette.category,
    sous_category: recette.sous_category,
    tps_preparation_min: recette.tps_preparation_min,
    tps_cuisson_min: recette.tps_cuisson_min,
    type_cuisson: recette.type_cuisson,
    origine: recette.origine,
    ingredients: recette.ingredients,
  };
};

export const RecetteModelToDBO: (recette: Recette) => WithId<RecetteDBO> = (
  recette
) => {
  return {
    _id: new ObjectId(recette.id),
    nom: recette.nom,
    description: recette.description,
    category: recette.category,
    sous_category: recette.sous_category,
    tps_preparation_min: recette.tps_preparation_min,
    tps_cuisson_min: recette.tps_cuisson_min,
    type_cuisson: recette.type_cuisson,
    origine: recette.origine,
    ingredients: recette.ingredients,
  };
};
