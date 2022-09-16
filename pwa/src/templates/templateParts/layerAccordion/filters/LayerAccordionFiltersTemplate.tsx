import clsx from "clsx";
import * as React from "react";
import * as styles from "./LayerAccordionFiltersTemplate.module.css";

interface LayerAccordionFiltersTemplateProps {
  items: {
    label: string;
    active: boolean;
    handleClick: React.Dispatch<React.SetStateAction<boolean>>;
    badgeNumber?: number;
  }[];
}

export const LayerAccordionFiltersTemplate: React.FC<LayerAccordionFiltersTemplateProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map(({ label, active, handleClick, badgeNumber }, idx) => (
        <>
          {badgeNumber?.toString && (
            <span
              key={idx}
              onClick={() => badgeNumber > 0 && handleClick((o) => !o)}
              className={clsx(
                styles[label.toLowerCase()],
                active && badgeNumber > 0 && styles.active,
                styles.filter,
                badgeNumber <= 0 && styles.disabled,
              )}
            >
              {label}
            </span>
          )}
          {!badgeNumber?.toString && (
            <span
              onClick={() => handleClick((o) => !o)}
              className={clsx(styles[label.toLowerCase()], active && styles.active, styles.filter)}
            >
              {label}
            </span>
          )}
        </>
      ))}
    </div>
  );
};
