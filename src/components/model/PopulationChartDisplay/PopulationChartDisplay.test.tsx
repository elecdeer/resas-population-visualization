import { PopulationChartDisplay } from "./PopulationChartDisplay";
import { render } from "@testing-library/react";

test("PopulationChartDisplay Component Snapshot Test", () => {
  const { asFragment } = render(<PopulationChartDisplay />);
  expect(asFragment()).toMatchSnapshot();
});