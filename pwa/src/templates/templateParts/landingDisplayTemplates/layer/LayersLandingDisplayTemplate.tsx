import * as React from "react";
import * as styles from "./LayersLandingDisplayTemplate.module.css";
import _ from "lodash";
import { ComponentCategoryAccordionTemplate } from "../../componentCategoryAccordion/ComponentCategoryAccordionTemplate";
import { Heading2, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";

interface LayersLandingDisplayTemplateProps {}

export const LayersLandingDisplayTemplate: React.FC<LayersLandingDisplayTemplateProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.subHeading}>
        <Heading2>{t("Layers")}</Heading2>

        <Paragraph lead>Hier kunnen de components gezocht worden per laag.</Paragraph>
      </div>
      <ComponentCategoryAccordionTemplate />
    </>
  );
};
