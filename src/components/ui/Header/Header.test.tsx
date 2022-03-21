import { Header } from "./Header";
import { render } from "@testing-library/react";

test("Header Component Snapshot Test", () => {
  const { asFragment } = render(<Header pageTitle={"Title"} />);
  expect(asFragment()).toMatchSnapshot();
});
