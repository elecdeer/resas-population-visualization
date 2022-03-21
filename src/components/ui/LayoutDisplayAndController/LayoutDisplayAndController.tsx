import React from "react";
import styles from "./LayoutDisplayAndController.module.scss";

export type LayoutDisplayAndControllerProps = {
  display: React.ReactElement;
  controller: React.ReactElement;
};

export const LayoutDisplayAndController: React.VFC<LayoutDisplayAndControllerProps> =
  ({ controller, display }) => {
    return (
      <div className={styles["layout-display-and-controller"]}>
        <div className={styles["controller"]}>{controller}</div>
        <div className={styles["display"]}>{display}</div>
      </div>
    );
  };
