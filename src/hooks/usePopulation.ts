import { PopulationRes } from "../lib/schema/populationResSchema";
import useSWR, { Fetcher } from "swr";
import { PrefecturesRes } from "../lib/schema/prefecturesResSchema";

type ResultItem = {
  year: number;
} & Record<number, number>;

// type OldFmt = {
//   prefCode: number;
//   data: {
//     year: number;
//     value: number;
//   }[];
// }[];
//
// type MidFmt = {
//   prefCode: number;
//   year: number;
//   value: number;
// }[];
//
// type NewFmt = ({
//   year: number;
// } & Record<number, number>)[];

const fetcher: Fetcher<
  ResultItem[],
  {
    url: string;
    prefectures: PrefecturesRes["result"];
    label: string;
    showEstimation?: boolean;
  }
> = async ({ url, prefectures, showEstimation = false, label }) => {
  const eachPrefPopulation = await Promise.all(
    prefectures.map(async (pref) => {
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

  const allFlatData = eachPrefPopulation.reduce<
    {
      prefCode: number;
      year: number;
      value: number;
    }[]
  >((acc, cur) => {
    if (!cur.data) return acc;
    const flatData = cur.data?.map((item) => ({
      prefCode: cur.prefCode,
      year: item.year,
      value: item.value,
    }));
    return [...acc, ...flatData];
  }, []);

  const collectedData = allFlatData.reduce<
    Record<number, { year: number } & Record<number, number>>
  >((acc, cur) => {
    return {
      ...acc,
      [cur.year]: {
        ...acc[cur.year],
        year: cur.year,
        [cur.prefCode]: cur.value,
      },
    };
  }, {});

  return Object.values(collectedData);
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
