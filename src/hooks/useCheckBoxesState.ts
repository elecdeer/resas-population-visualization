import { SetStateAction, useCallback, useState } from "react";

type CheckStateRecord = Record<number, boolean>;

/**
 * Record<number, boolean>の形式のStateを扱うhook
 * @param initialState
 */
export const useCheckBoxesState = (
  initialState?: CheckStateRecord | (() => CheckStateRecord)
): [
  CheckStateRecord,
  (key: number, state: SetStateAction<boolean>) => void
] => {
  const [innerState, setInnerState] = useState<CheckStateRecord>(
    initialState ?? {}
  );

  const setState = useCallback(
    (key: number, state: SetStateAction<boolean>) => {
      setInnerState((prevState) => {
        if (typeof state === "boolean") {
          return {
            ...prevState,
            [key]: state,
          };
        } else {
          return {
            ...prevState,
            [key]: state(prevState[key]),
          };
        }
      });
    },
    [setInnerState]
  );

  return [innerState, setState];
};
