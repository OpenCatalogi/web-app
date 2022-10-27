import * as React from "react";
import * as styles from "./CategoriesLandingDisplayTemplate.module.css";
import _ from "lodash";
import { Button, Heading2, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { CategoryCard } from "../../../../components/categoryCard/CategoryCard";
import { navigate } from "gatsby";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { TEMPORARY_DOMAINS } from "../../../../data/domains";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { TEMPORARY_PORTFOLIOS } from "../../../../data/portfolio";

interface CategoriesLandingDisplayTemplateProps {}

export const CategoriesLandingDisplayTemplate: React.FC<CategoriesLandingDisplayTemplateProps> = ({}) => {
  const { t } = useTranslation();

  const domains = TEMPORARY_DOMAINS;
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
        {domains.map((domain) => (
          <CategoryCard
            title={{ label: t(domain.title), href: `/categories` }}
            description={
              <div>
                {categories.map(
                  (categorie) =>
                    categorie.domain === domain.title && (
                      <div onClick={() => navigate(`/categories/${categorie.id}`)}>
                        <Link icon={<ArrowRightIcon />} iconAlign="start">
                          {categorie.title}
                        </Link>
                      </div>
                    ),
                )}
              </div>
            }
            icon={<FontAwesomeIcon icon={faTags} />}
          />
        ))}
      </div>
      <Button icon={<ArrowRightIcon />} iconAlign="start" onClick={() => navigate("/categories")}>
        Bekijk alle categorieën
      </Button>
    </>
  );
};
