import clsx from "clsx";
import * as React from "react";
import * as styles from "./InfoCard.module.css";

interface InfoCardProps {
  title: string;
  content: JSX.Element | string;
  layoutClassName?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, layoutClassName }) => {
  return (
    <div className={clsx([layoutClassName && layoutClassName], styles.container)}>
      <span className={styles.title}>{title}</span>

      <div className={styles.content}>{content}</div>
    </div>
  );
};
