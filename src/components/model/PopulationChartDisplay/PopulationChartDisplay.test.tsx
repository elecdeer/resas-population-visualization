import { render } from "@testing-library/react";
import { PopulationChartDisplay } from "./PopulationChartDisplay";

const mockPrefData = [
  {
    prefCode: 1,
    prefName: "北海道",
  },
  {
    prefCode: 2,
    prefName: "青森県",
  },
  {
    prefCode: 3,
    prefName: "岩手県",
  },
];

const mockStateData = {
  1: true,
  2: false,
  3: false,
};

test("PopulationChartDisplay Component Snapshot Test", () => {
  const { asFragment } = render(
    <PopulationChartDisplay
      prefectures={mockPrefData}
      checkState={mockStateData}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
