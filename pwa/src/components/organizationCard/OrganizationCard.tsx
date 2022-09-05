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
import { ToolTip } from "../toolTip/ToolTip";
import { useTranslation } from "react-i18next";

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
  github?: string;
  gitlab?: string;
}

export const OrganizationCard: React.FC<OrganizationCardProps> = ({
  title,
  description,
  website,
  logo,
  type,
  components,
  github,
  gitlab,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
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
        {type && (
          <ToolTip tooltip="Bedrijstype">
            <Tag
              label={t(_.upperFirst(type))}
              onClick={() => navigate(title.href)}
              icon={<FontAwesomeIcon icon={faBuilding} />}
            />
          </ToolTip>
        )}
        {!type && (
          <ToolTip tooltip="Bedrijstype">
            <Tag
              label={_.upperFirst("Onbekend")}
              onClick={() => navigate(title.href)}
              icon={<FontAwesomeIcon icon={faBuilding} />}
            />
          </ToolTip>
        )}

        {website && (
          <ToolTip tooltip={website}>
            <Tag label={"Website"} icon={<FontAwesomeIcon icon={faGlobe} />} onClick={() => open(website)} />
          </ToolTip>
        )}

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
        {github && (
          <ToolTip tooltip="GitHub">
            <Tag label={t("GitHub")} icon={<GitHubLogo />} onClick={() => open(github)} />
          </ToolTip>
        )}
        {gitlab && (
          <ToolTip tooltip="GitLab">
            <Tag label={t("GitLab")} icon={<GitLabLogo />} onClick={() => open(gitlab)} />
          </ToolTip>
        )}
      </div>
    </div>
  );
};
