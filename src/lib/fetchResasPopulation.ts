import { fetchToResas } from "./fetchToResas";
import {
  PopulationRes,
  populationResSchema,
} from "./schema/populationResSchema";

export type ResasPopulationQuery = {
  prefCode: string;
  cityCode: string;
  addArea?: string;
};

/**
 * RESAS APIにアクセスし、人口構成データを取得する
 * @link https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
 * @param query
 */
export const fetchResasPopulation = async (
  query: ResasPopulationQuery
): Promise<PopulationRes["result"]> => {
  const res = await fetchToResas<ResasPopulationQuery>({
    apiPath: "/api/v1/population/composition/perYear",
    parameter: query,
  });

  const typedRes = populationResSchema.parse(res);
  return typedRes.result;
};
