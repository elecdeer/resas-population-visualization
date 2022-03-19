import React from "react";
import styles from "./CheckBox.module.scss";

export type CheckBoxProps = {
  isChecked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  isChecked,
  defaultChecked,
  onChange,
  children,
}) => {
  return (
    <label className={styles.checkBox}>
      <input
        className={styles.input}
        type={"checkbox"}
        defaultChecked={defaultChecked}
        checked={isChecked}
        onChange={onChange}
      />
      <span className={styles.label}>{children}</span>
    </label>
  );
};
