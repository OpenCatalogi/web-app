import * as React from "react";
import * as styles from "./LayerAccordionFiltersTemplate.module.css";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface LayerAccordionFiltersTemplateProps {
  items: {
    label: string;
    active: boolean;
    handleClick: React.Dispatch<React.SetStateAction<boolean>>;
    disabled?: boolean;
  }[];
}

export const LayerAccordionFiltersTemplate: React.FC<LayerAccordionFiltersTemplateProps> = ({ items }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {items.map(({ label, active, handleClick, disabled }, idx) => (
        <span
          key={idx}
          onClick={() => !disabled && handleClick((o) => !o)}
          className={clsx(
            styles[label.toLowerCase()],
            active && !disabled && styles.active,
            disabled && styles.disabled,
          )}
        >
          {t(label)}
        </span>
      ))}
    </div>
  );
};
