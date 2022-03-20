import { stringifyRecordValue } from "./stringifyRecordValue";

describe("stringifyRecordValueのテスト", () => {
  test("正しく変換できるか", () => {
    expect(
      stringifyRecordValue({
        str: "str",
        num: 3,
        bool: true,
      })
    ).toEqual({
      str: "str",
      num: "3",
      bool: "true",
    });
  });
});
