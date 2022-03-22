import { PrefectureController } from "./PrefectureController";
import { render } from "@testing-library/react";

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

test("PrefectureController Component Snapshot Test", () => {
  const { asFragment } = render(
    <PrefectureController
      prefectures={mockPrefData}
      checkState={mockStateData}
      setCheckState={(key, checked) => {}}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
