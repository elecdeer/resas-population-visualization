import React, { useMemo } from "react";
import { PrefectureCheckStates } from "../../../hooks/usePrefecturesState";
import { PrefecturesRes } from "../../../lib/schema/prefecturesResSchema";
import { PopulationLine } from "../PopulationLine/PopulationLine";
import { YearlyLineChart } from "../../ui/YearlyLineChart/YearlyLineChart";
import { AnimatedLineSeries } from "@visx/xychart";

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

  // return (
  //   <ResponsiveContainer height={300} width={"100%"}>
  //     <LineChart>
  //       <CartesianGrid strokeDasharray="3 3" />
  //       <XAxis dataKey="year" />
  //       <YAxis />
  //       <Tooltip />
  //       <Legend layout="vertical" verticalAlign="top" align="right" />
  //       {/*{renderLines()}*/}
  //       <Line dataKey={"value"} data={data} name={"どこか"} />)
  //       <PopulationLine prefCode={1} name={"北海道"} />
  //     </LineChart>
  //   </ResponsiveContainer>
  // );

  return (
    <YearlyLineChart>
      {renderLines()}
      <AnimatedLineSeries
        display={"none"}
        dataKey={"dummy"}
        data={dummyData}
        xAccessor={(item) => item.year}
        yAccessor={(item) => item.value}
      />
    </YearlyLineChart>
  );
};

const dummyData = [...Array(18)]
  .map((_, i) => i * 5 + 1960)
  .map((year) => ({
    year: year,
    value: 1000000,
  }));
