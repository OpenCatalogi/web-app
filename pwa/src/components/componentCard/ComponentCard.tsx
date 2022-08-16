import * as React from "react";
import * as styles from "./ComponentCard.module.css";
import { Link, Paragraph } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { Tag, TagIconLinkProps } from "../tag/Tag";
import _ from "lodash";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat, faScroll } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";

export interface ComponentCardProps {
  title: {
    label: string;
    href: string;
  };
  description: string;
  layer: string;
  category: {
    label: string;
    icon: JSX.Element;
  };
  tags: {
    status: string;
    installations: string;
    organisation: string;
    licence: string;
    githubLink?: string;
  };
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ title, layer, category, description, tags }) => {
  return (
    <div className={styles.container}>
      <div className={styles.link} onClick={() => navigate(title.href)}>
        <Link icon={<ArrowRightIcon />} iconAlign="start">
          {title.label}
        </Link>
      </div>

      <Paragraph>{description}</Paragraph>

      <div className={styles.layerTags}>
        <div className={styles[_.camelCase(layer)]}>
          <Tag icon={<FontAwesomeIcon icon={faLayerGroup} />} tag={_.upperFirst(layer)}></Tag>
        </div>
        <div className={styles[_.camelCase(`${layer} categorie`)]}>
          <Tag icon={category.icon} tag={_.upperFirst(category.label)}></Tag>
        </div>
      </div>

      <div className={styles.tags}>
        <Tag icon={<FontAwesomeIcon icon={faInfoCircle} />} tag={_.upperFirst(tags.status)} />
        <Tag icon={<FontAwesomeIcon icon={faRepeat} />} tag={tags.installations} />
        <Tag icon={<FontAwesomeIcon icon={faHouse} />} tag={tags.organisation} />
        <Tag icon={<FontAwesomeIcon icon={faScroll} />} tag={tags.licence} />
        {tags.githubLink && <TagIconLinkProps href={tags.githubLink} icon={<GitHubLogo />} />}
      </div>
    </div>
  );
};
