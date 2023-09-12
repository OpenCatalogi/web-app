import * as React from "react";
import * as styles from "./TableWrapper.module.css";

export const TableWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
