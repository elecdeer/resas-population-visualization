import { PageWithHeader } from "./PageWithHeader";
import { render } from "@testing-library/react";
import { Header } from "../Header/Header";

test("PageWithHeader Component Snapshot Test", () => {
  const { asFragment } = render(
    <PageWithHeader header={<Header pageTitle={"Title"} />} />
  );
  expect(asFragment()).toMatchSnapshot();
});
