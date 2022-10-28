import * as React from "react";
import * as styles from "./CategoriesTemplate.module.css";
import * as _ from "lodash";
import { Heading2, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { Container } from "@conduction/components";
import { useTranslation } from "react-i18next";
import { TEMPORARY_PORTFOLIOS } from "../../data/portfolio";
import { CategoriesardsAccordionTemplate } from "../templateParts/categoriesCardsAccordion/CategoriesCardsAccordionTemplate";
import { ExternalLinkIcon, ArrowRightIcon } from "@gemeente-denhaag/icons";
import { navigate } from "gatsby";

export const CategoriesTemplate: React.FC = () => {
  const { t } = useTranslation();

  const categories = TEMPORARY_PORTFOLIOS;

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <Heading2 className={styles.title}>{t("Categories")}</Heading2>

        <div className={styles.subHeading}>
          <LeadParagraph className={styles.description}>
            We verdelen{" "}
            <span onClick={() => navigate("/applications")}>
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                applicaties
              </Link>
            </span>{" "}
            en{" "}
            <span onClick={() => navigate("/components")}>
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                componenten
              </Link>
            </span>{" "}
            in categorieën gebaseerd op de
            <br />
            <span onClick={() => open("https://www.gemmaonline.nl/index.php/GEMMA_Bedrijfsfuncties")}>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                Gemma bedrijfsfuncties
              </Link>
            </span>
            .
          </LeadParagraph>
        </div>
      </div>

      <CategoriesardsAccordionTemplate {...{ categories }} />
    </Container>
  );
};
