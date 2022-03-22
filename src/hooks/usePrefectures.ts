import useSWR, { Fetcher } from "swr";
import { PrefecturesRes } from "../lib/schema/prefecturesResSchema";

const fetcher: Fetcher<PrefecturesRes["result"], string> = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<PrefecturesRes["result"]>);

/**
 * API Routeの/prefecturesから都道府県データを取得する
 */
export const usePrefectures = () => {
  return useSWR("/api/prefectures", fetcher);
};
