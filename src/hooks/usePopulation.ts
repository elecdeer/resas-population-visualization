import { PopulationRes } from "../lib/schema/populationResSchema";
import useSWR, { Fetcher } from "swr";
import { PrefecturesRes } from "../lib/schema/prefecturesResSchema";

type ResultItem = {
  year: number;
} & Record<number, number>;

const fetcher: Fetcher<
  (PrefecturesRes["result"][number] & {
    label: string | undefined;
    data: PopulationRes["result"]["data"][number]["data"] | undefined;
  })[],
  {
    url: string;
    prefectures: PrefecturesRes["result"];
    label: string;
    showEstimation?: boolean;
  }
> = ({ url, prefectures, showEstimation = false, label }) => {
  console.log(`fetch populations: ${prefectures}`);

  return Promise.all(
    prefectures.map(async (pref) => {
      console.log(`fetch pref ${pref.prefCode}`);
      console.log(url);

      const params = new URLSearchParams();
      params.set("prefCode", String(pref.prefCode));
      params.set("cityCode", "-");

      const res = await fetch(`${url}?${params}`);
      const result = (await res.json()) as PopulationRes["result"];

      const groupData = result.data.find((item) => item.label === label);

      return {
        ...pref,
        label: groupData?.label,
        data: showEstimation
          ? groupData?.data
          : groupData?.data.filter(
              (yearItem) => yearItem.year <= result.boundaryYear
            ),
      };
    })
  );
};

export const usePopulation = (
  prefectures: PrefecturesRes["result"],
  label: string = "総人口"
) => {
  return useSWR(
    prefectures
      ? {
          url: "/api/population",
          prefectures: prefectures,
          label: label,
        }
      : null,
    fetcher
  );
};
