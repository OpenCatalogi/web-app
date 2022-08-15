import clsx from "clsx";
import * as React from "react";
import * as styles from "./LayerAccordionFiltersTemplate.module.css";

interface LayerAccordionFiltersTemplateProps {
  items: {
    label: string;
    active: boolean;
    handleClick: React.Dispatch<React.SetStateAction<boolean>>;
  }[];
}

export const LayerAccordionFiltersTemplate: React.FC<LayerAccordionFiltersTemplateProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map(({ label, active, handleClick }) => (
        <span
          onClick={() => handleClick((o) => !o)}
          className={clsx(styles[label.toLowerCase()], active && styles.active)}
        >
          {label}
        </span>
      ))}
    </div>
  );
};
