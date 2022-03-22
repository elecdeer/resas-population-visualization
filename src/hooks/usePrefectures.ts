import useSWR, { Fetcher } from "swr";
import { PrefecturesRes } from "../lib/schema/prefecturesResSchema";

const fetcher: Fetcher<PrefecturesRes["result"], string> = async (
  url: string
) => {
  const res = await fetch(url);
  return (await res.json()) as PrefecturesRes["result"];
};

/**
 * API Routeの/prefecturesから都道府県データを取得する
 */
export const usePrefectures = () => {
  return useSWR("/api/prefectures", fetcher);
};
