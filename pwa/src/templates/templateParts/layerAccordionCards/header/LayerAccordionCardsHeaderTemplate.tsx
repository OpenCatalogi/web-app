import * as React from "react";
import * as styles from "./LayerAccordionCardsHeaderTemplate.module.css";
import clsx from "clsx";
import { Divider, Heading3 } from "@gemeente-denhaag/components-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { BadgeCounter } from "../../../../components/badgeCounter/BadgeCounter";
import _ from "lodash";
import { useTranslation } from "react-i18next";

interface LayerAccordionHeaderTemplateProps {
  title: string;
  open: boolean;
  count: number;
}

export const LayerAccordionCardsHeaderTemplate: React.FC<LayerAccordionHeaderTemplateProps> = ({
  open,
  title,
  count,
}) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(styles.container, open && styles.open, count <= 0 && styles.disabled)}>
      <div className={styles.content}>
        <FontAwesomeIcon className={styles.layerIcon} icon={faLayerGroup} />
        {count > 0 && (
          <>
            <BadgeCounter number={count} stylingClassName={styles[_.camelCase(`${title} badge`)]}>
              <Heading3 className={styles.title}>{t(title)}</Heading3>
            </BadgeCounter>
            <FontAwesomeIcon className={clsx(styles.toggleIcon, open && styles.open)} icon={faChevronRight} />
          </>
        )}
        {count <= 0 && (
          <BadgeCounter number={count} stylingClassName={styles.disabledBadge}>
            <Heading3 className={styles.title}>{t(title)}</Heading3>
          </BadgeCounter>
        )}
      </div>

      <Divider />
    </div>
  );
};
