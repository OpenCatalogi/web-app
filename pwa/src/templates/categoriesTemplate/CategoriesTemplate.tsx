import * as React from "react";
import * as styles from "./CategoriesTemplate.module.css";
import * as _ from "lodash";
import { Heading2, LeadParagraph } from "@gemeente-denhaag/components-react";
import { Icon, Link } from "@utrecht/component-library-react/dist/css-module";
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
            <span>
              <Link href="/applications">
                <Icon className="utrecht-icon--conduction-start">
                  <ArrowRightIcon />
                </Icon>
                applicaties
              </Link>
            </span>{" "}
            en{" "}
            <span>
              <Link href="/components">
                <Icon className="utrecht-icon--conduction-start">
                  <ArrowRightIcon />
                </Icon>
                componenten
              </Link>
            </span>{" "}
            in categorieën gebaseerd op de
            <br />
            <span>
              <Link href="https://www.gemmaonline.nl/index.php/GEMMA_Bedrijfsfuncties">
                <Icon className="utrecht-icon--conduction-start">
                  <ExternalLinkIcon />
                </Icon>
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
