import { ObjectId } from "../../deps.ts";
import NotFoundError from "../errors/NotFound.error.ts";
import NotModifiedError from "../errors/NotModified.error.ts";
import Recette from "../models/recette.model.ts";
import Search from "../models/search.model.ts";
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
    throw new Error(`Recette with id ${recette.id} not created`);
  }
  return await getRecetteById(result.insertedId.toString());
};

export const updateRecette = async (recette: Recette) => {
  const result = await recetteCollection.updateOne(
    { _id: new ObjectId(recette.id) },
    { $set: recette }
  );
  if (!result.matchedCount) {
    throw new NotFoundError(`Recette with id ${recette.id} not found`);
  }
  if (result.matchedCount > 0 && result.modifiedCount === 0) {
    throw new NotModifiedError(`Recette already updated`);
  }
  return await getRecetteById(recette.id);
};

export const deleteRecette = async (id: string) => {
  const result = await recetteCollection.deleteOne({
    _id: new ObjectId(id),
  });
  if (!result.deletedCount) {
    throw new NotFoundError(`Recette with id ${id} not found`);
  }
};

export const searchRecettes = async (search: Search) => {
  const query = {
    ...(search.nom && { nom: { $regex: search.nom, $options: "i" } }),
    ...(search.ingredients && { ingredients: { $all: search.ingredients } }),
    ...(search.category && { category: search.category }),
    ...(search.sous_category && {
      sous_category: { $all: search.sous_category },
    }),
    ...(search.origine && { origine: search.origine }),
    ...(search.tps_max && {
      $expr: {
        $gt: [
          search.tps_max,
          { $add: ["$tps_preparation_min", "$tps_cuisson_min"] },
        ],
      },
    }),
    ...(search.type_cuisson && { type_cuisson: search.type_cuisson }),
  };
  const recettes = await recetteCollection.find(query).toArray();
  return recettes.map(RecetteDBOToModel);
};
