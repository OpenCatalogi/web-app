import * as React from "react";
import * as styles from "./ComponentCard.module.css";
import { Link, Paragraph } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import _ from "lodash";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat, faScroll } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { ToolTip } from "../toolTip/ToolTip";
import { categories as _categories, TCategories } from "../../data/categories";
import { useTranslation } from "react-i18next";
import { Tag } from "@conduction/components";

export interface ComponentCardProps {
  title: {
    label: string;
    href: string;
  };
  description: string;
  layer: TCategories;
  categories: string[];
  tags: {
    status?: string;
    installations: string;
    organization: {
      name: string;
      website?: string;
    };
    licence?: string;
    githubLink?: string;
  };
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ title, layer, categories, description, tags }) => {
  const { t } = useTranslation();

  const _layer: TCategories = t(_.upperFirst(layer));

  const __categories =
    layer &&
    categories?.length &&
    categories.map((category: any) => {
      return _categories[_layer]?.find((_category: any) => {
        return _category.value === category;
      });
    });

  return (
    <div className={styles.container}>
      <div className={styles.titleLink} onClick={() => navigate(title.href)}>
        <Link icon={<ArrowRightIcon />} iconAlign="start">
          {title.label}
        </Link>
      </div>

      <Paragraph className={styles.description}>{description}</Paragraph>
      <div className={styles.layerTags}>
        <div className={styles[_.camelCase(t(_.upperFirst(`${layer ?? "unknown"} layer`)))]}>
          <ToolTip tooltip="Laag">
            <Tag label={t(_.upperFirst(layer ?? "unknown"))} icon={<FontAwesomeIcon icon={faLayerGroup} />} />
          </ToolTip>
        </div>

        <div className={styles[_.camelCase(`${layer ?? "unknown"} category`)]}>
          {!!__categories &&
            __categories.map(
              (category: any) =>
                category && (
                  <ToolTip tooltip="Categorie">
                    <Tag label={_.upperFirst(category?.title)} icon={category?.icon} />
                  </ToolTip>
                ),
            )}
        </div>
      </div>

      <div className={styles.tags}>
        {tags.status && (
          <ToolTip tooltip="Status">
            <Tag label={t(_.upperFirst(tags.status))} icon={<FontAwesomeIcon icon={faInfoCircle} />} />
          </ToolTip>
        )}
        <ToolTip tooltip="Aantal installaties">
          <Tag label={tags.installations} icon={<FontAwesomeIcon icon={faRepeat} />} />
        </ToolTip>

        {tags.organization?.name && (
          <ToolTip tooltip="Organisatie">
            {!tags.organization.website && (
              <Tag label={tags.organization.name} icon={<FontAwesomeIcon icon={faHouse} />} />
            )}
            {tags.organization.website && (
              <Tag
                label={tags.organization.name}
                icon={<FontAwesomeIcon icon={faHouse} />}
                onClick={() => open(tags?.organization?.website)}
              />
            )}
          </ToolTip>
        )}
        {tags.licence && (
          <ToolTip tooltip="Licentie">
            <Tag label={tags.licence} icon={<FontAwesomeIcon icon={faScroll} />} />
          </ToolTip>
        )}
        {tags.githubLink && (
          <ToolTip tooltip="GitHub">
            <Tag label={t("Repository")} icon={<GitHubLogo />} onClick={() => open(tags.githubLink)} />
          </ToolTip>
        )}
      </div>
    </div>
  );
};
