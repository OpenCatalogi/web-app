import * as React from "react";
import * as styles from "./CategoriesCardsAccordionHeaderTemplate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from "@gemeente-denhaag/components-react";
import { Heading } from "@utrecht/component-library-react/dist/css-module";
import clsx from "clsx";
import { faChevronRight, faTags } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

interface CategoriesCardsAccordionHeaderTemplateProps {
  title: string;
  active: boolean;
  badgeNumber: number;
}

export const CategoriesCardsAccordionHeaderTemplate: React.FC<CategoriesCardsAccordionHeaderTemplateProps> = ({
  title,
  active,
  badgeNumber,
}) => {
  const { t } = useTranslation();
  const hasItems = badgeNumber > 0;
  const maxItems = badgeNumber > 100;
  return (
    <div className={clsx(styles.container, active && styles.active, !hasItems && styles.disabled)}>
      <div className={styles.content}>
        <FontAwesomeIcon className={styles.categoryIcon} icon={faTags} />
        <span className={clsx(styles.badge, maxItems && styles.maxNumber)}>
          <div className={styles.categoriesCardsTitle}>
            <Heading level={3} className={styles.title}>
              {t(title)}
            </Heading>
          </div>
        </span>
        <FontAwesomeIcon className={clsx(styles.toggleIcon, active && styles.active)} icon={faChevronRight} />
      </div>
      <Divider />
    </div>
  );
};
