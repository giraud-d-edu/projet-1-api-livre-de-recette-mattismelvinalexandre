import { ObjectId, z } from "../../../deps.ts";
import BadRequestError from "../../errors/BadRequest.error.ts";
import Recette, { Category } from "../../models/recette.model.ts";

export const recetteDto = z.object({
  id: z.string().length(12),
  nom: z.string().max(100).min(1),
  description: z.string().max(500),
  category: z.nativeEnum(Category),
  sous_category: z.array(z.string().max(100)),
  tps_preparation_min: z.number().max(1440).min(0),
  tps_cuisson_min: z.number().max(1440).min(0),
  type_cuisson: z.string().max(100),
  origine: z.string().max(100),
  ingredients: z.array(
    z.object({
      ingredient: z.string().max(100),
      quantity: z.number().max(10000),
    })
  ),
});

export const recetteCandidateDto = z.object({
  nom: z.string().max(100).min(1),
  description: z.string().max(500),
  category: z.nativeEnum(Category),
  sous_category: z.array(z.string().max(100)),
  tps_preparation_min: z.number().max(1440).min(0),
  tps_cuisson_min: z.number().max(1440).min(0),
  type_cuisson: z.string().max(100),
  origine: z.string().max(100),
  ingredients: z.array(
    z.object({
      ingredient: z.string().max(100),
      quantity: z.number().max(10000),
    })
  ),
});

export type RecetteCandidateDtoType = z.infer<typeof recetteCandidateDto>;

export const recetteCandidateDTOToModel = (
  recetteDto: RecetteCandidateDtoType
): Recette => {
  return {
    nom: recetteDto.nom,
    description: recetteDto.description,
    category: recetteDto.category,
    sous_category: recetteDto.sous_category,
    tps_preparation_min: recetteDto.tps_preparation_min,
    tps_cuisson_min: recetteDto.tps_cuisson_min,
    type_cuisson: recetteDto.type_cuisson,
    origine: recetteDto.origine,
    ingredients: recetteDto.ingredients.map((ingredient) => ({
      ingredient: ObjectId.isValid(ingredient.ingredient)
        ? new ObjectId(ingredient.ingredient)
        : (() => {
            throw new BadRequestError(
              "Invalid id : Must be a ObjectId (12-byte hexadecimal string)"
            );
          })(),
      quantite_gr: ingredient.quantity,
    })),
  } as Recette;
};
