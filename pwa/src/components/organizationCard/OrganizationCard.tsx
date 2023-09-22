import * as React from "react";
import * as styles from "./OrganizationCard.module.css";
import { DataBadge, Icon, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby";
import _ from "lodash";
import { IconArrowRight } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Link } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faGlobe, faHouseLaptop, faRepeat, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { GitLabLogo } from "../../assets/svgs/GitLab";
import { TOOLTIP_ID } from "../../layout/Layout";
import { CardHeader, CardHeaderTitle, CardWrapper } from "@conduction/components";

export interface OrganizationCardProps {
  title: {
    label: string;
    href: string;
  };
  description?: string;
  website?: string;
  logo?: string;
  type?: string;
  components: {
    owned: string;
    supported: string;
    used: string;
  };
  gitHub?: string;
  gitLab?: string;
  layoutClassName?: string;
}

export const OrganizationCard: React.FC<OrganizationCardProps> = ({
  title,
  description,
  website,
  logo,
  type,
  components,
  gitHub,
  gitLab,
  layoutClassName,
}) => {
  const { t } = useTranslation();

  return (
    <CardWrapper className={clsx([styles.container, layoutClassName && layoutClassName])}>
      <CardHeader className={styles.header}>
        <div className={styles.headerContent}>
          <CardHeaderTitle>
            <div className={styles.titleLink}>
              <Link to={title.href}>
                <Icon className="utrecht-icon--conduction-start">
                  <IconArrowRight />
                </Icon>
                {title.label}
              </Link>
            </div>
          </CardHeaderTitle>

          <Paragraph className={styles.description}>{description}</Paragraph>
        </div>

        {logo && (
          <div className={styles.logoContainer}>
            <img className={styles.logo} onClick={() => navigate(title.href)} src={logo} />
          </div>
        )}
      </CardHeader>

      <div className={styles.tagsContainer}>
        <DataBadge
          data-tooltip-id={TOOLTIP_ID}
          data-tooltip-content="Organisatie type"
          onClick={() => navigate(title.href)}
        >
          <FontAwesomeIcon icon={faBuilding} />

          {t(_.upperFirst(type ? type : "Unknown"))}
        </DataBadge>

        <DataBadge
          data-tooltip-id={TOOLTIP_ID}
          data-tooltip-content="Aantal eigen componenten"
          onClick={() => navigate(title.href)}
        >
          <FontAwesomeIcon icon={faHouseLaptop} />
          {components.owned}
        </DataBadge>

        <DataBadge
          data-tooltip-id={TOOLTIP_ID}
          data-tooltip-content="Aantal ondersteunde componenten"
          onClick={() => navigate(title.href)}
        >
          <FontAwesomeIcon icon={faUserCog} />
          {components.supported}
        </DataBadge>

        <DataBadge
          data-tooltip-id={TOOLTIP_ID}
          data-tooltip-content="Aantal gebruikte componenten"
          onClick={() => navigate(title.href)}
        >
          <FontAwesomeIcon icon={faRepeat} />
          {components.used}
        </DataBadge>

        {website && (
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content={website} onClick={() => open(website)}>
            <FontAwesomeIcon icon={faGlobe} />
            Website
          </DataBadge>
        )}

        {gitHub && (
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="GitHub" onClick={() => open(gitHub)}>
            <GitHubLogo />
            {t("GitHub")}
          </DataBadge>
        )}

        {gitLab && (
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="GitLab" onClick={() => open(gitLab)}>
            <GitLabLogo />
            {t("GitLab")}
          </DataBadge>
        )}
      </div>
    </CardWrapper>
  );
};
