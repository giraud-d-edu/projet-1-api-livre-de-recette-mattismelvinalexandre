import { WithId, ObjectId } from "../../deps.ts";
import Ingredient from "../../models/ingredient.model.ts";

export interface IngredientDBO {
  _id: ObjectId;
  nom: string;
}

export const IngredientDBOToModel: (
  ingredient: WithId<IngredientDBO>
) => Ingredient = (ingredient) => {
  return {
    id: ingredient._id.toString(),
    nom: ingredient.nom,
  };
};

export const IngredientModelToDBO: (
  ingredient: Ingredient
) => WithId<IngredientDBO> = (ingredient) => {
  return {
    _id: new ObjectId(ingredient.id),
    nom: ingredient.nom,
  };
};
