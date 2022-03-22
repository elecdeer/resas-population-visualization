import React from "react";
import { PrefecturePopulation } from "./PrefecturePopulation";
import { PageWithHeader } from "../../ui/PageWithHeader/PageWithHeader";
import { Header } from "../../ui/Header/Header";

export const PrefecturePopulationPage: React.VFC = () => {
  return (
    <PageWithHeader header={<Header pageTitle={"Title"} />}>
      <PrefecturePopulation />
    </PageWithHeader>
  );
};
