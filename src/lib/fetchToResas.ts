/**
 * RESAS APIにfetchしてデータを取得する
 * @param endpoint RESASのエンドポイント 通常はhttps://opendata.resas-portal.go.jp
 * @param apiKey RESASのAPIキー
 * @param apiPath APIへのパス
 * @param body リクエストに含むBody
 */
import { stringifyRecordValue } from "./stringifyRecordValue";

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
    throw new Error(`Response Error: ${res.status} ${res.statusText}`);
  }

  const resJson = await res.json();
  //RESASのAPIは常にレスポンスヘッダが200
  if (resJson.statusCode) {
    throw new Error(
      `Response Error: ${resJson.message} ${resJson.description}`
    );
  } else {
    return res;
  }
};
