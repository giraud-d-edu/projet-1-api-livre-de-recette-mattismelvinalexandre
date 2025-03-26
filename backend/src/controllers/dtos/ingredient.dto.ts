import { z } from "../../../deps.ts";

export const IngredientDto = z.object({
  id: z.string().length(12),
  nom: z.string().max(50).min(3),
});

export const IngredientCandidateDto = z.object({
  nom: z.string().max(50).min(3),
});
