import { resasErrorSchema } from "./resasErrorSchema";

describe("resasErrorSchemaのスキーマテスト", () => {
  test("パースできる値", () => {
    expect(() => {
      resasErrorSchema.parse(errorResponse);
    }).not.toThrow();

    expect(() => {
      resasErrorSchema.parse("400");
    }).not.toThrow();
  });

  test("パースできない値", () => {
    expect(() => {
      resasErrorSchema.parse(normalRes);
    }).toThrow();
  });
});

const normalRes = {
  message: null,
  result: [
    {
      prefCode: 1,
      prefName: "北海道",
    },
    {
      prefCode: 2,
      prefName: "青森県",
    },
  ],
};

const errorResponse = {
  statusCode: "404",
  message: "404. That's an error.",
  description: "The requested URL /404 was not found on this server.",
};
