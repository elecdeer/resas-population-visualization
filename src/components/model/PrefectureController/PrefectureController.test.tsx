import { PrefectureController } from "./PrefectureController";
import { render } from "@testing-library/react";

test("PrefectureController Component Snapshot Test", () => {
  const { asFragment } = render(<PrefectureController />);
  expect(asFragment()).toMatchSnapshot();
});