import { z } from "../../../deps.ts";
import { Category } from "../../models/recette.model.ts";

export const searchQueryParamDto = z.object({
  nom: z.string().max(100).optional(),
  category: z.nativeEnum(Category).optional(),
  sous_category: z.array(z.string().max(100)).optional(),
  origine: z.string().max(100).optional(),
  tps_max: z.number().max(1440).min(0).optional(),
  type_cuisson: z.string().max(100).optional(),
  ingredients: z.array(z.string().max(100)).optional(),
});

export type SearchQueryParamType = z.infer<typeof searchQueryParamDto>;
export function parseSearchParams(
  searchParams: URLSearchParams
): SearchQueryParamType {
  const rawParams = Object.fromEntries(searchParams.entries());
  const parsedParams = searchQueryParamDto.parse({
    ...rawParams,
    sous_category: rawParams.sous_category
      ? rawParams.sous_category.split(",")
      : undefined,
    tps_max: rawParams.tps_max ? Number(rawParams.tps_max) : undefined,
    ingredients: rawParams.ingredients
      ? rawParams.ingredients.split(",")
      : undefined,
  });
  return parsedParams;
}
export function searchDTOtoModel(searchQueryParam: SearchQueryParamType) {
  return {
    nom: searchQueryParam.nom || null,
    category: searchQueryParam.category || null,
    sous_category: searchQueryParam.sous_category || [],
    origine: searchQueryParam.origine || null,
    tps_max: searchQueryParam.tps_max || null,
    type_cuisson: searchQueryParam.type_cuisson || null,
    ingredients: searchQueryParam.ingredients || [],
  };
}
