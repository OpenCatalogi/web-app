import * as React from "react";
import * as styles from "./ComponentCardsAccordionHeaderTemplate.module.css";
import { faChevronRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Heading3 } from "@gemeente-denhaag/components-react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { BadgeCounter } from "../../../../components/badgeCounter/BadgeCounter";
import _ from "lodash";

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

  return (
    <div className={clsx(styles.container, active && styles.active, !hasItems && styles.disabled)}>
      <div className={styles.content}>
        <FontAwesomeIcon className={styles.layerIcon} icon={faLayerGroup} />
        <span className={clsx(styles[_.camelCase(`${title} badge`)], styles.badge)}>
          <BadgeCounter number={badgeNumber < 100 ? badgeNumber : "99+"}>
            <Heading3 className={styles.title}>{t(title)}</Heading3>
          </BadgeCounter>
        </span>
        <FontAwesomeIcon className={clsx(styles.toggleIcon, active && styles.active)} icon={faChevronRight} />
      </div>

      <Divider />
    </div>
  );
};
