import * as React from "react";
import * as styles from "./CategoriesDetailTemplate.module.css";
import { Heading1, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { Container, Tag } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { categories as _categories } from "../../data/filters";
import { TEMPORARY_PORTFOLIOS } from "../../data/portfolio";
import Skeleton from "react-loading-skeleton";
import { TEMPORARY_DOMAINS } from "../../data/domains";

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

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/categories")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to categories")}
        </Link>
      </div>

      {portfolio && domain && (
        <div className={styles.header}>
          <Heading1>{portfolio.title}</Heading1>
          <Tag label={t(domain.title)} icon={domain.icon} />
          <LeadParagraph className={styles.description}>{portfolio.longDescription}</LeadParagraph>
        </div>
      )}

      {!portfolio && <Skeleton height="200px" />}
    </Container>
  );
};
