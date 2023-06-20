import * as React from "react";
import * as styles from "./LayersLandingDisplayTemplate.module.css";
import { ComponentCategoryAccordionTemplate } from "../../componentCategoryAccordion/ComponentCategoryAccordionTemplate";
import { Paragraph, Heading } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";

export const LayersLandingDisplayTemplate: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.subHeading}>
        <Heading level={2}>{t("Layers")}</Heading>

        <Paragraph>Hier kunnen de components gezocht worden per laag.</Paragraph>
      </div>
      <ComponentCategoryAccordionTemplate />
    </>
  );
};
