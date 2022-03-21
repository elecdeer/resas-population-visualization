import { YearlyLineChart, YearlyLineChartProps } from "./YearlyLineChart";
import { Line } from "recharts";

export default {
  title: "ui/GeneralLineChart",
  component: YearlyLineChart,
};

const data = [
  {
    year: 2000,
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    year: 2002,
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    year: 2003,
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    year: 2004,
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    year: 2005,
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    year: 2006,
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    year: 2007,
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const Default = (args: YearlyLineChartProps) => (
  <YearlyLineChart {...args} data={data}>
    <Line type={"linear"} dataKey={"pv"} />
    <Line type={"linear"} dataKey={"uv"} />
  </YearlyLineChart>
);
