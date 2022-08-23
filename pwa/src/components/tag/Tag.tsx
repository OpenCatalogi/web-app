import * as React from "react";
import * as styles from "./Tag.module.css";
import clsx from "clsx";

interface TagProps {
  content: {
    tag?: string;
    icon?: JSX.Element;
  };
  onClick?: () => any;
  layoutClassName?: string;
}

export const Tag: React.FC<TagProps> = ({ content, onClick, layoutClassName }) => (
  <div className={clsx(styles.tag, [layoutClassName && layoutClassName], onClick && styles.tagLink)} onClick={onClick}>
    {content.icon && <span>{content.icon}</span>}
    <span>{content.tag}</span>
  </div>
);
