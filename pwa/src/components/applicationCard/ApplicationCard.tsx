import * as React from "react";
import * as styles from "./ApplicationCard.module.css";
import { DataBadge, Icon, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { Link } from "../../components";
import { IconArrowRight } from "@tabler/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { TOOLTIP_ID } from "../../layout/Layout";

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
    <div className={styles.container}>
      <div className={styles.titleLink}>
        <Link to={title.href}>
          <Icon className="utrecht-icon--conduction-start">
            <IconArrowRight />
          </Icon>
          {title.label}
        </Link>
      </div>

      <Paragraph className={styles.description}>{description}</Paragraph>

      <div className={styles.tags}>
        {tags.organization && (
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Organisatie">
            <FontAwesomeIcon icon={faHouse} />
            {tags.organization}
          </DataBadge>
        )}
        {tags.githubLink && (
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Demo" onClick={() => open(tags.githubLink)}>
            <FontAwesomeIcon icon={faLaptopCode} />
            {t("Demo")}
          </DataBadge>
        )}
      </div>
    </div>
  );
};
