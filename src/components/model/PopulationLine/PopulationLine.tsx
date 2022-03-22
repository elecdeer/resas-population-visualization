import React, { useMemo } from "react";
import { usePopulation } from "../../../hooks/usePopulation";
import { AnimatedLineSeries } from "@visx/xychart";

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
  const param = useMemo(
    () => ({
      prefCode: prefCode,
      cityCode: "-",
    }),
    [prefCode]
  );

  const { data, error } = usePopulation(param);

  const populationData = useMemo(
    () => data?.data.find((item) => item.label === dataLabel)?.data,
    [data?.data, dataLabel]
  );

  if (!populationData) {
    return <></>;
  }

  return (
    <AnimatedLineSeries
      dataKey={name}
      data={populationData}
      xAccessor={(item) => item.year}
      yAccessor={(item) => item.value}
    />
  );
};
