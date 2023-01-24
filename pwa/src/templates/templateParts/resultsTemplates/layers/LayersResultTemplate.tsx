import * as React from "react";
import _ from "lodash";
import { ComponentCardsAccordionTemplate } from "../../componentCardsAccordion/ComponentCardsAccordionTemplate";

interface LayersResultTemplateProps {
  components: any[];
}

export const LayersResultTemplate: React.FC<LayersResultTemplateProps> = ({ components }) => {
  const _components = components.filter((component) => {
    return component._self;
  });

  return <ComponentCardsAccordionTemplate components={_components} />;
};
