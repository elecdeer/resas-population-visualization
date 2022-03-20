import { populationParamSchema } from "./populationParamSchema";

describe("populationParamSchemaのスキーマテスト", () => {
  test("パースできる値", () => {
    expect(() => {
      populationParamSchema.parse({
        prefCode: 1,
        cityCode: "01100",
        addArea: [
          {
            prefCode: 2,
          },
        ],
      });
    }).not.toThrow();

    expect(() => {
      populationParamSchema.parse({
        prefCode: 1,
        cityCode: "-",
      });
    }).not.toThrow();

    expect(() => {
      populationParamSchema.parse({
        prefCode: 1,
        cityCode: "01100",
        addArea: [
          {
            prefCode: 1,
            cityCode: "01101",
          },
          {
            prefCode: 1,
            cityCode: "01102",
          },
        ],
      });
    }).not.toThrow();
  });

  test("パースできない値", () => {
    expect(() => {
      populationParamSchema.parse({
        prefCode: 1,
      });
    }).toThrow();
  });
});
