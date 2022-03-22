import React, { useMemo } from "react";
import { PrefectureCheckStates } from "../../../hooks/usePrefecturesState";
import { PrefecturesRes } from "../../../lib/schema/prefecturesResSchema";
import { PopulationLine } from "../PopulationLine/PopulationLine";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type PopulationChartDisplayProps = {
  prefectures: PrefecturesRes["result"];
  checkState: PrefectureCheckStates;
};

export const PopulationChartDisplay: React.VFC<PopulationChartDisplayProps> = ({
  prefectures,
  checkState,
}) => {
  const displayPrefectures = useMemo(
    () => prefectures.filter((pref) => checkState[pref.prefCode]),
    [prefectures, checkState]
  );
  console.log(
    `displayPrefectures: ${displayPrefectures.map((pref) => pref.prefCode)}`
  );

  const renderLines = () =>
    displayPrefectures.map((pref) => (
      <PopulationLine
        prefCode={pref.prefCode}
        name={pref.prefName}
        key={`prefecture-line-${pref.prefCode}`}
      />
    ));

  const data = [
    {
      year: 1960,
      value: 5039206,
    },
    {
      year: 1965,
      value: 5171800,
    },
    {
      year: 1970,
      value: 5184287,
    },
    {
      year: 1975,
      value: 5338206,
    },
    {
      year: 1980,
      value: 5575989,
    },
    {
      year: 1985,
      value: 5679439,
    },
    {
      year: 1990,
      value: 5643647,
    },
    {
      year: 1995,
      value: 5692321,
    },
    {
      year: 2000,
      value: 5683062,
    },
    {
      year: 2005,
      value: 5627737,
    },
    {
      year: 2010,
      value: 5506419,
    },
    {
      year: 2015,
      value: 5381733,
    },
    {
      year: 2020,
      value: 5216615,
    },
    {
      year: 2025,
      value: 5016554,
    },
    {
      year: 2030,
      value: 4791592,
    },
    {
      year: 2035,
      value: 4546357,
    },
    {
      year: 2040,
      value: 4280427,
    },
    {
      year: 2045,
      value: 4004973,
    },
  ];
  return (
    <ResponsiveContainer height={300} width={"100%"}>
      <LineChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend layout="vertical" verticalAlign="top" align="right" />
        {/*{renderLines()}*/}
        <Line dataKey={"value"} data={data} name={"どこか"} />)
        <PopulationLine prefCode={1} name={"北海道"} />
      </LineChart>
    </ResponsiveContainer>
  );

  // return (
  //   <YearlyLineChart>
  //     {displayPrefectures.map((pref) => (
  //       <PopulationLine
  //         prefCode={pref.prefCode}
  //         name={pref.prefName}
  //         key={`prefecture-line-${pref.prefCode}`}
  //       />
  //     ))}
  //   </YearlyLineChart>
  // );
};
