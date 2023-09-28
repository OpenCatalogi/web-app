import * as React from "react";
import * as styles from "./OrganizationCard.module.css";
import { DataBadge, Icon, Link, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby";
import _ from "lodash";
import { IconArrowRight } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
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
    <CardWrapper
      className={clsx([styles.container, layoutClassName && layoutClassName])}
      onClick={() => navigate(title.href)}
    >
      <CardHeader className={styles.header}>
        <div className={styles.headerContent}>
          <CardHeaderTitle>
            <Link className={styles.titleLink} onClick={() => navigate(title.href)}>
              <Icon>
                <IconArrowRight />
              </Icon>
              {title.label}
            </Link>
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
        <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Organisatie type">
          <FontAwesomeIcon icon={faBuilding} />

          {t(_.upperFirst(type ? type : "Unknown"))}
        </DataBadge>

        <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Aantal eigen componenten">
          <FontAwesomeIcon icon={faHouseLaptop} />
          {components.owned}
        </DataBadge>

        <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Aantal ondersteunde componenten">
          <FontAwesomeIcon icon={faUserCog} />
          {components.supported}
        </DataBadge>

        <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Aantal gebruikte componenten">
          <FontAwesomeIcon icon={faRepeat} />
          {components.used}
        </DataBadge>

        {website && (
          <DataBadge
            data-tooltip-id={TOOLTIP_ID}
            data-tooltip-content={website}
            onClick={(e) => {
              e.stopPropagation();
              open(website);
            }}
          >
            <FontAwesomeIcon icon={faGlobe} />
            Website
          </DataBadge>
        )}

        {gitHub && (
          <DataBadge
            data-tooltip-id={TOOLTIP_ID}
            data-tooltip-content="GitHub"
            onClick={(e) => {
              e.stopPropagation();
              open(gitHub);
            }}
          >
            <GitHubLogo />
            {t("GitHub")}
          </DataBadge>
        )}

        {gitLab && (
          <DataBadge
            data-tooltip-id={TOOLTIP_ID}
            data-tooltip-content="GitLab"
            onClick={(e) => {
              e.stopPropagation();
              open(gitLab);
            }}
          >
            <GitLabLogo />
            {t("GitLab")}
          </DataBadge>
        )}
      </div>
    </CardWrapper>
  );
};
