import * as React from "react";
import * as styles from "./CategoriesLandingDisplayTemplate.module.css";
import { Heading, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { CategoryCard } from "../../../../components/categoryCard/CategoryCard";
import { IconArrowRight } from "@tabler/icons-react";
import { TEMPORARY_DOMAINS } from "../../../../data/domains";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { TEMPORARY_PORTFOLIOS } from "../../../../data/portfolio";
import { ButtonLink } from "../../../../components";

export const CategoriesLandingDisplayTemplate = (): JSX.Element => {
  const { t } = useTranslation();

  const domains = TEMPORARY_DOMAINS;
  const categories = TEMPORARY_PORTFOLIOS;

  return (
    <>
      <div className={styles.subHeading}>
        <Heading level={2} className={styles.title}>
          {t("Categories")}
        </Heading>

        <Paragraph className={styles.description}>
          Voor onderstaande gemeentelijke producten en diensten zijn Common Ground oplossingen beschikbaar.
        </Paragraph>
      </div>

      <div className={styles.ComponentsGrid}>
        {domains.map((domain, index) => (
          <CategoryCard
            key={index}
            title={{ label: t(domain.title), href: `/categories#${domain.title}` }}
            content={categories
              .filter((category) => category.domain === domain.title)
              .slice(0, 5)
              .map(({ title, id }) => ({ title, href: `/categories/${id}` }))}
            icon={<FontAwesomeIcon icon={faTags} />}
          />
        ))}
      </div>

      <ButtonLink to="/categories">
        <IconArrowRight /> Bekijk alle categorieën
      </ButtonLink>
    </>
  );
};
