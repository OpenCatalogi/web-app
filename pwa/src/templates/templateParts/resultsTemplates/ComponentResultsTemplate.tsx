import * as React from "react";
import { TComponentResultsLayout } from "../../../context/resultDisplayLayout";
import { TableResultTemplate } from "./table/TableResultTemplate";
import { CardsResultTemplate } from "./cards/CardsResultTemplate";
import { LayersResultTemplate } from "./layers/LayersResultTemplate";

interface ComponentResultsTemplateProps {
  type: TComponentResultsLayout;
  components: any[];
}

export const ComponentResultTemplate: React.FC<ComponentResultsTemplateProps> = ({ components, type }) => {
  switch (type) {
    case "table":
      return <TableResultTemplate {...{ components }} />;

    case "cards":
      return <CardsResultTemplate {...{ components }} />;

    case "layer":
      return <LayersResultTemplate {...{ components }} />;
  }
};
