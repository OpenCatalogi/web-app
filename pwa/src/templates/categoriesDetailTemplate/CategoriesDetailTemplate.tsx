import * as React from "react";
import * as styles from "./CategoriesDetailTemplate.module.css";
import { Heading1, Heading3, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
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
import { ComponentCard } from "../../components/componentCard/ComponentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

interface CategoriesDetailTemplateProps {
  categoryId: string;
}

export const CategoriesDetailTemplate: React.FC<CategoriesDetailTemplateProps> = ({ categoryId }) => {
  const { t } = useTranslation();

  const portfolio = TEMPORARY_PORTFOLIOS.find((category) => {
    return category.id === categoryId;
  });
  const domain =
    portfolio &&
    TEMPORARY_DOMAINS.find((domain) => {
      return domain.title === portfolio.domain;
    });
  const components = portfolio && TEMPORARY_COMPONENTS;

  const badgeNumber = 1;
  const badgeLabel = badgeNumber < 100 ? _.toString(badgeNumber) : "99+";
  const maxItems = badgeNumber > 100;

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
      {components && (
        <div className={styles.solutions}>
          <div className={styles.solutionsHeader}>
            <span className={maxItems && styles.maxNumber}>
              <BadgeCounter number={badgeLabel}>
                <Heading3 className={styles.title}>{t("Solutions")}</Heading3>
              </BadgeCounter>
            </span>
          </div>

          <div className={styles.solutionsContent}>
            {components.map((component) => (
              <ComponentCard
                key={component.id}
                title={{ label: component.name, href: `#` }}
                description={component.embedded?.description?.shortDescription}
                layer={component.embedded?.nl.embedded?.commonground.layerType}
                categories={component.categories}
                tags={{
                  status: component.developmentStatus,
                  installations: component.usedBy?.length.toString() ?? "0",
                  organization: component.embedded?.url?.embedded?.organisation?.name,
                  licence: component.embedded?.legal?.license,
                  githubLink: component.embedded?.url?.url,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {!portfolio && <Skeleton height="200px" />}
    </Container>
  );
};
