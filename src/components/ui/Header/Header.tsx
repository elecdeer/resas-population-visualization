import React from "react";
import styles from "./Header.module.scss";

export type HeaderProps = {
  pageTitle: string;
};

export const Header: React.FC<HeaderProps> = ({ pageTitle, children }) => {
  return (
    <header className={styles["header"]}>
      <h1>{children ?? pageTitle}</h1>
    </header>
  );
};
