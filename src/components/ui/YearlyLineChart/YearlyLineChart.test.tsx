import { YearlyLineChart } from "./YearlyLineChart";
import { render } from "@testing-library/react";
import { Line } from "recharts";

test("YearlyLineChart Component Snapshot Test", () => {
  const { asFragment } = render(
    <YearlyLineChart
      data={[
        {
          year: 2020,
          value: 100,
        },
        {
          year: 2025,
          value: 120,
        },
        {
          year: 2030,
          value: 150,
        },
      ]}
    >
      <Line type={"linear"} dataKey={"value"} />
    </YearlyLineChart>
  );
  expect(asFragment()).toMatchSnapshot();
});
