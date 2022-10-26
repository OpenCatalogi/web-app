import * as React from "react";
import * as styles from "./CategoriesCardsAccordionHeaderTemplate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Heading3 } from "@gemeente-denhaag/components-react";
import clsx from "clsx";
import { faChevronRight, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { BadgeCounter } from "@conduction/components";

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
  const badgeLabel = badgeNumber < 100 ? _.toString(badgeNumber) : "99+";
  const maxItems = badgeNumber > 100;
  return (
    <div className={clsx(styles.container, active && styles.active, !hasItems && styles.disabled)}>
      <div className={styles.content}>
        <FontAwesomeIcon className={styles.categoryIcon} icon={faGripVertical} />
        <span className={clsx(styles.badge, maxItems && styles.maxNumber)}>
          <BadgeCounter number={badgeLabel}>
            <Heading3 className={styles.title}>{t(title)}</Heading3>
          </BadgeCounter>
        </span>

        <FontAwesomeIcon className={clsx(styles.toggleIcon, active && styles.active)} icon={faChevronRight} />
      </div>

      <Divider />
    </div>
  );
};
