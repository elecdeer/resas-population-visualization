import { PrefecturesRes } from "../lib/schema/prefecturesResSchema";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useCheckBoxesState } from "./useCheckBoxesState";

export type PrefectureCheckStates = Record<number, boolean>;
export type SetPrefectureCheckStates = (
  prefCode: number,
  checked: boolean
) => void;

const parseRouterQuery = (
  queryValue: string | string[] | undefined
): number[] => {
  if (!queryValue) return [];
  return Array.from(queryValue)
    .filter((item) => Number.isInteger(item))
    .map((item) => Number(item));
};

export const usePrefecturesState = (
  prefecturesData: PrefecturesRes["result"] | undefined
): [PrefectureCheckStates, SetPrefectureCheckStates] => {
  const router = useRouter();
  const query = router.query["prefectures"];

  const [state, setMapState] = useCheckBoxesState(() => {
    if (!prefecturesData) {
      return {};
    }
    return prefecturesData.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.prefCode]: parseRouterQuery(query).includes(cur.prefCode),
      }),
      {} as PrefectureCheckStates
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
