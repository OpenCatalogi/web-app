import * as React from "react";
import * as styles from "./CategoriesTemplate.module.css";
import { Heading, Paragraph, Icon, Link } from "@utrecht/component-library-react/dist/css-module";
import { Container } from "@conduction/components";
import { useTranslation } from "react-i18next";
import { TEMPORARY_PORTFOLIOS } from "../../data/portfolio";
import { CategoriesCardsAccordionTemplate } from "../templateParts/categoriesCardsAccordion/CategoriesCardsAccordionTemplate";
import { navigate } from "gatsby-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faExternalLink } from "@fortawesome/free-solid-svg-icons";

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
              <Link
                className={styles.inlineTextLink}
                onClick={(e) => {
                  e.preventDefault(), navigate("/applications");
                }}
                href="/applications"
              >
                <Icon>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Icon>
                {t("Applications").toLowerCase()}
              </Link>
            </span>{" "}
            en{" "}
            <span>
              <Link
                className={styles.inlineTextLink}
                onClick={(e) => {
                  e.preventDefault(), navigate("/components");
                }}
                href="/components"
              >
                <Icon>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Icon>
                {t("Components").toLowerCase()}
              </Link>
            </span>{" "}
            in categorieën gebaseerd op de
            <br />
            <span>
              <Link
                className={styles.inlineTextLink}
                target="_new"
                href="https://www.gemmaonline.nl/index.php/GEMMA_Bedrijfsfuncties"
              >
                <Icon>
                  <FontAwesomeIcon icon={faExternalLink} />
                </Icon>
                <span> Gemma bedrijfsfuncties </span>
              </Link>
            </span>
            .
          </Paragraph>
        </div>
      </div>

      <CategoriesCardsAccordionTemplate {...{ categories }} />
    </Container>
  );
};
