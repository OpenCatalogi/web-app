import * as React from "react";
import * as styles from "./CategoryDetailTemplate.module.css";
import { Button, Heading1, Heading3, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { BadgeCounter, Container, Tag } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { categories as _categories } from "../../data/filters";
import { TEMPORARY_PORTFOLIOS } from "../../data/portfolio";
import Skeleton from "react-loading-skeleton";
import { TEMPORARY_DOMAINS } from "../../data/domains";
import { TEMPORARY_COMPONENTS } from "../../data/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faLayerGroup, faTable, faTags } from "@fortawesome/free-solid-svg-icons";
import { FiltersContext } from "../../context/filters";
import { ComponentResultTemplate } from "../templateParts/resultsTemplates/ComponentResultsTemplate";

interface CategoryDetailTemplateProps {
  categoryId: string;
}

export const CategoryDetailTemplate: React.FC<CategoryDetailTemplateProps> = ({ categoryId }) => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

  const portfolio = TEMPORARY_PORTFOLIOS.find((category) => {
    return category.id === categoryId;
  });
  const domain =
    portfolio &&
    TEMPORARY_DOMAINS.find((domain) => {
      return domain.title === portfolio.domain;
    });
  const components = TEMPORARY_COMPONENTS;
  const componentCount = components.results.length;
  const badgeLabel = componentCount < 100 ? _.toString(componentCount) : "99+";

  React.useEffect(() => {
    setFilters({ ...filters, catagoryDisplayLayout: "table" });
  }, []);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/categories")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to categories")}
        </Link>
      </div>

      {portfolio && domain && (
        <div className={styles.header}>
          <Heading1 className={styles.title}>{portfolio.title}</Heading1>
          <Tag label={t(domain.title)} icon={<FontAwesomeIcon icon={faTags} />} />
          <LeadParagraph className={styles.description}>{portfolio.longDescription}</LeadParagraph>
        </div>
      )}

      <div className={styles.resultsDisplaySwitchButtons}>
        <Button
          className={styles.buttonIcon}
          variant={filters.catagoryDisplayLayout === "table" ? "primary-action" : "secondary-action"}
          onClick={() => setFilters({ ...filters, catagoryDisplayLayout: "table" })}
        >
          <FontAwesomeIcon icon={faTable} />
          {t("Table")}
        </Button>
        <Button
          className={styles.buttonIcon}
          variant={filters.catagoryDisplayLayout === "cards" ? "primary-action" : "secondary-action"}
          onClick={() => setFilters({ ...filters, catagoryDisplayLayout: "cards" })}
        >
          <FontAwesomeIcon icon={faGripVertical} />
          {t("Cards")}
        </Button>
        <Button
          className={styles.buttonIcon}
          variant={filters.catagoryDisplayLayout === "layer" ? "primary-action" : "secondary-action"}
          onClick={() => setFilters({ ...filters, catagoryDisplayLayout: "layer" })}
        >
          <FontAwesomeIcon icon={faLayerGroup} />
          {t("Layers")}
        </Button>
      </div>

      {components && filters.catagoryDisplayLayout && (
        <div className={styles.solutions}>
          <div className={styles.solutionsHeader}>
            <span className={componentCount >= 100 && styles.maxNumber}>
              <BadgeCounter number={badgeLabel}>
                <Heading3 className={styles.title}>{t("Solutions")}</Heading3>
              </BadgeCounter>
            </span>
          </div>

          <div className={styles.results}>
            <ComponentResultTemplate components={components.results ?? []} type={filters.catagoryDisplayLayout} />
          </div>
        </div>
      )}

      {!portfolio && <Skeleton height="200px" />}
    </Container>
  );
};
