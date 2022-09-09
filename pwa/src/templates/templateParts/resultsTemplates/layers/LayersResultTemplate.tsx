import * as React from "react";
import * as styles from "./LayersResultTemplate.module.css";

import _ from "lodash";
import { ComponentCardsAccordionTemplate } from "../../componentCardsAccordion/ComponentCardsAccordionTemplate";

interface LayersResultTemplateProps {
  components: any[];
}

export const LayersResultTemplate: React.FC<LayersResultTemplateProps> = ({ components }) => {
  return <ComponentCardsAccordionTemplate components={components} />;
};
