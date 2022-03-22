import { PrefecturesRes } from "../lib/schema/prefecturesResSchema";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useCheckBoxesState } from "./useCheckBoxesState";

type PrefectureItem = PrefecturesRes["result"][number] & {
  checked: boolean;
};

type CheckStateRecord = Record<number, boolean>;

const parseRouterQuery = (
  queryValue: string | string[] | undefined
): number[] => {
  if (!queryValue) return [];
  return Array.from(queryValue)
    .filter((item) => Number.isInteger(item))
    .map((item) => Number(item));
};

export const usePrefecturesState = (
  prefecturesData: PrefecturesRes["result"]
) => {
  const router = useRouter();
  const query = router.query["prefectures"];

  const [state, setMapState] = useCheckBoxesState(() => {
    return prefecturesData.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.prefCode]: parseRouterQuery(query).includes(cur.prefCode),
      }),
      {} as CheckStateRecord
    );
  });

  const set = useCallback(
    (prefCode: number, checked: boolean) => {
      setMapState(prefCode, checked);

      const removedState = parseRouterQuery(router.query["prefectures"]).filter(
        (item) => item !== prefCode
      );

      if (checked) {
        //queryに付け足す
        router.query = {
          ...router.query,
          prefectures: [...removedState, prefCode]
            .sort((a, b) => a - b)
            .map((code) => String(code)),
        };
      } else {
        //queryから取り除く
        router.query = {
          ...router.query,
          prefectures: [...removedState]
            .sort((a, b) => a - b)
            .map((code) => String(code)),
        };
      }
    },
    [router, setMapState]
  );

  return [state, set];
};
