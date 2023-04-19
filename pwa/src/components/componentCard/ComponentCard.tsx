import * as React from "react";
import * as styles from "./ComponentCard.module.css";
import { Paragraph } from "@gemeente-denhaag/components-react";
import { DataBadge, Icon } from "@utrecht/component-library-react/dist/css-module";
import _ from "lodash";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat, faScroll } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { ToolTip } from "../toolTip/ToolTip";
import { categories as _categories, TCategories } from "../../data/categories";
import { useTranslation } from "react-i18next";
import { Tag } from "@conduction/components";
import { Link } from "../../components";

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
      <div className={styles.titleLink}>
        <Link to={title.href}>
          <Icon className="utrecht-icon--conduction-start">
            <ArrowRightIcon />
          </Icon>
          {title.label}
        </Link>
      </div>

      <Paragraph className={styles.description}>{description}</Paragraph>
      <div className={styles.layerTags}>
        <div className={styles[_.camelCase(t(_.upperFirst(`${layer ?? "unknown"} layer`)))]}>
          <ToolTip tooltip="Laag">
            <DataBadge>{t(_.upperFirst(layer ?? "unknown"))}</DataBadge>
          </ToolTip>
        </div>

        <div className={styles[_.camelCase(`${layer ?? "unknown"} category`)]}>
          {!!__categories &&
            __categories.map(
              (category: any) =>
                category && (
                  <ToolTip tooltip="Categorie">
                    <DataBadge>{_.upperFirst(category?.title)}</DataBadge>
                  </ToolTip>
                ),
            )}
        </div>
      </div>

      <div className={styles.tags}>
        {tags.status && (
          <ToolTip tooltip="Status">
            <DataBadge>{t(_.upperFirst(tags.status))}</DataBadge>
          </ToolTip>
        )}
        <ToolTip tooltip="Aantal installaties">
          <DataBadge>{tags.installations}</DataBadge>
        </ToolTip>

        {tags.organization?.name && (
          <ToolTip tooltip="Organisatie">
            {!tags.organization.website && <DataBadge>{tags.organization.name} </DataBadge>}
            {tags.organization.website && (
              <DataBadge onClick={() => open(tags?.organization?.website)}>{tags.organization.name}</DataBadge>
            )}
          </ToolTip>
        )}
        {tags.licence && (
          <ToolTip tooltip="Licentie">
            <DataBadge>{tags.licence}</DataBadge>
          </ToolTip>
        )}
        {tags.githubLink && (
          <ToolTip tooltip="GitHub">
            <DataBadge onClick={() => open(tags.githubLink)}>{t("Repository")}</DataBadge>
          </ToolTip>
        )}
      </div>
    </div>
  );
};
