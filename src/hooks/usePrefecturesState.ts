import { PrefecturesRes } from "../lib/schema/prefecturesResSchema";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
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
  if (Array.isArray(queryValue)) return queryValue.map((item) => Number(item));
  return queryValue
    .split(",")
    .map((item) => Number(item))
    .filter((item) => Number.isInteger(item));
};

export const usePrefecturesState = (
  prefecturesData: PrefecturesRes["result"] | undefined
): [PrefectureCheckStates, SetPrefectureCheckStates] => {
  const router = useRouter();

  const [state, setMapState] = useCheckBoxesState(() => {
    return (
      prefecturesData?.map((item) => ({
        [item.prefCode]: false,
      })) ?? {}
    );
  });

  //初回レンダー時はqueryはundefinedなので遅延
  useEffect(() => {
    const query = router.query["prefectures"];
    const queryPref = parseRouterQuery(query);
    console.log("fromQuery", queryPref);
    queryPref.forEach((prefCode) => {
      setMapState(prefCode, true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, setMapState]);

  const set = useCallback(
    (prefCode: number, checked: boolean) => {
      setMapState(prefCode, checked);

      const removedState = parseRouterQuery(router.query["prefectures"]).filter(
        (item) => item !== prefCode
      );

      if (checked) {
        //queryに付け足す
        const nextQuery = {
          ...router.query,
          prefectures: [...removedState, prefCode]
            .sort((a, b) => a - b)
            .map((code) => String(code))
            .join(","),
        };

        void router.push({ query: nextQuery }, undefined, {
          scroll: false,
        });
      } else {
        //queryから取り除く
        const nextQuery = {
          ...router.query,
          prefectures: [...removedState]
            .sort((a, b) => a - b)
            .map((code) => String(code))
            .join(","),
        };

        void router.push({ query: nextQuery }, undefined, {
          scroll: false,
        });
      }
    },
    [router, setMapState]
  );

  return [state, set];
};
