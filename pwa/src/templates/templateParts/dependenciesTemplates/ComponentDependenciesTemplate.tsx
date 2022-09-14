import * as React from "react";
import * as _ from "lodash";
import { TComponentDependenciesLayout } from "../../../context/filters";
import { NetworkDependenciesTemplate } from "./networkDependenciesTemplate/NetworkDependenciesTemplate";
import { LayerDependenciesTemplate } from "./layerDependenciesTemplate/LayerDependenciesTemplate";
import { NetworkDependenciesFiltersTemplate } from "./networkDependenciesTemplate/filters/NetworkDependenciesFiltersTemplate";
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

    case "network":
      return <NetworkDependencies {...{ components, mainComponent }} />;
  }
};

interface NetworkDependenciesProps {
  components: any[];
  mainComponent: {
    id: string;
    name: string;
    layer: string;
  };
}

const NetworkDependencies: React.FC<NetworkDependenciesProps> = ({ components, mainComponent }) => {
  const { t } = useTranslation();

  const interaction = components.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Interaction");
  });
  const process = components.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Process");
  });
  const integration = components.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Integration");
  });
  const services = components.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Service");
  });
  const data = components.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Data");
  });

  const { active: activeInteraction, setActive: setActiveInteraction } = FilterController();
  const { active: activeProcess, setActive: setActiveProcess } = FilterController();
  const { active: activeIntegration, setActive: setActiveIntegration } = FilterController();
  const { active: activeServices, setActive: setActiveServices } = FilterController();
  const { active: activeData, setActive: setActiveData } = FilterController();

  const _components = [
    ...(activeInteraction ? interaction : []),
    ...(activeProcess ? process : []),
    ...(activeIntegration ? integration : []),
    ...(activeServices ? services : []),
    ...(activeData ? data : []),
  ];
  return (
    <>
      <NetworkDependenciesFiltersTemplate
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
      <NetworkDependenciesTemplate
        mainComponent={{ id: mainComponent.id, name: mainComponent.name, layer: mainComponent.layer }}
        components={_components}
      />
    </>
  );
};

const FilterController = () => {
  const [active, setActive] = React.useState<boolean>(true);

  return { active, setActive };
};
