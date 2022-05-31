import * as React from "react";
import { Link } from "@gemeente-denhaag/components-react";
import * as styles from "./TopNav.module.css";
import { navigate } from "gatsby";
import clsx from "clsx";

export interface ITopNavItem {
  label: string;
  href: string;
  icon?: JSX.Element;
  linkState?: any;
}

interface TopNavProps {
  items: ITopNavItem[];
  layoutClassName?: string;
}

export const PrimaryTopNav: React.FC<TopNavProps> = ({ items, layoutClassName }) => {
  return (
    <div className={clsx([styles.primary, layoutClassName && layoutClassName])}>
      <nav className={styles.primary}>
        <ul className={styles.ul}>
          {items.map(({ label, href, icon, linkState }, idx) => (
            <li className={styles.li} key={idx} onClick={() => navigate(href, { state: linkState })}>
              <Link className={styles.link} icon={icon} iconAlign="start">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export const SecondaryTopNav: React.FC<TopNavProps> = ({ items, layoutClassName }) => {
  return (
    <div className={clsx([styles.secondary, layoutClassName && layoutClassName])}>
      <nav>
        <ul className={styles.ul}>
          {items.map(({ label, href, icon }, idx) => (
            <li className={styles.li} key={idx}>
              <a className={styles.anchor} href={href} target="_blank">
                <Link className={styles.link} icon={icon} iconAlign="start">
                  {label}
                </Link>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
