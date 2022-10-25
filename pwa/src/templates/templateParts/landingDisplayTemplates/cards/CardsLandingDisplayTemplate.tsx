import * as React from "react";
import * as styles from "./CardsLandingDisplayTemplate.module.css";
import _ from "lodash";
import { DetailsCard } from "@conduction/components";
import { Button, Heading2, LeadParagraph } from "@gemeente-denhaag/components-react";
import { TEMPORARY_PORTFOLIOS } from "../../../../data/portfolio";
import { useTranslation } from "react-i18next";
import { CategoryCard } from "../../../../components/categoryCard/CategoryCard";
import { navigate } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";

interface CardsLandingDisplayTemplateProps {}

export const CardsLandingDisplayTemplate: React.FC<CardsLandingDisplayTemplateProps> = ({}) => {
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
            description={category.description}
            icon={category.icon}
            domain={"domain"}
          />
        ))}
      </div>
      <Button icon={<ArrowRightIcon />} iconAlign="start" onClick={() => navigate("/categories")}>
        Bekijk alle categorieën
      </Button>
    </>
  );
};
