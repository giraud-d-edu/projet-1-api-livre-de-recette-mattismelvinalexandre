import { ObjectId, RouterContext } from "../deps.ts";
import BadRequestError from "../errors/BadRequest.error.ts";
import Ingredient from "../models/ingredient.model.ts";
import * as ingredientService from "../services/ingredient.service.ts";
import { IngredientDto } from "./dtos/ingredient.dto.ts";

export const getAllIngredients = async (ctx: RouterContext<"/ingredients">) => {
  ctx.response.body = await ingredientService.getAllIngredients();
};

export const getIngredientById = async (
  ctx: RouterContext<"/ingredients/:id">
) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id : Must be a ObjectId (12-byte hexadecimal string)"
    );
  }
  ctx.response.body = await ingredientService.getIngredientById(id);
};

export const createIngredient = async (ctx: RouterContext<"/ingredients">) => {
  const ingredient = IngredientDto.parse(await ctx.request.body.json());
  await ingredientService.createIngredient(ingredient as Ingredient);
  ctx.response.body = "Ingredient created";
};

export const updateIngredient = async (
  ctx: RouterContext<"/ingredients/:id">
) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id : Must be a ObjectId (12-byte hexadecimal string)"
    );
  }
  const ingredient = IngredientDto.parse(
    await ctx.request.body.json()
  ) as Ingredient;
  ingredient.id = id;
  await ingredientService.updateIngredient(ingredient);
  ctx.response.body = "Ingredient updated";
};

export const deleteIngredient = async (
  ctx: RouterContext<"/ingredients/:id">
) => {
  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError(
      "Invalid id : Must be a ObjectId (12-byte hexadecimal string)" // Dire tout simple id, le type ObjectId fait référence au repository
    );
  }
  await ingredientService.deleteIngredient(id);
  ctx.response.body = "Ingredient deleted";
};
