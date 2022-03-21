import React from "react";
import styles from "./Header.module.scss";
import Head from "next/head";

export type HeaderProps = {
  pageTitle: string;
};

export const Header: React.FC<HeaderProps> = ({ pageTitle, children }) => {
  return (
    <div className={styles["header"]}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <h1>{children ?? pageTitle}</h1>
    </div>
  );
};
