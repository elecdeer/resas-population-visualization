import createHttpError from "http-errors";
import { resasErrorSchema } from "./schema/resasErrorSchema";
import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 3600,
});

/**
 * RESAS APIにfetchしてデータを取得する
 * @param endpoint RESASのエンドポイント 通常はhttps://opendata.resas-portal.go.jp
 * @param apiKey RESASのAPIキー
 * @param apiPath APIへのパス
 * @param body リクエストに含むBody
 */
export const fetchToResas = async <
  TParameterSchema extends Record<string, string>
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
  console.log(`param: ${parameter}`);
  if (parameter) {
    const urlParam = new URLSearchParams(removeInvalidParam(parameter));
    url.search = urlParam.toString();
  }

  const cacheData = cache.get(url.toString());
  if (!!cacheData) {
    console.log(`useCache: key:${url} value:${cacheData}`);
    return cacheData;
  }

  console.log(`fetchToResas: ${url}`);

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
    cache.set(url.toString(), resJson);
    console.log(`setCache: key: ${url.toString()} value: ${resJson}`);
    return resJson;
  }
};

const removeInvalidParam = (
  parameter: Record<string, string>
): Record<string, string> => {
  return Object.entries(parameter)
    .filter(([_, value]) => !!value)
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {}
    );
};
