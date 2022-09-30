import * as React from "react";
import * as styles from "./OrganizationCard.module.css";
import { Link, Paragraph } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { Tag } from "../tag/Tag";
import _ from "lodash";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faGlobe, faHouseLaptop, faRepeat, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { GitLabLogo } from "../../assets/svgs/GitLab";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

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
          <div className={styles.titleLink} onClick={() => navigate(title.href)}>
            <Link icon={<ArrowRightIcon />} iconAlign="start">
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
        <div className={styles.tooltipWrapper} data-tip="Organisatie type">
          <Tag
            label={t(_.upperFirst(type ? type : "Unknown"))}
            onClick={() => navigate(title.href)}
            icon={<FontAwesomeIcon icon={faBuilding} />}
          />
        </div>

        <div className={styles.tooltipWrapper} data-tip="Aantal eigen componenten">
          <Tag
            label={components.owned}
            onClick={() => navigate(title.href)}
            icon={<FontAwesomeIcon icon={faHouseLaptop} />}
          />
        </div>

        <div className={styles.tooltipWrapper} data-tip="Aantal ondersteunde componenten">
          <Tag
            label={components.supported}
            onClick={() => navigate(title.href)}
            icon={<FontAwesomeIcon icon={faUserCog} />}
          />
        </div>

        <div className={styles.tooltipWrapper} data-tip="Aantal gebruikte componenten">
          <Tag
            label={components.used}
            onClick={() => navigate(title.href)}
            icon={<FontAwesomeIcon icon={faRepeat} />}
          />
        </div>

        {website && (
          <div className={styles.tooltipWrapper} data-tip={website}>
            <Tag label="Website" icon={<FontAwesomeIcon icon={faGlobe} />} onClick={() => open(website)} />
          </div>
        )}

        {gitHub && (
          <div className={styles.tooltipWrapper} data-tip="GitHub">
            <Tag label={t("GitHub")} icon={<GitHubLogo />} onClick={() => open(gitHub)} />
          </div>
        )}

        {gitLab && (
          <div className={styles.tooltipWrapper} data-tip="GitLab">
            <Tag label={t("GitLab")} icon={<GitLabLogo />} onClick={() => open(gitLab)} />
          </div>
        )}
      </div>
    </div>
  );
};
