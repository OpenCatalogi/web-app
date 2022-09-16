import * as React from "react";
import * as _ from "lodash";
import { TComponentDependenciesLayout } from "../../../context/filters";
import { RelationsDependenciesTemplate } from "./relationsDependenciesTemplate/RelationsDependenciesTemplate";
import { LayerDependenciesTemplate } from "./layerDependenciesTemplate/LayerDependenciesTemplate";
import { RelationsDependenciesFiltersTemplate } from "./relationsDependenciesTemplate/filters/RelationsDependenciesFiltersTemplate";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const mappedComponents = components.map((component) => ({
    ...component,
    layerType: component?.embedded?.nl?.embedded?.commonground?.layerType,
  }));

  const interaction = mappedComponents.filter((component) => {
    return t(_.upperFirst(component?.layerType)) === t("Interaction");
  });
  const process = mappedComponents.filter((component) => {
    return t(_.upperFirst(component?.layerType)) === t("Process");
  });
  const integration = mappedComponents.filter((component) => {
    return t(_.upperFirst(component?.layerType)) === t("Integration");
  });
  const services = mappedComponents.filter((component) => {
    return t(_.upperFirst(component?.layerType)) === t("Service");
  });
  const data = mappedComponents.filter((component) => {
    return t(_.upperFirst(component?.layerType)) === t("Data");
  });

  const { active: activeInteraction, setActive: setActiveInteraction } = FilterController();
  const { active: activeProcess, setActive: setActiveProcess } = FilterController();
  const { active: activeIntegration, setActive: setActiveIntegration } = FilterController();
  const { active: activeServices, setActive: setActiveServices } = FilterController();
  const { active: activeData, setActive: setActiveData } = FilterController();

  const filteredComponents = [
    ...(activeInteraction ? interaction : []),
    ...(activeProcess ? process : []),
    ...(activeIntegration ? integration : []),
    ...(activeServices ? services : []),
    ...(activeData ? data : []),
  ];
  return (
    <>
      <RelationsDependenciesFiltersTemplate
        items={[
          {
            label: "Interactie",
            handleClick: setActiveInteraction,
            active: activeInteraction,
            disabled: interaction.length,
          },
          { label: "Proces", handleClick: setActiveProcess, active: activeProcess, disabled: process.length },
          {
            label: "Integratie",
            handleClick: setActiveIntegration,
            active: activeIntegration,
            disabled: integration.length,
          },
          { label: "Service", handleClick: setActiveServices, active: activeServices, disabled: services.length },
          { label: "Data", handleClick: setActiveData, active: activeData, disabled: data.length },
        ]}
      />
      <RelationsDependenciesTemplate
        mainComponent={{ id: mainComponent.id, name: mainComponent.name, layer: mainComponent.layer }}
        components={filteredComponents}
      />
    </>
  );
};

const FilterController = () => {
  const [active, setActive] = React.useState<boolean>(true);

  return { active, setActive };
};
