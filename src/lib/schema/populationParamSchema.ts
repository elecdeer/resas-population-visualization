import { z } from "zod";

export const populationParamSchema = z.object({
  prefCode: z.number(),
  cityCode: z.union([z.string(), z.literal("-")]),
  addArea: z.optional(
    z.array(
      z.object({
        prefCode: z.number(),
        cityCode: z.optional(z.string()),
      })
    )
  ),
});

export type PopulationParam = z.infer<typeof populationParamSchema>;
