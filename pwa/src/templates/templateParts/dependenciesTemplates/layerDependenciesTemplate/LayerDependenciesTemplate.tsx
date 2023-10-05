import * as React from "react";

import { ComponentCardsAccordionTemplate } from "../../componentCardsAccordion/ComponentCardsAccordionTemplate";

interface LayersResultTemplateProps {
  components: any[];
}

export const LayerDependenciesTemplate: React.FC<LayersResultTemplateProps> = ({ components }) => {
  return <ComponentCardsAccordionTemplate {...{ components }} />;
};
