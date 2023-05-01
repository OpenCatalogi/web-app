import * as React from "react";
import * as styles from "./RelationsDependenciesTemplate.module.css";
import { Network } from "vis-network";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { getTokenValue } from "../../../../services/getTokenValue";
import { addNewLineToString } from "../../../../services/addNewLineToString";
import { navigate } from "gatsby";
import { NodeToolTip } from "../../../../components/toolTip/ToolTip";
import "vis-network/styles/vis-network.css";
import { renderToStaticMarkup } from "react-dom/server";

interface RelationsDependenciesTemplateProps {
  components: any[];
  mainComponent: {
    id: string;
    name: string;
    layer: string;
  };
}

export const RelationsDependenciesTemplate: React.FC<RelationsDependenciesTemplateProps> = ({
  components,
  mainComponent,
}) => {
  const { t } = useTranslation();

  const ToolTip = document.createElement("div");
  const staticToolTipElement = renderToStaticMarkup(
    <NodeToolTip tooltip="Dubbelklik het component om naar het component te gaan" />,
  );
  ToolTip.innerHTML = `${staticToolTipElement}`;

  const componentNodes = components.map((component) => ({
    id: component.id ?? component._self?.id,
    label: addNewLineToString(component.name),
    title: ToolTip,
    layer: component.embedded?.nl?.embedded?.commonground?.layerType,
    color: {
      background: getTokenValue(
        styles[
          _.camelCase(
            `layerColor ${_.upperFirst(
              component.embedded?.nl?.embedded?.commonground?.layerType ?? component.layerType,
            )}`,
          )
        ],
      ),
    },
    font: {
      color: "white",
    },
    scaling: {
      min: 10,
      max: 10,
      label: {
        enabled: true,
        min: 10,
        max: 10,
      },
    },
    value: 1,
    widthConstraint: 90,
  }));

  const mainComponentNode = {
    id: mainComponent.id,
    label: addNewLineToString(mainComponent.name),
    layer: mainComponent.layer,
    color: {
      background: getTokenValue(styles[_.camelCase(`layerColor ${_.upperFirst(mainComponent.layer ?? "Unknown")}`)]),
    },
    font: { color: "white", size: 20 },
  };

  const nodes = [mainComponentNode, ...componentNodes];

  const edges = nodes.map((component) => {
    if (component.id === mainComponent.id) return {};

    return {
      from: component.id,
      to: mainComponent.id,
    };
  });

  const options = {
    nodes: {
      shape: "circle",
      borderWidth: 0,
      chosen: false,
    },
    edges: {
      color: "darkGray",
    },
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -26,
        centralGravity: 0.005,
        springLength: 225,
        springConstant: 0.18,
      },
      maxVelocity: 146,
      solver: "forceAtlas2Based",
      timestep: 0.35,
      stabilization: { iterations: 150 },
    },
  };

  const relationsContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const network =
      relationsContainerRef.current && new Network(relationsContainerRef.current, { nodes, edges }, options);

    if (!network) return;

    network.on("doubleClick", (event: { nodes: string[] }) => {
      const componentId = event.nodes[0];

      if (!componentId || componentId === mainComponent.id) return;

      navigate(`/components/${event.nodes[0]}`);
    });
  }, [relationsContainerRef, nodes, edges]);

  return <div ref={relationsContainerRef} className={styles.relationsContainer} />;
};
