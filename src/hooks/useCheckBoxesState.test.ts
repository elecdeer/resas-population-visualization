import { useCheckBoxesState } from "./useCheckBoxesState";
import { act, renderHook, RenderResult } from "@testing-library/react-hooks";

describe("useCounterのテスト", () => {
  const initialState = {
    0: true,
    1: false,
    2: true,
  };

  let result: RenderResult<ReturnType<typeof useCheckBoxesState>>;
  beforeEach(() => {
    result = renderHook(() => useCheckBoxesState(initialState)).result;
  });

  test("初期値", () => {
    expect(result.current[0]).toEqual(initialState);
  });

  test("異なる値をセットすると状態が変わる", () => {
    expect(result.current[0]).toEqual(initialState);

    act(() => {
      result.current[1](0, false);
    });
    expect(result.current[0]).toEqual({
      0: false,
      1: false,
      2: true,
    });
  });

  test("同じ値をセットしても状態が変わらない", () => {
    expect(result.current[0]).toEqual(initialState);

    act(() => {
      result.current[1](0, true);
    });
    expect(result.current[0]).toEqual(initialState);
  });
});
