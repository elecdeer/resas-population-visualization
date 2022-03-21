import { LayoutDisplayAndController } from "./LayoutDisplayAndController";
import { render } from "@testing-library/react";

test("LayoutDisplayAndController Component Snapshot Test", () => {
  const { asFragment } = render(<LayoutDisplayAndController />);
  expect(asFragment()).toMatchSnapshot();
});