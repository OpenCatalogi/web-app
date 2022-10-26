import * as React from "react";
import * as styles from "./CategoriesLandingDisplayTemplate.module.css";
import _ from "lodash";
import { Button, Heading2, LeadParagraph } from "@gemeente-denhaag/components-react";
import { TEMPORARY_PORTFOLIOS } from "../../../../data/portfolio";
import { useTranslation } from "react-i18next";
import { CategoryCard } from "../../../../components/categoryCard/CategoryCard";
import { navigate } from "gatsby";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";

interface CategoriesLandingDisplayTemplateProps {}

export const CategoriesLandingDisplayTemplate: React.FC<CategoriesLandingDisplayTemplateProps> = ({}) => {
  const { t } = useTranslation();

  const categories = TEMPORARY_PORTFOLIOS;

  return (
    <>
      <div className={styles.subHeading}>
        <Heading2>{t("Categories")}</Heading2>

        <LeadParagraph>
          Voor onderstaande gemeentelijke producten en diensten zijn Common Ground oplossingen beschikbaar.
        </LeadParagraph>
      </div>
      <div className={styles.ComponentsGrid}>
        {categories.map((category) => (
          <CategoryCard
            title={{ label: category.title, href: `/categories/${category.id}` }}
            description={category.shortDescription}
            icon={category.icon}
            domain={category.domain}
          />
        ))}
      </div>
      <Button icon={<ArrowRightIcon />} iconAlign="start" onClick={() => navigate("/categories")}>
        Bekijk alle categorieën
      </Button>
    </>
  );
};
