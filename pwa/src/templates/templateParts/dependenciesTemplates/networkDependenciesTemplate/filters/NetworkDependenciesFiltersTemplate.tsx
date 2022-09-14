import * as React from "react";
import * as styles from "./NetworkDependenciesFiltersTemplate.module.css";
import clsx from "clsx";

interface NetworkDependenciesFiltersTemplateProps {
  items: {
    label: string;
    active: boolean;
    handleClick: React.Dispatch<React.SetStateAction<boolean>>;
    disabled: number;
  }[];
}

export const NetworkDependenciesFiltersTemplate: React.FC<NetworkDependenciesFiltersTemplateProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map(({ label, active, handleClick, disabled }, idx) => (
        <>
          <span
            key={idx}
            onClick={() => disabled > 0 && handleClick((o) => !o)}
            className={clsx(
              styles[label.toLowerCase()],
              active && disabled > 0 && styles.active,
              styles.filter,
              disabled <= 0 && styles.disabled,
            )}
          >
            {label}
          </span>
        </>
      ))}
    </div>
  );
};
