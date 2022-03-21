import { CheckBoxesGridContainer } from "./CheckBoxesGridContainer";
import { render } from "@testing-library/react";

test("CheckBoxesGridContainer Component Snapshot Test", () => {
  const { asFragment } = render(<CheckBoxesGridContainer />);
  expect(asFragment()).toMatchSnapshot();
});