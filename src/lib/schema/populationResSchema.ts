import { z } from "zod";

const subDataSchema = z.object({
  year: z.number(),
  value: z.number(),
  rate: z.number(),
});

export const populationResSchema = z.object({
  message: z.nullable(z.string()),
  result: z.object({
    boundaryYear: z.number(),
    data: z.array(
      z.union([
        z.object({
          label: z.literal("総人口"),
          data: z.array(
            z.object({
              year: z.number(),
              value: z.number(),
            })
          ),
        }),
        z.object({
          label: z.literal("年少人口"),
          data: z.array(subDataSchema),
        }),
        z.object({
          label: z.literal("生産年齢人口"),
          data: z.array(subDataSchema),
        }),
        z.object({
          label: z.literal("老年人口"),
          data: z.array(subDataSchema),
        }),
        z.object({
          label: z.string(),
          data: z.array(subDataSchema),
        }),
      ])
    ),
  }),
});

export type PopulationRes = z.infer<typeof populationResSchema>;
