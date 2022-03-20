import { stringifyRecordValue } from "./stringifyRecordValue";
import createHttpError from "http-errors";
import { resasErrorSchema } from "./schema/resasErrorSchema";

/**
 * RESAS APIにfetchしてデータを取得する
 * @param endpoint RESASのエンドポイント 通常はhttps://opendata.resas-portal.go.jp
 * @param apiKey RESASのAPIキー
 * @param apiPath APIへのパス
 * @param body リクエストに含むBody
 */
export const fetchToResas = async <
  TParameterSchema extends Record<string, number | string | boolean>
>({
  endpoint = process.env.RESAS_API_ENDPOINT,
  apiKey = process.env.RESAS_API_KEY,
  apiPath,
  parameter,
}: {
  endpoint?: string;
  apiKey?: string;
  apiPath: string;
  parameter: TParameterSchema;
}): Promise<unknown> => {
  if (!endpoint) {
    throw new Error("RESAS APIのエンドポイントが設定されていません");
  }
  if (!apiKey) {
    throw new Error("RESASのAPIキーが設定されていません");
  }

  const url = new URL(apiPath, endpoint);
  if (parameter) {
    const urlParam = new URLSearchParams(stringifyRecordValue(parameter));
    url.search = urlParam.toString();
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "X-API-KEY": apiKey,
    },
  });

  if (!res.ok) {
    throw createHttpError(
      res.status,
      `RESAS API Respond Error: ${res.statusText}`
    );
  }

  //RESASのAPIはエラーの場合でも200を返すことがある
  const resJson = await res.json();
  const errorParse = resasErrorSchema.safeParse(resJson);
  if (errorParse.success) {
    const errorCode = Number(
      typeof errorParse.data === "string"
        ? errorParse.data
        : errorParse.data.statusCode
    );
    throw createHttpError(errorCode, errorParse.data);
  } else {
    return resJson;
  }
};
