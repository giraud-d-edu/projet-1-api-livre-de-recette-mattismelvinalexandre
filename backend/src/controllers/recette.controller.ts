import { ObjectId, RouterContext } from "../../deps.ts";
import BadRequestError from "../errors/BadRequest.error.ts";
import * as recetteService from "../services/recette.service.ts";
import {
  recetteCandidateDto,
  recetteCandidateDTOToModel,
} from "./dtos/recette.dto.ts";
import { parseSearchParams, searchDTOtoModel } from "./dtos/search.dto.ts";

export const getAllRecettes = async (ctx: RouterContext<"/recettes">) => {
  ctx.response.body = await recetteService.getAllRecettes();
};

export const getRecetteById = async (ctx: RouterContext<"/recettes/:id">) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id: Must be an 12-byte hexadecimal string"
    );
  }

  ctx.response.body = await recetteService.getRecetteById(id);
};

export const createRecette = async (ctx: RouterContext<"/recettes">) => {
  const recette = recetteCandidateDto.parse(await ctx.request.body.json());
  ctx.response.body = await recetteService.createRecette(
    recetteCandidateDTOToModel(recette)
  );
};

export const updateRecette = async (ctx: RouterContext<"/recettes/:id">) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id: Must be an 12-byte hexadecimal string"
    );
  }
  const recetteCandidate = recetteCandidateDto.parse(
    await ctx.request.body.json()
  );
  const recette = recetteCandidateDTOToModel(recetteCandidate);
  recette.id = id;

  ctx.response.body = await recetteService.updateRecette(recette);
};

export const deleteRecette = async (ctx: RouterContext<"/recettes/:id">) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id: Must be an 12-byte hexadecimal string"
    );
  }
  await recetteService.deleteRecette(id);
  ctx.response.body = "Recette deleted";
};

export const searchRecettes = async (
  ctx: RouterContext<"/recettes/search">
) => {
  const search = searchDTOtoModel(
    parseSearchParams(ctx.request.url.searchParams)
  );
  ctx.response.body = search;
  // if (!query || !type) {
  //   throw new BadRequestError("Query and type are required");
  // }
  // ctx.response.body = await recetteService.searchRecettes(query, type);
};

export const getAllUniqueInformations = async (
  ctx: RouterContext<"/recettes/unique-informations">
) => {
  ctx.response.body = await recetteService.getAllUniqueInformations();
};
