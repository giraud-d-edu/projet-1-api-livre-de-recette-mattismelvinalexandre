import { ingredientCollection } from "./db/mongo.ts";
import { ObjectId } from "../../deps.ts";
import {
  IngredientDBOToModel,
  IngredientModelToDBO,
} from "./dbos/ingredient.dbo.ts";
import NotFoundError from "../errors/NotFound.error.ts";
import Ingredient from "../models/ingredient.model.ts";
import NotModifiedError from "../errors/NotModified.error.ts";

export const getAllIngredients = async () => {
  const ingredients = await ingredientCollection.find().toArray();
  return ingredients.map(IngredientDBOToModel);
};

export const getIngredientById = async (id: string) => {
  const ingredient = await ingredientCollection.findOne({
    _id: new ObjectId(id),
  });
  if (!ingredient) {
    throw new NotFoundError(`Ingredient with id ${id} not found`);
  }
  return IngredientDBOToModel(ingredient);
};

export const createIngredient = async (ingredient: Ingredient) => {
  const result = await ingredientCollection.insertOne(
    IngredientModelToDBO(ingredient)
  );
  if (!result.acknowledged) {
    throw new Error("Ingredient not created");
  }
  return result.acknowledged;
};

export const updateIngredient = async (ingredient: Ingredient) => {
  const result = await ingredientCollection.updateOne(
    { _id: new ObjectId(ingredient.id) },
    { $set: IngredientModelToDBO(ingredient) }
  );
  if (!result.matchedCount) {
    throw new NotFoundError(`Ingredient with id ${ingredient.id} not found`);
  }
  if (result.matchedCount > 0 && result.modifiedCount === 0) {
    throw new NotModifiedError("Ingredient already updated");
  }
  return result.modifiedCount > 0;
};

export const deleteIngredient = async (id: string) => {
  const result = await ingredientCollection.deleteOne({
    _id: new ObjectId(id),
  });
  if (!result.deletedCount) {
    throw new NotFoundError(`Ingredient with id ${id} not found`);
  }
  return result.deletedCount > 0;
};

export const searchIngredientsByNom = async (nom: string) => {
  const ingredients = await ingredientCollection
    .find({
      nom: { $regex: nom, $options: "i" },
    })
    .toArray();
  return ingredients.map(IngredientDBOToModel);
};
