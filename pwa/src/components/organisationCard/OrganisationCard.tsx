import * as React from "react";
import * as styles from "./OrganisationCard.module.css";
import { Link, Paragraph } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { Tag } from "../tag/Tag";
import _ from "lodash";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faHouse, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { GitLabLogo } from "../../assets/svgs/GitLab";
import { ToolTip } from "../toolTip/ToolTip";
import { useTranslation } from "react-i18next";
import grey from "../../assets/images/grey.png";

export interface OrganisationCardProps {
  title: {
    label: string;
    href: string;
  };
  description?: string;
  website?: string;
  logo?: string;
  type?: string;
  components: {
    owned?: number;
    supported?: number;
    used?: number;
  };
  github?: string;
  gitlab?: string;
}

export const OrganisationCard: React.FC<OrganisationCardProps> = ({
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
      <div className={styles.content}>
        <div className={styles.titleLink} onClick={() => navigate(title.href)}>
          <Link icon={<ArrowRightIcon />} iconAlign="start">
            {title.label}
          </Link>
        </div>

        <Paragraph className={styles.description}>{description}</Paragraph>

        <div className={styles.tags}>
          {type && (
            <ToolTip tooltip="Bedrijstype">
              <Tag label={t(_.upperFirst(type))} icon={<FontAwesomeIcon icon={faHouse} />} />
            </ToolTip>
          )}
          {!type && (
            <ToolTip tooltip="Bedrijstype">
              <Tag label={_.upperFirst("Onbekend")} icon={<FontAwesomeIcon icon={faHouse} />} />
            </ToolTip>
          )}
          {website && (
            <ToolTip tooltip={website}>
              <Tag label={"Website"} icon={<FontAwesomeIcon icon={faGlobe} />} onClick={() => open(website)} />
            </ToolTip>
          )}
        </div>

        <div className={styles.tags}>
          {components.owned && (
            <ToolTip tooltip="Aantal eigen componenten">
              <Tag label={_.toString(components.owned)} icon={<FontAwesomeIcon icon={faRepeat} />} />
            </ToolTip>
          )}
          {!components.owned && (
            <ToolTip tooltip="Aantal eigen componenten">
              <Tag label={"0"} icon={<FontAwesomeIcon icon={faRepeat} />} />
            </ToolTip>
          )}
          {components.supported && (
            <ToolTip tooltip="Aantal ondersteunde componenten">
              <Tag label={_.toString(components.supported)} icon={<FontAwesomeIcon icon={faRepeat} />} />
            </ToolTip>
          )}
          {!components.supported && (
            <ToolTip tooltip="Aantal ondersteunde componenten">
              <Tag label={"0"} icon={<FontAwesomeIcon icon={faRepeat} />} />
            </ToolTip>
          )}
          {components.used && (
            <ToolTip tooltip="Aantal gebruikte componenten">
              <Tag label={_.toString(components.used)} icon={<FontAwesomeIcon icon={faRepeat} />} />
            </ToolTip>
          )}
          {!components.used && (
            <ToolTip tooltip="Aantal gebruikte componenten">
              <Tag label={"0"} icon={<FontAwesomeIcon icon={faRepeat} />} />
            </ToolTip>
          )}
          <div className={styles.tags}>
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
      </div>
      {logo && (
        <div className={styles.logoContent}>
          <img className={styles.logo} onClick={() => navigate(title.href)} src={logo} />
        </div>
      )}
      {!logo && (
        <div className={styles.logoContent}>
          <img className={styles.logo} src={grey} />
        </div>
      )}
    </div>
  );
};
