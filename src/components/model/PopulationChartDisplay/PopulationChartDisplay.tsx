import React from "react";
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
import { useRandomColors } from "../../../hooks/useRandomColors";
export type PopulationChartDisplayProps = {
  prefectures: PrefecturesRes["result"];
  checkState: PrefectureCheckStates;
  showEstimation?: boolean;
};
// import styles from "./PopulationChartDisplay.module.scss";

const numberFormat = new Intl.NumberFormat("en").format;

export const PopulationChartDisplay: React.VFC<PopulationChartDisplayProps> = ({
  prefectures,
  checkState,
  showEstimation = false,
}) => {
  //今回は事前に全ての県のデータを取得する
  const { data: populations } = usePopulation(prefectures);

  const randomColors = useRandomColors(prefectures.length);

  const renderLines = () =>
    prefectures?.map((pref) => (
      <Line
        dataKey={pref.prefCode}
        name={pref.prefName}
        key={pref.prefCode}
        hide={!checkState[pref.prefCode]}
        stroke={randomColors[pref.prefCode]}
        isAnimationActive={false}
      />
    ));

  //scssモジュールだとグローバルなCSSを付けられないのでstyled-jsxでやる
  return (
    <>
      <style global jsx>{`
        //  アクティブでない凡例を隠す
        li.recharts-legend-item.inactive {
          display: none !important;
        }
      `}</style>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={populations} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            allowDuplicatedCategory={false}
            tick={{ fontSize: 10 }}
            label={{
              value: "年度",
              position: "insideBottomRight",
              fontSize: 10,
            }}
          />
          <YAxis
            tick={{ fontSize: 10 }}
            label={{
              value: "人口数",
              position: "insideTopLeft",
              fontSize: 10,
              angle: -90,
              dy: 40,
              dx: 0,
            }}
            tickFormatter={(value) => numberFormat(value)}
          />
          <Tooltip />
          <Legend
            width={120}
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
    </>
  );
};
