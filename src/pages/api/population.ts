import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError, { HttpError, isHttpError } from "http-errors";
import { PopulationRes } from "../../lib/schema/populationResSchema";
import {
  fetchResasPopulation,
  ResasPopulationQuery,
} from "../../lib/fetchResasPopulation";

const parseQuery = (query: NextApiRequest["query"], key: string) => {
  const value = query[key];
  if (!value) return "";

  if (Array.isArray(value)) return value.join(",");
  return value;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PopulationRes["result"] | HttpError>
) => {
  const query: ResasPopulationQuery = {
    prefCode: parseQuery(req.query, "prefCode"),
    cityCode: parseQuery(req.query, "cityCode"),
    addArea: parseQuery(req.query, "addArea"),
  };
  try {
    const result = await fetchResasPopulation(query);
    res.setHeader("Cache-Control", "maxage=43200");
    res.status(200).json(result);
  } catch (e) {
    console.error("error at /population", e);
    if (isHttpError(e)) {
      res.status(e.statusCode).send(e);
      return;
    }
    res.status(500).send(new createHttpError["500"]());
  }
};

export default handler;
