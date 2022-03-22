import { render } from "@testing-library/react";
import { Default } from "./LayoutDisplayAndController.stories";

test("LayoutDisplayAndController Component Snapshot Test", () => {
  const { asFragment } = render(Default());
  expect(asFragment()).toMatchSnapshot();
});
