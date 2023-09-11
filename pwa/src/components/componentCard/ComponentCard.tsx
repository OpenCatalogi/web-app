import * as React from "react";
import * as styles from "./ComponentCard.module.css";
import { DataBadge, Icon, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import _ from "lodash";
import { categories as _categories, TCategories } from "../../data/categories";
import { useTranslation } from "react-i18next";
import { Link } from "../../components";
import { IconArrowRight } from "@tabler/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat, faScroll } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { TOOLTIP_ID } from "../../layout/Layout";

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
            <IconArrowRight />
          </Icon>
          {title.label}
        </Link>
      </div>

      <Paragraph className={styles.description}>{description}</Paragraph>
      <div className={styles.layerTags}>
        <div className={styles[_.camelCase(t(_.upperFirst(`${layer ?? "unknown"} layer`)))]}>
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Laag">
            <FontAwesomeIcon icon={faLayerGroup} />
            {t(_.upperFirst(layer ?? "unknown"))}
          </DataBadge>
        </div>

        <div className={styles[_.camelCase(`${layer ?? "unknown"} category`)]}>
          {!!__categories &&
            __categories.map(
              (category: any, idx: number) =>
                category && (
                  <DataBadge key={idx} data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Categorie">
                    {category?.icon}
                    {_.upperFirst(category?.title)}
                  </DataBadge>
                ),
            )}
        </div>
      </div>

      <div className={styles.tags}>
        {tags.status && (
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Status">
            <FontAwesomeIcon icon={faInfoCircle} />
            {t(_.upperFirst(tags.status))}
          </DataBadge>
        )}

        <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Aantal installaties">
          <FontAwesomeIcon icon={faRepeat} />
          {tags.installations}
        </DataBadge>

        {tags.organization?.name && (
          <>
            {!tags.organization.website && (
              <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Organisatie">
                <FontAwesomeIcon icon={faHouse} />
                {tags.organization.name}
              </DataBadge>
            )}

            {tags.organization.website && (
              <DataBadge
                data-tooltip-id={TOOLTIP_ID}
                data-tooltip-content="Organisatie"
                onClick={() => open(tags?.organization?.website)}
              >
                <FontAwesomeIcon icon={faHouse} />
                {tags.organization.name}
              </DataBadge>
            )}
          </>
        )}
        {tags.licence && (
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Licentie">
            <FontAwesomeIcon icon={faScroll} />
            {tags.licence}
          </DataBadge>
        )}
        {tags.githubLink && (
          <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="GitHub" onClick={() => open(tags.githubLink)}>
            <GitHubLogo />
            {t("Repository")}
          </DataBadge>
        )}
      </div>
    </div>
  );
};
