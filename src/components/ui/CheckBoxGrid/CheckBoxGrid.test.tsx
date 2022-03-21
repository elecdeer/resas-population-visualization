import { CheckBoxGrid } from "./CheckBoxGrid";
import { render } from "@testing-library/react";

test("CheckBoxGrid Component Snapshot Test", () => {
  const { asFragment } = render(<CheckBoxGrid />);
  expect(asFragment()).toMatchSnapshot();
});