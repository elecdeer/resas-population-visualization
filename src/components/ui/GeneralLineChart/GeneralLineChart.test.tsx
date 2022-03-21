import { GeneralLineChart } from "./GeneralLineChart";
import { render } from "@testing-library/react";

test("GeneralLineChart Component Snapshot Test", () => {
  const { asFragment } = render(<GeneralLineChart />);
  expect(asFragment()).toMatchSnapshot();
});