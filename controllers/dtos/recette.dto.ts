import { z } from "../../deps.ts";

export const recetteDto = z.object({
  nom: z.string().max(100).min(1),
  description: z.string().max(500),
  category: z.string().max(100),
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

export type RecetteDtoType = z.infer<typeof recetteDto>;
