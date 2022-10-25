import * as React from "react";
import * as styles from "./CategoriesDetailTemplate.module.css";
import { Heading1, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { Container } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { categories as _categories } from "../../data/filters";
import { TEMPORARY_PORTFOLIOS } from "../../data/portfolio";
import Skeleton from "react-loading-skeleton";

interface CategoriesDetailTemplateProps {
  categoryId: string;
}

export const CategoriesDetailTemplate: React.FC<CategoriesDetailTemplateProps> = ({ categoryId }) => {
  const { t } = useTranslation();

  const portfolio = TEMPORARY_PORTFOLIOS.find((category) => {
    return category.id === categoryId;
  });

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/categories")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to categories")}
        </Link>
      </div>

      {portfolio && (
        <div className={styles.header}>
          <Heading1>{portfolio.title}</Heading1>
          <LeadParagraph className={styles.description}>{portfolio.description}</LeadParagraph>
        </div>
      )}

      {!portfolio && <Skeleton height="200px" />}
    </Container>
  );
};
