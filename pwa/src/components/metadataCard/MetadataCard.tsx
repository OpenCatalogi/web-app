import * as React from "react";
import * as styles from "./MetadataCard.module.css";
import clsx from "clsx";
import { DataBadge, Icon, Link, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { IconArrowRight } from "@tabler/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderTree, faV } from "@fortawesome/free-solid-svg-icons";
import { TOOLTIP_ID } from "../../layout/Layout";
import { CardHeader, CardHeaderTitle, CardWrapper } from "@conduction/components";
import { useTranslation } from "react-i18next";

export interface MetadataCardProps {
  title: string;
  description: string;
  tags: {
    version?: string;
    properties?: string;
  };
  layoutClassName?: string;
}

export const MetadataCard: React.FC<MetadataCardProps> = ({ title, description, tags, layoutClassName }) => {
  const { t } = useTranslation();

  return (
    <CardWrapper className={clsx([styles.container, layoutClassName && layoutClassName])}>
      <CardHeader className={styles.cardHeader}>
        <CardHeaderTitle>
          <Link className={styles.titleLink}>
            <Icon>
              <IconArrowRight />
            </Icon>
            {title}
          </Link>
        </CardHeaderTitle>
      </CardHeader>
      <Paragraph className={styles.description}>{description}</Paragraph>

      <div className={styles.tags}>
        {tags.version && (
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("Version")}>
            <FontAwesomeIcon icon={faV} />
            {tags.version}
          </DataBadge>
        )}
        {tags.properties && (
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("Aantal properties")}>
            <FontAwesomeIcon icon={faFolderTree} />
            {tags.properties}
          </DataBadge>
        )}
      </div>
    </CardWrapper>
  );
};
