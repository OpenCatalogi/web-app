import * as React from "react";
import * as styles from "./Tag.module.css";
import clsx from "clsx";

interface TagProps {
  label: string;
  icon?: JSX.Element;
  onClick?: () => any;
  layoutClassName?: string;
}

export const Tag: React.FC<TagProps> = ({ label, icon, onClick, layoutClassName }) => (
  <div className={clsx(styles.tag, [layoutClassName && layoutClassName], onClick && styles.clickable)} {...{ onClick }}>
    {icon && <span>{icon}</span>}
    <span>{label}</span>
  </div>
);
