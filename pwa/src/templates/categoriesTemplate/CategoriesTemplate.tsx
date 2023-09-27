import * as React from "react";
import * as styles from "./CategoriesTemplate.module.css";
import { Heading, Paragraph, Icon, Link } from "@utrecht/component-library-react/dist/css-module";
import { Container } from "@conduction/components";
import { useTranslation } from "react-i18next";
import { TEMPORARY_PORTFOLIOS } from "../../data/portfolio";
import { CategoriesardsAccordionTemplate } from "../templateParts/categoriesCardsAccordion/CategoriesCardsAccordionTemplate";
import { IconExternalLink, IconArrowRight } from "@tabler/icons-react";
import { navigate } from "gatsby-link";

export const CategoriesTemplate: React.FC = () => {
  const { t } = useTranslation();

  const categories = TEMPORARY_PORTFOLIOS;

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <Heading level={2} className={styles.title}>
          {t("Categories")}
        </Heading>

        <div className={styles.subHeading}>
          <Paragraph className={styles.description}>
            We verdelen{" "}
            <span>
              <Link className={styles.link} onClick={() => navigate("/applications")}>
                <Icon className={styles.icon}>
                  <IconArrowRight />
                </Icon>
                <span className={styles.linkText}> applicaties</span>
              </Link>
            </span>{" "}
            en{" "}
            <span>
              <Link className={styles.link} onClick={() => navigate("/components")}>
                <Icon className={styles.icon}>
                  <IconArrowRight />
                </Icon>
                <span className={styles.linkText}> componenten </span>
              </Link>
            </span>{" "}
            in categorieën gebaseerd op de
            <br />
            <span>
              <Link
                className={styles.link}
                target="_new"
                href="https://www.gemmaonline.nl/index.php/GEMMA_Bedrijfsfuncties"
              >
                <Icon className={styles.icon}>
                  <IconExternalLink />
                </Icon>
                <span className={styles.linkText}> Gemma bedrijfsfuncties </span>
              </Link>
            </span>
            .
          </Paragraph>
        </div>
      </div>

      <CategoriesardsAccordionTemplate {...{ categories }} />
    </Container>
  );
};
