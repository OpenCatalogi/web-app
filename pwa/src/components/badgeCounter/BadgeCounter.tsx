import * as React from "react";
import * as styles from "./BadgeCounter.module.css";
import clsx from "clsx";

interface BadgeCounterProps {
  number: number;
  children: React.ReactNode;
  layoutClassName?: string;
  stylingClassName?: string;
}

export const BadgeCounter: React.FC<BadgeCounterProps> = ({ number, children, layoutClassName, stylingClassName }) => (
  <div className={styles.content}>
    {children}
    {number < 99 && (
      <span
        className={clsx([layoutClassName && layoutClassName], [stylingClassName && stylingClassName], styles.badge)}
      >
        {number}
      </span>
    )}
    {number > 99 && (
      <span
        className={clsx(
          [layoutClassName && layoutClassName],
          [stylingClassName && stylingClassName],
          styles.badge,
          styles.maxNumber,
        )}
      >
        99+
      </span>
    )}
  </div>
);
