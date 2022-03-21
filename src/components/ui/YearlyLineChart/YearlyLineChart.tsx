import React from "react";
import {
  CartesianGrid,
  Legend,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type YearlyChartData = {
  year: number;
} & Record<string, number>;

export type YearlyLineChartProps = React.ComponentProps<typeof LineChart> & {
  data: YearlyChartData[];
};

export const YearlyLineChart: React.FC<YearlyLineChartProps> = ({
  children,
  ...props
}) => {
  return (
    <ResponsiveContainer height={300} width={"100%"}>
      <LineChart {...props}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend layout="vertical" verticalAlign="top" align="right" />
        {children}
      </LineChart>
    </ResponsiveContainer>
  );
};
