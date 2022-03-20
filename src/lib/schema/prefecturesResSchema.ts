import { z } from "zod";

/**
 * /api/v1/prefecturesのレスポンスのスキーマ
 */
export const prefecturesResSchema = z.object({
  message: z.nullable(z.string()),
  result: z.array(
    z.object({
      prefCode: z.number(),
      prefName: z.string(),
    })
  ),
});

export type PrefecturesRes = z.infer<typeof prefecturesResSchema>;
