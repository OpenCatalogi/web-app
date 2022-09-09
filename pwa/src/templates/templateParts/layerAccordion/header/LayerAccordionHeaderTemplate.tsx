import * as React from "react";
import * as styles from "./LayerAccordionHeaderTemplate.module.css";
import clsx from "clsx";
import { Divider, Heading3 } from "@gemeente-denhaag/components-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faLayerGroup, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { BadgeCounter } from "../../../../components/badgeCounter/BadgeCounter";
import _ from "lodash";
import { Tag } from "../../../../components/tag/Tag";

interface LayerAccordionHeaderTemplateProps {
  title: string;
  open: boolean;
  badgeNumber?: number;
}

export const LayerAccordionHeaderTemplate: React.FC<LayerAccordionHeaderTemplateProps> = ({
  open,
  title,
  badgeNumber,
}) => {
  const { t } = useTranslation();
  const badge = badgeNumber?.toString;

  return (
    <>
      {badge && (
        <div className={clsx(styles.container, open && styles.open, badgeNumber <= 0 && styles.disabled)}>
          <div className={styles.content}>
            <FontAwesomeIcon className={styles.layerIcon} icon={faLayerGroup} />
            {badgeNumber > 0 && (
              <>
                {/* <BadgeCounter number={badgeNumber} stylingClassName={styles[_.camelCase(`${title} badge`)]}> */}
                <Heading3 className={styles.title}>{t(title)}</Heading3>
                {/* </BadgeCounter> */}
                <Tag label={badgeNumber.toString()} icon={<FontAwesomeIcon icon={faRepeat} />} />
                <FontAwesomeIcon className={clsx(styles.toggleIcon, open && styles.open)} icon={faChevronRight} />
              </>
            )}
            {badgeNumber <= 0 && (
              <BadgeCounter number={badgeNumber} stylingClassName={styles.disabledBadge}>
                <Heading3 className={styles.title}>{t(title)}</Heading3>
              </BadgeCounter>
            )}
          </div>

          <Divider />
        </div>
      )}
      {!badge && (
        <div className={clsx(styles.container, open && styles.open)}>
          <div className={styles.content}>
            <FontAwesomeIcon className={styles.layerIcon} icon={faLayerGroup} />
            <Heading3>{title}</Heading3>

            <FontAwesomeIcon className={clsx(styles.toggleIcon, open && styles.open)} icon={faChevronRight} />
          </div>

          <Divider />
        </div>
      )}
    </>
  );
};
