import React from "react";
import { AnimatedAxis, AnimatedGrid, Tooltip, XYChart } from "@visx/xychart";

export type YearlyLineChartProps = {};

export const YearlyLineChart: React.FC<YearlyLineChartProps> = ({
  children,
}) => {
  //Tooltip
  return (
    <div>
      <XYChart
        height={400}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
        margin={{ left: 100, top: 50, bottom: 50, right: 50 }}
      >
        <AnimatedGrid />
        <AnimatedAxis orientation={"bottom"} label={"年度"} />
        <AnimatedAxis
          orientation={"left"}
          label={"人口数"}
          labelOffset={70}
          tickLabelProps={() => ({ dx: -10 })}
        />
        {children}
      </XYChart>
    </div>
  );
};
