import * as React from "react";
import * as styles from "./ComponentCard.module.css";
import { Link, Paragraph } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { Tag } from "../tag/Tag";
import _ from "lodash";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat, faScroll } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { ToolTip } from "../toolTip/ToolTip";
import { organisations } from "../../data/filters";
import { categories, TCategories } from "../../data/categories";
import { useTranslation } from "react-i18next";

export interface ComponentCardProps {
  title: {
    label: string;
    href: string;
  };
  description: string;
  layer: TCategories;
  category: {
    label: string;
    icon: JSX.Element;
  };
  tags: {
    status?: string;
    installations?: number;
    organisation?: string;
    licence?: string;
    githubLink?: string;
  };
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ title, layer, category, description, tags }) => {
  const { t } = useTranslation();

  const organisation = _.sample(organisations)?.label ?? "";
  const _category = _.sample(categories[layer]);

  return (
    <div className={styles.container}>
      <div className={styles.titleLink} onClick={() => navigate(title.href)}>
        <Link icon={<ArrowRightIcon />} iconAlign="start">
          {title.label}
        </Link>
      </div>

      <Paragraph className={styles.description}>{description}</Paragraph>
      <div className={styles.layerTags}>
        <div className={styles[_.camelCase(t(`${layer}`))]}>
          <ToolTip tooltip="Laag">
            <Tag content={{ icon: <FontAwesomeIcon icon={faLayerGroup} />, tag: _.upperFirst(t(`${layer}`)) }} />
          </ToolTip>
        </div>
        <div className={styles[_.camelCase(`${layer} category`)]}>
          {_category && (
            <ToolTip tooltip="Categorie">
              <Tag content={{ icon: _category?.icon, tag: _.upperFirst(_category?.title) }} />
            </ToolTip>
          )}
        </div>
      </div>

      <div className={styles.tags}>
        {tags.status && (
          <ToolTip tooltip="Status">
            <Tag content={{ icon: <FontAwesomeIcon icon={faInfoCircle} />, tag: _.upperFirst(tags.status) }} />
          </ToolTip>
        )}
        {tags.installations && (
          <ToolTip tooltip="Aantal Installaties">
            <Tag content={{ icon: <FontAwesomeIcon icon={faRepeat} />, tag: _.toString(tags.installations) }} />
          </ToolTip>
        )}
        {!tags.installations && (
          <ToolTip tooltip="Aantal Installaties">
            <Tag content={{ icon: <FontAwesomeIcon icon={faRepeat} />, tag: "0" }} />
          </ToolTip>
        )}
        {tags.organisation && (
          <ToolTip tooltip="Organisatie">
            <Tag content={{ icon: <FontAwesomeIcon icon={faHouse} />, tag: tags.organisation }} />
          </ToolTip>
        )}
        {tags.licence && (
          <ToolTip tooltip="Licentie">
            <Tag content={{ icon: <FontAwesomeIcon icon={faScroll} />, tag: tags.licence }} />
          </ToolTip>
        )}
        {tags.githubLink && (
          <ToolTip tooltip="GitHub">
            <Tag content={{ icon: <GitHubLogo />, tag: "Repository" }} onClick={() => open(tags.githubLink)} />
          </ToolTip>
        )}
      </div>
    </div>
  );
};
