import React from "react";

export type PageWithHeaderProps = {
  header: React.ReactElement;
};

export const PageWithHeader: React.FC<PageWithHeaderProps> = ({
  children,
  header,
}) => {
  return (
    <>
      <header>{header}</header>
      {children}
    </>
  );
};
