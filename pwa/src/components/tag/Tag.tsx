import * as React from "react";
import * as styles from "./Tag.module.css";
import clsx from "clsx";
import { navigate } from "gatsby";

interface TagProps {
  tag: string;
  icon?: JSX.Element;
}

export const Tag: React.FC<TagProps> = ({ tag, icon }) => (
  <a className={styles.tag}>
    {icon && <span>{icon}</span>}
    <span>{tag}</span>
  </a>
);

interface TagIconLinkProps {
  tag?: string;
  icon: JSX.Element;
  href: string;
}

export const TagIconLinkProps: React.FC<TagIconLinkProps> = ({ icon, href, tag }) => (
  <div className={clsx(styles.tag, styles.tagIconLinkProps)} onClick={() => navigate(href)}>
    {tag && <span>{tag}</span>}
    <span>{icon}</span>
  </div>
);
