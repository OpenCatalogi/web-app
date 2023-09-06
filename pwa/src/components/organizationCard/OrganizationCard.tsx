import * as React from "react";
import * as styles from "./OrganizationCard.module.css";
import { DataBadge, Icon, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby";
import _ from "lodash";
import { IconArrowRight } from "@tabler/icons-react";
import { ToolTip } from "../toolTip/ToolTip";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Link } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faGlobe, faHouseLaptop, faRepeat, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { GitLabLogo } from "../../assets/svgs/GitLab";

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
    <div className={clsx(styles.container, [layoutClassName && layoutClassName])}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleLink}>
            <Link to={title.href}>
              <Icon className="utrecht-icon--conduction-start">
                <IconArrowRight />
              </Icon>
              {title.label}
            </Link>
          </div>

          <Paragraph className={styles.description}>{description}</Paragraph>
        </div>

        {logo && (
          <div className={styles.logoContainer}>
            <img className={styles.logo} onClick={() => navigate(title.href)} src={logo} />
          </div>
        )}
      </div>

      <div className={styles.tagsContainer}>
        <ToolTip tooltip="Organisatie type">
          <DataBadge onClick={() => navigate(title.href)}>
            <FontAwesomeIcon icon={faBuilding} />

            {t(_.upperFirst(type ? type : "Unknown"))}
          </DataBadge>
        </ToolTip>

        <ToolTip tooltip="Aantal eigen componenten">
          <DataBadge onClick={() => navigate(title.href)}>
            <FontAwesomeIcon icon={faHouseLaptop} />
            {components.owned}
          </DataBadge>
        </ToolTip>

        <ToolTip tooltip="Aantal ondersteunde componenten">
          <DataBadge onClick={() => navigate(title.href)}>
            <FontAwesomeIcon icon={faUserCog} />
            {components.supported}
          </DataBadge>
        </ToolTip>

        <ToolTip tooltip="Aantal gebruikte componenten">
          <DataBadge onClick={() => navigate(title.href)}>
            <FontAwesomeIcon icon={faRepeat} />
            {components.used}
          </DataBadge>
        </ToolTip>

        {website && (
          <ToolTip tooltip={website}>
            <DataBadge onClick={() => open(website)}>
              <FontAwesomeIcon icon={faGlobe} />
              Website
            </DataBadge>
          </ToolTip>
        )}

        {gitHub && (
          <ToolTip tooltip="GitHub">
            <DataBadge onClick={() => open(gitHub)}>
              <GitHubLogo />
              {t("GitHub")}
            </DataBadge>
          </ToolTip>
        )}

        {gitLab && (
          <ToolTip tooltip="GitLab">
            <DataBadge onClick={() => open(gitLab)}>
              <GitLabLogo />
              {t("GitLab")}
            </DataBadge>
          </ToolTip>
        )}
      </div>
    </div>
  );
};
