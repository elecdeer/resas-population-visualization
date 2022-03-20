import { fetchToResas } from "./fetchToResas";
import {
  PrefecturesRes,
  prefecturesResSchema,
} from "./schema/prefecturesResSchema";

/**
 * RESAS APIにアクセスし、都道府県名の一覧を取得する
 * @link https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
 */
export const fetchResasPrefectures = async (): Promise<
  PrefecturesRes["result"]
> => {
  const res = await fetchToResas<Record<string, never>>({
    apiPath: "/api/v1/prefectures",
    parameter: {},
  });

  const typedRes = prefecturesResSchema.parse(res);
  return typedRes.result;
};
