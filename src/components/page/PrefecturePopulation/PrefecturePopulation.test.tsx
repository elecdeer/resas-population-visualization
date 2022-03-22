import { PrefecturePopulation } from "./PrefecturePopulation";
import { render } from "@testing-library/react";

jest.mock("next/dist/client/router", () => ({
  __esModule: true,
  useRouter: () => ({
    query: {},
    pathname: "/",
    asPath: "/",
    events: {
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    },
    push: jest.fn(() => Promise.resolve(true)),
    prefetch: jest.fn(() => Promise.resolve(true)),
    replace: jest.fn(() => Promise.resolve(true)),
  }),
}));

test("PrefecturePopulation Component Snapshot Test", () => {
  const { asFragment } = render(<PrefecturePopulation />);
  expect(asFragment()).toMatchSnapshot();
});
