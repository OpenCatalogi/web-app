import * as React from "react";
import * as styles from "./CategoriesAccordionFiltersTemplate.module.css";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface CategoriesAccordionFiltersTemplateProps {
  items: {
    label: string;
    active: boolean;
    handleClick: React.Dispatch<React.SetStateAction<boolean>>;
    disabled?: boolean;
  }[];
}

export const CategoriesAccordionFiltersTemplate: React.FC<CategoriesAccordionFiltersTemplateProps> = ({ items }) => {
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
						styles.filter,
						disabled && styles.disabled,
					)}
				>
					{t(label)}
				</span>
			))}
		</div>
	);
};
