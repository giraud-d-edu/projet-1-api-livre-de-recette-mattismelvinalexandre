import { ObjectId, RouterContext } from "../deps.ts";
import BadRequestError from "../errors/BadRequest.error.ts";
import * as recetteService from "../services/recette.service.ts";
import { recetteDto, recetteDTOToModel } from "./dtos/recette.dto.ts";

export const getAllRecettes = async (ctx: RouterContext<"/recettes">) => {
  ctx.response.body = await recetteService.getAllRecettes();
};

export const getRecetteById = async (ctx: RouterContext<"/recettes/:id">) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id: Must be an ObjectId (12-byte hexadecimal string)"
    );
  }

  ctx.response.body = await recetteService.getRecetteById(id);
};

export const createRecette = async (ctx: RouterContext<"/recettes">) => {
  const recette = recetteDto.parse(await ctx.request.body.json());
  await recetteService.createRecette(recetteDTOToModel(recette));
  ctx.response.body = "Recette created";
};

export const updateRecette = async (ctx: RouterContext<"/recettes/:id">) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id: Must be an ObjectId (12-byte hexadecimal string)"
    );
  }
  const recette = recetteDto.parse(await ctx.request.body.json());
  await recetteService.updateRecette(id, recetteDTOToModel(recette));
  ctx.response.body = "Recette updated";
};

export const deleteRecette = async (ctx: RouterContext<"/recettes/:id">) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id: Must be an ObjectId (12-byte hexadecimal string)"
    );
  }
  await recetteService.deleteRecette(id);
  ctx.response.body = "Recette deleted";
};

export const searchRecettes = async (ctx: RouterContext<"/search">) => {
  const query = ctx.request.url.searchParams.get("query");
  const type = ctx.request.url.searchParams.get("type");
  if (!query || !type) {
    throw new BadRequestError("Query and type are required");
  }
  ctx.response.body = await recetteService.searchRecettes(query, type);
};
