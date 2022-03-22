import { PrefecturePopulation } from "./PrefecturePopulation";
import { render } from "@testing-library/react";

test("PrefecturePopulation Component Snapshot Test", () => {
  const { asFragment } = render(<PrefecturePopulation />);
  expect(asFragment()).toMatchSnapshot();
});