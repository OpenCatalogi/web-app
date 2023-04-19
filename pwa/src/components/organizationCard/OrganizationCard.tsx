import * as React from "react";
import * as styles from "./OrganizationCard.module.css";
import { Paragraph } from "@gemeente-denhaag/components-react";
import { DataBadge, Icon } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby";
import _ from "lodash";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faGlobe, faHouseLaptop, faRepeat, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { GitLabLogo } from "../../assets/svgs/GitLab";
import { ToolTip } from "../toolTip/ToolTip";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Tag } from "@conduction/components";
import { Link } from "../../components";

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
                <ArrowRightIcon />
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
          <DataBadge onClick={() => navigate(title.href)}>{t(_.upperFirst(type ? type : "Unknown"))}</DataBadge>
        </ToolTip>

        <ToolTip tooltip="Aantal eigen componenten">
          <DataBadge onClick={() => navigate(title.href)}>{components.owned}</DataBadge>
        </ToolTip>

        <ToolTip tooltip="Aantal ondersteunde componenten">
          <DataBadge onClick={() => navigate(title.href)}>{components.supported}</DataBadge>
        </ToolTip>

        <ToolTip tooltip="Aantal gebruikte componenten">
          <DataBadge onClick={() => navigate(title.href)}>{components.used}</DataBadge>
        </ToolTip>

        {website && (
          <ToolTip tooltip={website}>
            <DataBadge onClick={() => open(website)}>{"Website"}</DataBadge>
          </ToolTip>
        )}

        {gitHub && (
          <ToolTip tooltip="GitHub">
            <DataBadge onClick={() => open(gitHub)}>{t("GitHub")}</DataBadge>
          </ToolTip>
        )}

        {gitLab && (
          <ToolTip tooltip="GitLab">
            <DataBadge onClick={() => open(gitLab)}>{t("GitLab")}</DataBadge>
          </ToolTip>
        )}
      </div>
    </div>
  );
};
