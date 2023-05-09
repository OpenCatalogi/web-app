import * as React from "react";
import * as styles from "./OrganizationCard.module.css";
import { Paragraph } from "@gemeente-denhaag/components-react";
import { Icon } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby";
import _ from "lodash";

import { Arrowright } from "../icons/rotterdam";
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
                <Arrowright />
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
          <Tag
            label={t(_.upperFirst(type ? type : "Unknown"))}
            onClick={() => navigate(title.href)}
            icon={<FontAwesomeIcon icon={faBuilding} />}
          />
        </ToolTip>

        <ToolTip tooltip="Aantal eigen componenten">
          <Tag
            label={components.owned}
            onClick={() => navigate(title.href)}
            icon={<FontAwesomeIcon icon={faHouseLaptop} />}
          />
        </ToolTip>

        <ToolTip tooltip="Aantal ondersteunde componenten">
          <Tag
            label={components.supported}
            onClick={() => navigate(title.href)}
            icon={<FontAwesomeIcon icon={faUserCog} />}
          />
        </ToolTip>

        <ToolTip tooltip="Aantal gebruikte componenten">
          <Tag
            label={components.used}
            onClick={() => navigate(title.href)}
            icon={<FontAwesomeIcon icon={faRepeat} />}
          />
        </ToolTip>

        {website && (
          <ToolTip tooltip={website}>
            <Tag label="Website" icon={<FontAwesomeIcon icon={faGlobe} />} onClick={() => open(website)} />
          </ToolTip>
        )}

        {gitHub && (
          <ToolTip tooltip="GitHub">
            <Tag label={t("GitHub")} icon={<GitHubLogo />} onClick={() => open(gitHub)} />
          </ToolTip>
        )}

        {gitLab && (
          <ToolTip tooltip="GitLab">
            <Tag label={t("GitLab")} icon={<GitLabLogo />} onClick={() => open(gitLab)} />
          </ToolTip>
        )}
      </div>
    </div>
  );
};
