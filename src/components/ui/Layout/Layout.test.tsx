import { Layout } from "./Layout";
import { render } from "@testing-library/react";

test("Layout Component Snapshot Test", () => {
  const { asFragment } = render(<Layout />);
  expect(asFragment()).toMatchSnapshot();
});