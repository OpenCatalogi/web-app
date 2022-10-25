import * as React from "react";
import * as styles from "./CategoriesDetailTemplate.module.css";
import { Heading1, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { Container, NotificationPopUp as _NotificationPopUp } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { categories as _categories } from "../../data/filters";
import { TEMPORARY_PORTFOLIOS } from "../../data/portfolio";
import Skeleton from "react-loading-skeleton";

interface CategoriesDetailTemplateProps {
  categorieId: string;
}

export const CategoriesDetailTemplate: React.FC<CategoriesDetailTemplateProps> = ({ categorieId }) => {
  const { t } = useTranslation();

  const Portfolio = TEMPORARY_PORTFOLIOS.find((categorie) => {
    return categorie.id === categorieId;
  });

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/categories")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to categories")}
        </Link>
      </div>

      {Portfolio && (
        <div className={styles.header}>
          <Heading1>{Portfolio.title}</Heading1>
          <LeadParagraph className={styles.description}>{Portfolio.description}</LeadParagraph>
        </div>
      )}

      {!Portfolio && <Skeleton height="200px" />}
    </Container>
  );
};
