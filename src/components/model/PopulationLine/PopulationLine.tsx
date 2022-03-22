import React, { useMemo } from "react";
import { Line } from "recharts";
import { usePopulation } from "../../../hooks/usePopulation";

export type PopulationLineProps = {
  prefCode: number;
  dataLabel?: string;
  name: string;
};

export const PopulationLine: React.VFC<PopulationLineProps> = ({
  prefCode,
  dataLabel = "総人口",
  name,
}) => {
  console.log("render populationLine");
  const { data, error } = usePopulation({
    prefCode: prefCode,
    cityCode: "-",
  });
  if (error) {
    console.error(error);
  }

  const populationData = useMemo(
    () => data?.data.find((item) => item.label === dataLabel)?.data,
    [data?.data, dataLabel]
  );
  console.log(populationData);

  if (!populationData) {
    return <></>;
  }

  return <Line dataKey={"value"} data={populationData} name={name} />;
};
//
// @ts-ignore
PopulationLine.defaultProps = Line.defaultProps;
PopulationLine.displayName = Line.displayName;
// @ts-ignore
PopulationLine.getComposedData = Line.getComposedData;
// @ts-ignore
PopulationLine.repeat = Line.repeat;
// @ts-ignore
PopulationLine.renderDotItem = Line.renderDotItem;
