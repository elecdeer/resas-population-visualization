import type { NextApiRequest, NextApiResponse } from "next";
import { fetchResasPrefectures } from "../../lib/fetchResasPrefectures";
import { PrefecturesRes } from "../../lib/schema/prefecturesResSchema";
import createHttpError, { HttpError, isHttpError } from "http-errors";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PrefecturesRes["result"] | HttpError>
) => {
  try {
    const result = await fetchResasPrefectures();
    res.setHeader("Cache-Control", "maxage=43200");
    res.status(200).json(result);
  } catch (e) {
    console.error("error at /population", e);
    if (isHttpError(e)) {
      res.status(e.statusCode).send(e);
    }
    res.status(500).send(new createHttpError["500"]());
  }
};

export default handler;
