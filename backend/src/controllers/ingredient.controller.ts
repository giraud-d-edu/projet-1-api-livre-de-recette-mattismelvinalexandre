import { ObjectId, RouterContext } from "../../deps.ts";
import BadRequestError from "../errors/BadRequest.error.ts";
import Ingredient from "../models/ingredient.model.ts";
import * as ingredientService from "../services/ingredient.service.ts";
import { IngredientCandidateDto } from "./dtos/ingredient.dto.ts";

export const getAllIngredients = async (ctx: RouterContext<"/ingredients">) => {
  ctx.response.body = await ingredientService.getAllIngredients();
};

export const getIngredientById = async (
  ctx: RouterContext<"/ingredients/:id">
) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id : Must be a 12-byte hexadecimal string"
    );
  }
  ctx.response.body = await ingredientService.getIngredientById(id);
};

export const createIngredient = async (ctx: RouterContext<"/ingredients">) => {
  const ingredient = IngredientCandidateDto.parse(
    await ctx.request.body.json()
  );
  ctx.response.body = await ingredientService.createIngredient(
    ingredient as Ingredient
  );
  ctx.response.status = 201;
};

export const updateIngredient = async (
  ctx: RouterContext<"/ingredients/:id">
) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id : Must be a 12-byte hexadecimal string"
    );
  }
  const ingredient = IngredientCandidateDto.parse(
    await ctx.request.body.json()
  ) as Ingredient;
  ingredient.id = id;
  ctx.response.body = await ingredientService.updateIngredient(ingredient);
};

export const deleteIngredient = async (
  ctx: RouterContext<"/ingredients/:id">
) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id : Must be a 12-byte hexadecimal string"
    );
  }
  await ingredientService.deleteIngredient(id);
  ctx.response.body = "Ingredient deleted";
};
