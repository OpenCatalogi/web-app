import clsx from "clsx";
import _ from "lodash";
import * as React from "react";
import * as styles from "./ToolTip.module.css";

export type TToolTipDirections = "top" | "bottom" | "right" | "left";

interface ToolTipProps {
  children: React.ReactNode;
  tooltip: string;
  direction: TToolTipDirections;
}

export const ToolTip: React.FC<ToolTipProps> = ({ children, tooltip, direction }) => {
  const [active, setActive] = React.useState(false);
  let timeout: any;

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 700);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div className={styles.wrapper} onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && <div className={clsx(styles.content, styles[direction])}>{tooltip}</div>}
    </div>
  );
};
