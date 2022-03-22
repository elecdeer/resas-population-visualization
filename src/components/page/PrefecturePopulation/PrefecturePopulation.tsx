import React from "react";
import styles from "./PrefecturePopulation.module.scss";
import { usePrefectures } from "../../../hooks/usePrefectures";
import { usePrefecturesState } from "../../../hooks/usePrefecturesState";
import { LayoutDisplayAndController } from "../../ui/LayoutDisplayAndController/LayoutDisplayAndController";
import { PrefectureController } from "../../model/PrefectureController/PrefectureController";
import { PopulationChartDisplay } from "../../model/PopulationChartDisplay/PopulationChartDisplay";

export const PrefecturePopulation: React.VFC = () => {
  const { data: prefectureData } = usePrefectures();
  const [checkState, setCheckState] = usePrefecturesState(prefectureData);

  if (!prefectureData) {
    return <p>Loading...</p>;
  }

  return (
    <LayoutDisplayAndController
      controller={
        <PrefectureController
          prefectures={prefectureData}
          checkState={checkState}
          setCheckState={setCheckState}
        />
      }
      display={
        <PopulationChartDisplay
          prefectures={prefectureData}
          checkState={checkState}
        />
      }
    />
  );
};
