import * as React from "react";
import * as styles from "./ComponentCard.module.css";
import _ from "lodash";
import clsx from "clsx";
import { DataBadge, Icon, Link, Paragraph, StatusBadge } from "@utrecht/component-library-react/dist/css-module";
import { categories as _categories, TCategories } from "../../data/categories";
import { useTranslation } from "react-i18next";
import { IconArrowRight } from "@tabler/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat, faScroll } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { TOOLTIP_ID } from "../../layout/Layout";
import { CardHeader, CardHeaderTitle, CardWrapper } from "@conduction/components";
import { navigate } from "gatsby";
import { RatingIndicatorTemplate } from "../../templates/templateParts/ratingIndicator/RatingIndicatorTemplate";
import { getCommongroundRating } from "../../services/getCommongroundRating";
import { getStatusColor } from "../../services/getStatusColor";
import {
  CommongroundRatingBronze,
  CommongroundRatingGold,
  CommongroundRatingSilver,
} from "../../assets/svgs/CommongroundRatingImages";

export interface ComponentCardProps {
  title: {
    label: string;
    href: string;
  };
  description: string;
  layer?: TCategories;
  categories: string[];
  tags: {
    rating?: {
      rating: number;
      maxRating: number;
    };
    ratingCommonground?: {
      rating: number;
    };
    status?: string;
    installations: string;
    organization: {
      name: string;
      website?: string;
    };
    licence?: string;
    githubLink?: string;
  };
  layoutClassName?: string;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  layer,
  categories,
  description,
  tags,
  layoutClassName,
}) => {
  const { t } = useTranslation();

  const ratingFilter = window.sessionStorage.getItem("FILTER_RATING");

  const _layer: TCategories = t(_.upperFirst(layer));

  const __categories =
    layer &&
    categories?.length &&
    categories.map((category: any) => {
      const result = _categories[_layer]?.find((_category: any) => {
        return _category.value === category;
      });

      if (!result) {
        return {
          title: category,
        };
      } else {
        return result;
      }
    });

  const getCommongroundImage = (rating: number) => {
    switch (rating) {
      case 0:
        return <CommongroundRatingBronze />;
      case 1:
        return <CommongroundRatingBronze />;
      case 2:
        return <CommongroundRatingSilver />;
      case 3:
        return <CommongroundRatingGold />;
      default:
        return <CommongroundRatingBronze />;
    }
  };

  return (
    <CardWrapper
      className={clsx([styles.container, layoutClassName && layoutClassName])}
      onClick={() => navigate(title.href)}
    >
      <CardHeader>
        <CardHeaderTitle>
          <Link className={styles.title} onClick={() => navigate(title.href)}>
            <Icon>
              <IconArrowRight />
            </Icon>
            {title.label}
          </Link>
        </CardHeaderTitle>
      </CardHeader>

      <Paragraph className={styles.description}>{description}</Paragraph>
      <div className={styles.content}>
        <div className={styles.tagsContainer}>
          {layer && (
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
          )}
          <div className={styles.tags}>
            {tags.status && (
              <>
                <StatusBadge
                  data-tooltip-id={TOOLTIP_ID}
                  data-tooltip-content="Status"
                  status={getStatusColor(_.upperFirst(tags.status) ?? "Onbekend")}
                >
                  <span className={styles.icon}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span>
                  {t(_.upperFirst(tags.status ?? "Unknown"))}
                </StatusBadge>
              </>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      open(tags?.organization?.website);
                    }}
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
              <DataBadge
                data-tooltip-id={TOOLTIP_ID}
                data-tooltip-content="GitHub"
                onClick={(e) => {
                  e.stopPropagation();
                  open(tags.githubLink);
                }}
              >
                <GitHubLogo />
                {t("Repository")}
              </DataBadge>
            )}
          </div>
        </div>
        <div className={styles.ratingContainer}>
          <>
            {ratingFilter === "OpenCatalogi" && (
              <>
                {tags.rating && tags.rating?.rating && (
                  <RatingIndicatorTemplate
                    layoutClassName={styles.ratingIndicatorContainer}
                    maxRating={tags.rating?.maxRating}
                    rating={tags.rating?.rating}
                  />
                )}
              </>
            )}
            {ratingFilter === "Commonground" && (
              <>
                {tags.ratingCommonground && tags.ratingCommonground?.rating && (
                  <div
                    className={clsx(
                      styles[_.camelCase(t(`${getCommongroundRating(tags.ratingCommonground.rating ?? "0")} rating`))],
                      styles.commongroundRating,
                    )}
                  >
                    {getCommongroundImage(tags.ratingCommonground.rating ?? "0")}
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </CardWrapper>
  );
};
