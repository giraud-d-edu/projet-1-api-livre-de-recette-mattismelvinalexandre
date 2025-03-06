import { ObjectId } from "../deps.ts";
import NotFoundError from "../errors/NotFound.error.ts";
import Recette from "../models/recette.model.ts";
import { recetteCollection } from "./db/mongo.ts";
import { RecetteDBOToModel } from "./dbos/recette.dbo.ts";

export const getAllRecettes = async () => {
  const recettes = await recetteCollection.find().toArray();
  return recettes.map(RecetteDBOToModel);
};

export const getRecetteById = async (id: string) => {
  const recette = await recetteCollection.findOne({
    _id: new ObjectId(id),
  });
  if (!recette) {
    throw new NotFoundError(`Recette with id ${id} not found`);
  }
  return RecetteDBOToModel(recette);
};

export const createRecette = async (recette: Recette) => {
  const result = await recetteCollection.insertOne(recette);
  if (!result.acknowledged) {
    throw new Error("Recette not created");
  }
  return result.acknowledged;
};

export const updateRecette = async (id: string, recette: Recette) => {
  const result = await recetteCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: recette }
  );
  if (!result.modifiedCount) {
    throw new NotFoundError("Recette not updated");
  }
  return result.modifiedCount > 0;
};

export const deleteRecette = async (id: string) => {
  const result = await recetteCollection.deleteOne({
    _id: new ObjectId(id),
  });
  if (!result.deletedCount) {
    throw new NotFoundError("Recette not deleted");
  }
  return result.deletedCount > 0;
};
