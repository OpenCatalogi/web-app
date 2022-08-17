import * as React from "react";
import * as styles from "./ComponentCard.module.css";
import { Link, Paragraph } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { Tag, TagIconLink } from "../tag/Tag";
import _ from "lodash";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat, faScroll } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { ToolTip } from "../toolTip/ToolTip";
import { organisations } from "../../data/filters";
import { categories, TCategories } from "../../data/categories";

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
    status: string;
    installations: number;
    organisation: string;
    licence: string;
    githubLink?: string;
  };
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ title, layer, category, description, tags }) => {
  const organisation = _.sample(organisations)?.label;
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
        <div className={styles[_.camelCase(layer)]}>
          <ToolTip tooltip="Laag" direction="top">
            <Tag icon={<FontAwesomeIcon icon={faLayerGroup} />} tag={_.upperFirst(layer)}></Tag>
          </ToolTip>
        </div>
        <div className={styles[_.camelCase(`${layer} categorie`)]}>
          <ToolTip tooltip="Categorie" direction="top">
            <Tag icon={_category?.icon} tag={_.upperFirst(_category?.title)}></Tag>
          </ToolTip>
        </div>
      </div>

      <div className={styles.tags}>
        <ToolTip tooltip="Status" direction="top">
          <Tag icon={<FontAwesomeIcon icon={faInfoCircle} />} tag={_.upperFirst(tags.status)} />
        </ToolTip>
        <ToolTip tooltip="Aantal Installaties" direction="top">
          <Tag icon={<FontAwesomeIcon icon={faRepeat} />} tag={_.toString(_.random(0, 250))} />
        </ToolTip>
        <ToolTip tooltip="Organisatie" direction="top">
          <Tag icon={<FontAwesomeIcon icon={faHouse} />} tag={!organisation ? " " : organisation} />
        </ToolTip>
        <ToolTip tooltip="Licentie" direction="top">
          <Tag icon={<FontAwesomeIcon icon={faScroll} />} tag={tags.licence} />
        </ToolTip>
        <ToolTip tooltip="GitHub" direction="top">
          {tags.githubLink && <TagIconLink href={tags.githubLink} icon={<GitHubLogo />} />}
        </ToolTip>
      </div>
    </div>
  );
};
