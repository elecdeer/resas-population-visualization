import { fetchToResas } from "./fetchToResas";
import { PrefecturesRes, prefecturesResSchema } from "./prefecturesResSchema";

export const fetchPrefectures = async (): Promise<PrefecturesRes["result"]> => {
  const res = await fetchToResas<Record<string, never>>({
    apiPath: "a",
    parameter: {},
  });

  const typedRes = prefecturesResSchema.parse(res);
  return typedRes.result;
};
