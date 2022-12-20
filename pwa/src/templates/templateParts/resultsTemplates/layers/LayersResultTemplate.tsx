import * as React from "react";
import * as styles from "./LayersResultTemplate.module.css";
import _ from "lodash";
import { ComponentCardsAccordionTemplate } from "../../componentCardsAccordion/ComponentCardsAccordionTemplate";
import { Alert } from "@gemeente-denhaag/components-react";

interface LayersResultTemplateProps {
  components: any[];
}

export const LayersResultTemplate: React.FC<LayersResultTemplateProps> = ({ components }) => {
  const _components = components.filter((component) => {
    return component._self;
  });

  return (
    <>
      <Alert title="Let op!" text="Op deze pagina staan alleen de componenten met een Laag." variant="info" />
      <ComponentCardsAccordionTemplate components={_components} />
    </>
  );
};
