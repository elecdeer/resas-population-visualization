import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError, { HttpError, isHttpError } from "http-errors";
import { PopulationRes } from "../../lib/schema/populationResSchema";
import { fetchResasPopulation } from "../../lib/fetchResasPopulation";
import { populationParamSchema } from "../../lib/schema/populationParamSchema";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PopulationRes["result"] | HttpError>
) => {
  //bodyを使うのでMethodにはPOSTを使う
  const param = req.body;

  const parseResult = populationParamSchema.safeParse(param);
  if (!parseResult.success) {
    res.status(400).send(new createHttpError["400"]());
    return;
  }

  try {
    const result = await fetchResasPopulation(parseResult.data);
    res.status(200).json(result);
  } catch (e) {
    if (isHttpError(e)) {
      res.status(e.statusCode).send(e);
      return;
    }
    res.status(500).send(new createHttpError["500"]());
  }
};

export default handler;
