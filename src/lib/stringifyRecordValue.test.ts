import { stringifyRecordValue } from "./stringifyRecordValue";

test("stringifyRecordValue test", () => {
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
