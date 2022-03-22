import { PopulationRes } from "../lib/schema/populationResSchema";
import useSWR, { Fetcher } from "swr";
import { PopulationParam } from "../lib/schema/populationParamSchema";

const fetcher: Fetcher<PopulationRes["result"], [string, PopulationParam]> = (
  url,
  param
) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(param),
  }).then((res) => res.json() as Promise<PopulationRes["result"]>);

export const usePopulation = (param: PopulationParam | null) => {
  return useSWR(param ? ["/api/population", param] : null, fetcher);
};
