import * as React from "react";
import * as styles from "./CategoriesTemplate.module.css";
import { Heading, Paragraph, Icon, Link } from "@utrecht/component-library-react/dist/css-module";
import { Container } from "@conduction/components";
import { useTranslation } from "react-i18next";
import { TEMPORARY_PORTFOLIOS } from "../../data/portfolio";
import { CategoriesCardsAccordionTemplate } from "../templateParts/categoriesCardsAccordion/CategoriesCardsAccordionTemplate";
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
              <Link onClick={() => navigate("/applications")}>
                <Icon>
                  <IconArrowRight />
                </Icon>
                <span> applicaties</span>
              </Link>
            </span>{" "}
            en{" "}
            <span>
              <Link onClick={() => navigate("/components")}>
                <Icon>
                  <IconArrowRight />
                </Icon>
                <span> componenten </span>
              </Link>
            </span>{" "}
            in categorieën gebaseerd op de
            <br />
            <span>
              <Link target="_new" href="https://www.gemmaonline.nl/index.php/GEMMA_Bedrijfsfuncties">
                <Icon>
                  <IconExternalLink />
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
