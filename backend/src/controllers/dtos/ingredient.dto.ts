import { z } from "../../../deps.ts";

export const IngredientDto = z.object({
  nom: z.string().max(50).min(3),
  // manque l'id ici.
});

export type IngredientDtoType = z.infer<typeof IngredientDto>;
