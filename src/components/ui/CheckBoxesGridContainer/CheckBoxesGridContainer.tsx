import React from "react";
import styles from "./CheckBoxesGridContainer.module.scss";

export type CheckBoxesGridContainerProps = {};

export const CheckBoxesGridContainer: React.FC<CheckBoxesGridContainerProps> =
  ({ children }) => {
    return (
      <div className={styles["check-boxes-grid-container"]}>{children}</div>
    );
  };
