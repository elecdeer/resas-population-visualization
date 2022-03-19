import { CheckBox } from "./CheckBox";
import { render } from "@testing-library/react";

test("CheckBox Component Snapshot Test", () => {
  const { asFragment } = render(<CheckBox />);
  expect(asFragment()).toMatchSnapshot();
});
