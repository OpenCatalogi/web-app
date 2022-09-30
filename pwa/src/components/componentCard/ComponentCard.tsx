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
    installations: string;
    organization?: string;
    licence?: string;
    githubLink?: string;
  };
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ title, layer, category, description, tags }) => {
  const { t } = useTranslation();
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
        <div className={styles[_.camelCase(t(_.upperFirst(`${layer} layer`)))]}>
          <div className={styles.tooltipWrapper} data-tip="Laag">
            <Tag label={t(_.upperFirst(layer))} icon={<FontAwesomeIcon icon={faLayerGroup} />} />
          </div>
        </div>
        <div className={styles[_.camelCase(`${layer} category`)]}>
          {_category && (
            <div className={styles.tooltipWrapper} data-tip="Categorie">
              <Tag label={_.upperFirst(_category?.title)} icon={_category?.icon} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.tags}>
        {tags.status && (
          <div className={styles.tooltipWrapper} data-tip="Status">
            <Tag label={_.upperFirst(tags.status)} icon={<FontAwesomeIcon icon={faInfoCircle} />} />
          </div>
        )}
        <div className={styles.tooltipWrapper} data-tip="Aantal installaties">
          <Tag label={tags.installations} icon={<FontAwesomeIcon icon={faRepeat} />} />
        </div>

        {tags.organization && (
          <div className={styles.tooltipWrapper} data-tip="Organisatie">
            <Tag label={tags.organization} icon={<FontAwesomeIcon icon={faHouse} />} />
          </div>
        )}
        {tags.licence && (
          <div className={styles.tooltipWrapper} data-tip="Licentie">
            <Tag label={tags.licence} icon={<FontAwesomeIcon icon={faScroll} />} />
          </div>
        )}
        {tags.githubLink && (
          <div className={styles.tooltipWrapper} data-tip="GitHub">
            <Tag label={t("Repository")} icon={<GitHubLogo />} onClick={() => open(tags.githubLink)} />
          </div>
        )}
      </div>
    </div>
  );
};
