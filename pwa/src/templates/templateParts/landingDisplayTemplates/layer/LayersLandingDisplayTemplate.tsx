import * as React from "react";
import * as styles from "./LayersLandingDisplayTemplate.module.css";
import _ from "lodash";
import { ComponentCategoryAccordionTemplate } from "../../componentCategoryAccordion/ComponentCategoryAccordionTemplate";
import { Heading2, LeadParagraph } from "@gemeente-denhaag/components-react";

interface LayersLandingDisplayTemplateProps {}

export const LayersLandingDisplayTemplate: React.FC<LayersLandingDisplayTemplateProps> = ({}) => {
  return (
    <>
      <div className={styles.subHeading}>
        <Heading2>Zoeken per categorie</Heading2>

        <LeadParagraph>Hier kunnen de components gezocht worden op categorie.</LeadParagraph>
      </div>
      <ComponentCategoryAccordionTemplate />
    </>
  );
};
