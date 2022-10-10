import * as React from "react";
import * as styles from "./NodeToolTip.module.css";
import clsx from "clsx";

interface NodeToolTipProps {
  tooltip: string;
}

export const NodeToolTip: React.FC<NodeToolTipProps> = ({ tooltip }) => {
  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.content, styles.top)}>{tooltip}</div>
    </div>
  );
};
