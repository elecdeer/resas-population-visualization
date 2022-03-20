import { z } from "zod";

export const resasErrorSchema = z.union([
  z.literal("400"),
  z.object({
    statusCode: z.literal("403"),
    message: z.string(),
    description: z.string(),
  }),
  z.object({
    statusCode: z.literal("404"),
    message: z.string(),
    description: z.string(),
  }),
  z.literal("404"),
]);

export type ResasErrorRes = z.infer<typeof resasErrorSchema>;
