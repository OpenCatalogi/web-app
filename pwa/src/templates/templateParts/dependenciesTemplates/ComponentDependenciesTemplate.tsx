import * as React from "react";
import * as _ from "lodash";
import { TComponentDependenciesLayout } from "../../../context/filters";
import { NetworkDependenciesTemplate } from "./networkDependenciesTemplate/NetworkDependenciesTemplate";
import { LayerDependenciesTemplate } from "./layerDependenciesTemplate/LayerDependenciesTemplate";

interface DependenciesTemplateProps {
  type: TComponentDependenciesLayout;
  components: any[];
  mainComponent: {
    id: string;
    name: string;
    layer: string;
  };
}

export const DependenciesTemplate: React.FC<DependenciesTemplateProps> = ({ components, type, mainComponent }) => {
  switch (type) {
    case "layer":
      return <LayerDependenciesTemplate {...{ components }} />;

    case "network":
      return (
        <NetworkDependenciesTemplate
          mainComponent={{ id: mainComponent.id, name: mainComponent.name, layer: mainComponent.layer }}
          {...{ components }}
        />
      );
  }
};
