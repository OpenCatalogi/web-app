import * as React from "react";
import * as _ from "lodash";
import { TComponentDependenciesLayout } from "../../../context/filters";
import { RelationsDependenciesTemplate } from "./relationsDependenciesTemplate/RelationsDependenciesTemplate";
import { LayerDependenciesTemplate } from "./layerDependenciesTemplate/LayerDependenciesTemplate";
import { LayerAccordionFiltersTemplate } from "../layerAccordion/filters/LayerAccordionFiltersTemplate";

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

    case "relations":
      return <RelationsDependencies {...{ components, mainComponent }} />;
  }
};

interface RelationsDependenciesProps {
  components: any[];
  mainComponent: {
    id: string;
    name: string;
    layer: string;
  };
}

const RelationsDependencies: React.FC<RelationsDependenciesProps> = ({ components, mainComponent }) => {
  const mappedComponents = components.map((component) => ({
    ...component,
    layerType: component?.embedded?.nl?.embedded?.commonground?.layerType ?? "Unknown",
  }));

  const interaction = mappedComponents.filter((component) => {
    return _.upperFirst(component?.layerType) === "Interface";
  });
  const process = mappedComponents.filter((component) => {
    return _.upperFirst(component?.layerType) === "Process";
  });
  const integration = mappedComponents.filter((component) => {
    return _.upperFirst(component?.layerType) === "Integration";
  });
  const services = mappedComponents.filter((component) => {
    return _.upperFirst(component?.layerType) === "Service";
  });
  const data = mappedComponents.filter((component) => {
    return _.upperFirst(component?.layerType) === "Data";
  });
  const unknown = mappedComponents.filter((component) => {
    return _.upperFirst(component?.layerType) === "Unknown";
  });

  const { active: activeInteraction, setActive: setActiveInteraction } = FilterController();
  const { active: activeProcess, setActive: setActiveProcess } = FilterController();
  const { active: activeIntegration, setActive: setActiveIntegration } = FilterController();
  const { active: activeServices, setActive: setActiveServices } = FilterController();
  const { active: activeData, setActive: setActiveData } = FilterController();
  const { active: activeUnknown, setActive: setActiveUnknown } = FilterController();

  const filteredComponents = [
    ...(activeInteraction ? interaction : []),
    ...(activeProcess ? process : []),
    ...(activeIntegration ? integration : []),
    ...(activeServices ? services : []),
    ...(activeData ? data : []),
    ...(activeUnknown ? unknown : []),
  ];
  return (
    <>
      <LayerAccordionFiltersTemplate
        items={[
          {
            label: "Interaction",
            handleClick: setActiveInteraction,
            active: activeInteraction,
            disabled: !interaction.length,
          },
          { label: "Process", handleClick: setActiveProcess, active: activeProcess, disabled: !process.length },
          {
            label: "Integration",
            handleClick: setActiveIntegration,
            active: activeIntegration,
            disabled: !integration.length,
          },
          { label: "Service", handleClick: setActiveServices, active: activeServices, disabled: !services.length },
          { label: "Data", handleClick: setActiveData, active: activeData, disabled: !data.length },
          { label: "Unknown", handleClick: setActiveUnknown, active: activeUnknown, disabled: !unknown.length },
        ]}
      />
      <RelationsDependenciesTemplate mainComponent={{ ...mainComponent }} components={filteredComponents} />
    </>
  );
};

const FilterController = () => {
  const [active, setActive] = React.useState<boolean>(true);

  return { active, setActive };
};
