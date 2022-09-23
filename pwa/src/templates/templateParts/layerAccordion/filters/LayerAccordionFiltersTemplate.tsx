import * as React from "react";
import * as styles from "./LayerAccordionFiltersTemplate.module.css";
import clsx from "clsx";

interface LayerAccordionFiltersTemplateProps {
  items: {
    label: string;
    active: boolean;
    handleClick: React.Dispatch<React.SetStateAction<boolean>>;
    disabled?: boolean;
  }[];
}

export const LayerAccordionFiltersTemplate: React.FC<LayerAccordionFiltersTemplateProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map(({ label, active, handleClick, disabled }, idx) => (
        <span
          key={idx}
          onClick={() => !disabled && handleClick((o) => !o)}
          className={clsx(
            styles[label.toLowerCase()],
            active && !disabled && styles.active,
            styles.filter,
            disabled && styles.disabled,
          )}
        >
          {label}
        </span>
      ))}
    </div>
  );
};
