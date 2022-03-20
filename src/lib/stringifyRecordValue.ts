/**
 * 渡されたオブジェクトのvalueを全てstringに変換する
 * @param param
 */
export const stringifyRecordValue = <
  TRecord extends Record<string, string | number | boolean>
>(
  param: TRecord
): Record<keyof TRecord, string> =>
  Object.entries(param).reduce((acc, [key, value]) => {
    //undefinedとかが紛れ込んだときはそのまま
    if (value === undefined || value === null) {
      return acc;
    }
    return {
      ...acc,
      [key]: value.toString(),
    };
  }, {} as Record<keyof TRecord, string>);
