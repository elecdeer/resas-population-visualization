import React from "react";
import { CheckBox } from "../../ui/CheckBox/CheckBox";
import { CheckBoxesGridContainer } from "../../ui/CheckBoxesGridContainer/CheckBoxesGridContainer";
import { PrefecturesRes } from "../../../lib/schema/prefecturesResSchema";
import {
  PrefectureCheckStates,
  SetPrefectureCheckStates,
} from "../../../hooks/usePrefecturesState";

export type PrefectureControllerProps = {
  prefectures: PrefecturesRes["result"];
  checkState: PrefectureCheckStates;
  setCheckState: SetPrefectureCheckStates;
};

export const PrefectureController: React.FC<PrefectureControllerProps> = ({
  prefectures,
  checkState,
  setCheckState,
}) => {
  return (
    <CheckBoxesGridContainer>
      {prefectures.map((pref) => {
        const handleChangeCheck: React.ChangeEventHandler<HTMLInputElement> = (
          e
        ) => {
          console.log(`handleOnChange: ${pref.prefCode} ${e.target.checked}`);
          setCheckState(pref.prefCode, e.target.checked);
        };

        return (
          <CheckBox
            defaultChecked={checkState[pref.prefCode]}
            isChecked={checkState[pref.prefCode]}
            onChange={handleChangeCheck}
            key={pref.prefCode}
          >
            {pref.prefName}
          </CheckBox>
        );
      })}
    </CheckBoxesGridContainer>
  );
};
