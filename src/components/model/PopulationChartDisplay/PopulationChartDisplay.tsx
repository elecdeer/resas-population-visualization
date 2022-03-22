import React, { useMemo } from "react";
import { PrefectureCheckStates } from "../../../hooks/usePrefecturesState";
import { PrefecturesRes } from "../../../lib/schema/prefecturesResSchema";
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
import { usePopulation } from "../../../hooks/usePopulation";

export type PopulationChartDisplayProps = {
  prefectures: PrefecturesRes["result"];
  checkState: PrefectureCheckStates;
  showEstimation?: boolean;
};

export const PopulationChartDisplay: React.VFC<PopulationChartDisplayProps> = ({
  prefectures,
  checkState,
  showEstimation = false,
}) => {
  const displayPrefectures = useMemo(
    () => prefectures.filter((pref) => checkState[pref.prefCode]),
    [prefectures, checkState]
  );
  console.log(
    `displayPrefectures: ${displayPrefectures.map((pref) => pref.prefCode)}`
  );

  //今回は事前に全ての県のデータを取得する
  const { data: populations } = usePopulation(prefectures);

  const renderLines = () =>
    displayPrefectures?.map((pref) => (
      <Line dataKey={pref.prefCode} name={pref.prefName} key={pref.prefCode} />
    ));

  return (
    <ResponsiveContainer height={400} width={"100%"}>
      <LineChart data={populations} margin={{ left: 30, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" allowDuplicatedCategory={false} />
        <YAxis />
        <Tooltip />
        <Legend
          layout="vertical"
          verticalAlign="top"
          align="right"
          wrapperStyle={{
            paddingLeft: 20,
          }}
        />
        {renderLines()}
      </LineChart>
    </ResponsiveContainer>
  );
};
