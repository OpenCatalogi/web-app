import * as React from "react";
import * as styles from "./CategoriesTemplate.module.css";
import * as _ from "lodash";
import { Heading2, LeadParagraph } from "@gemeente-denhaag/components-react";
import { Container, DetailsCard } from "@conduction/components";
import { useTranslation } from "react-i18next";
import { TEMPORARY_PORTFOLIOS } from "../../data/portfolio";

export const CategoriesTemplate: React.FC = () => {
  const { t } = useTranslation();

  const categories = TEMPORARY_PORTFOLIOS;

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <Heading2>{t("Categories")}</Heading2>

        <div className={styles.subHeading}>
          <LeadParagraph>
            Voor onderstaande gemeentelijke producten en diensten zijn Common Ground oplossingen beschikbaar.
          </LeadParagraph>
        </div>
      </div>

      <div className={styles.componentsGrid}>
        {categories.map((category) => (
          <DetailsCard
            title={category.title}
            introduction={category.description}
            link={{ href: `/categories/${category.id}`, label: "details" }}
          />
        ))}
      </div>
    </Container>
  );
};
