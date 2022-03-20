import { fetchToResas } from "./fetchToResas";
import { PrefecturesRes, prefecturesResSchema } from "./prefecturesResSchema";

/**
 * RESAS APIにアクセスし、都道府県名の一覧を取得する
 * @link https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
 */
export const fetchPrefectures = async (): Promise<PrefecturesRes["result"]> => {
  const res = await fetchToResas<Record<string, never>>({
    apiPath: "a",
    parameter: {},
  });

  const typedRes = prefecturesResSchema.parse(res);
  return typedRes.result;
};
