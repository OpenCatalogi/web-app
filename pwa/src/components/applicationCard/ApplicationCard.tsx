import * as React from "react";
import * as styles from "./ApplicationCard.module.css";
import { DataBadge, Icon, Link, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { IconArrowRight } from "@tabler/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { TOOLTIP_ID } from "../../layout/Layout";
import { CardHeader, CardHeaderTitle, CardWrapper } from "@conduction/components";
import { navigate } from "gatsby-link";

export interface ApplicationCardProps {
  title: {
    label: string;
    href: string;
  };
  description: string;
  tags: {
    organization?: string;
    githubLink?: string;
  };
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ title, description, tags }) => {
  const { t } = useTranslation();

  return (
    <CardWrapper className={styles.container} onClick={() => navigate(title.href)}>
      <CardHeader className={styles.cardHeader}>
        <CardHeaderTitle>
          <Link className={styles.titleLink} onClick={() => navigate(title.href)}>
            <Icon>
              <IconArrowRight />
            </Icon>
            {title.label}
          </Link>
        </CardHeaderTitle>
      </CardHeader>
      <Paragraph className={styles.description}>{description}</Paragraph>

      <div className={styles.tags}>
        {tags.organization && (
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Organisatie">
            <FontAwesomeIcon icon={faHouse} />
            {tags.organization}
          </DataBadge>
        )}
        {tags.githubLink && (
          <DataBadge
            data-tooltip-id={TOOLTIP_ID}
            data-tooltip-content="Demo"
            onClick={(e) => {
              e.stopPropagation();
              open(tags.githubLink);
            }}
          >
            <FontAwesomeIcon icon={faLaptopCode} />
            {t("Demo")}
          </DataBadge>
        )}
      </div>
    </CardWrapper>
  );
};
