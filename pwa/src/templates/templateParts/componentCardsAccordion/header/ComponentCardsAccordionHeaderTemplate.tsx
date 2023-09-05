import * as React from "react";
import * as styles from "./ComponentCardsAccordionHeaderTemplate.module.css";
import { faChevronRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { BadgeCounter } from "@conduction/components";
import { Heading, Separator } from "@utrecht/component-library-react/dist/css-module";

interface ComponentCardsAccordionHeaderTemplateProps {
  title: string;
  active: boolean;
  badgeNumber: number;
}

export const ComponentCardsAccordionHeaderTemplate: React.FC<ComponentCardsAccordionHeaderTemplateProps> = ({
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
        <FontAwesomeIcon className={styles.layerIcon} icon={faLayerGroup} />
        <span className={clsx(styles[_.camelCase(`${title} badge`)], styles.badge, maxItems && styles.maxNumber)}>
          <BadgeCounter number={badgeLabel}>
            <Heading level={3} className={styles.title}>
              {t(title)}
            </Heading>
          </BadgeCounter>
        </span>
        <FontAwesomeIcon className={clsx(styles.toggleIcon, active && styles.active)} icon={faChevronRight} />
      </div>

      <Separator />
    </div>
  );
};
