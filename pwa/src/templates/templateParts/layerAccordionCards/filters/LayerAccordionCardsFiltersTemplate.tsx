import clsx from "clsx";
import * as React from "react";
import * as styles from "./LayerAccordionCardsFiltersTemplate.module.css";

interface LayerAccordionCardsFiltersTemplateProps {
  items: {
    label: string;
    active: boolean;
    handleClick: React.Dispatch<React.SetStateAction<boolean>>;
    count: number;
  }[];
}

export const LayerAccordionCardsFiltersTemplate: React.FC<LayerAccordionCardsFiltersTemplateProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map(({ label, active, handleClick, count }, idx) => (
        <span
          key={idx}
          onClick={() => count > 0 && handleClick((o) => !o)}
          className={clsx(
            styles[label.toLowerCase()],
            active && count > 0 ? styles.active : styles.inactive,
            count <= 0 && styles.disabled,
          )}
        >
          {label}
        </span>
      ))}
    </div>
  );
};
