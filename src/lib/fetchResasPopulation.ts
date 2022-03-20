import { fetchToResas } from "./fetchToResas";
import {
  PopulationRes,
  populationResSchema,
} from "./schema/populationResSchema";

export type PopulationParam = {
  prefCode: number;
  cityCode: string | "-";
  addArea?: {
    prefCode: number;
    cityCode?: string;
  }[];
};

type FormattedParam = Omit<PopulationParam, "addArea"> & {
  addArea?: string;
};

/**
 * RESAS APIにアクセスし、人口構成データを取得する
 * @link https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
 * @param param
 */
export const fetchResasPopulation = async (
  param: PopulationParam
): Promise<PopulationRes["result"]> => {
  const formattedParam = {
    ...param,
    addArea: param.addArea
      ?.map((area) => `${area.prefCode}_${area.cityCode}`)
      .join(),
  };

  const res = await fetchToResas<FormattedParam>({
    apiPath: "/api/v1/population/composition/perYear",
    parameter: formattedParam,
  });

  const typedRes = populationResSchema.parse(res);
  return typedRes.result;
};
