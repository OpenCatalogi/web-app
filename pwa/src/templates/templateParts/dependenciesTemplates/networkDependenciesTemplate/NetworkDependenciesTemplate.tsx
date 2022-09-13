import * as React from "react";
import * as styles from "./NetworkDependenciesTemplate.module.css";
import { Network } from "vis-network";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import { getTokenValue } from "../../../../services/getTokenValue";
import { addNewLineToString } from "../../../../services/addNewLineToString";

interface LayersResultTemplateProps {
  components: any[];
  hideTableHead?: boolean;
  mainComponent: {
    id: string;
    name: string;
    layer: string;
  };
}

export const NetworkDependenciesTemplate: React.FC<LayersResultTemplateProps> = ({
  components,
  hideTableHead,
  mainComponent,
}) => {
  const { t } = useTranslation();

  const container = React.useRef(null);

  const componentNodes = components.map((component) => ({
    id: component.id,
    label: addNewLineToString(component.name),
    layer: component.embedded?.nl?.embedded?.commonground?.layerType,
    color: getTokenValue(
      styles[_.camelCase(`layerColor ${t(component.embedded?.nl?.embedded?.commonground?.layerType)}`)],
    ),
    font: { color: "white" },
  }));

  const mainComponentNode = {
    id: mainComponent.id,
    label: addNewLineToString(mainComponent.name),
    layer: mainComponent.layer,
    color: getTokenValue(styles[_.camelCase(`layerColor ${t(mainComponent.layer)}`)]),
    font: { color: "white" },
  };

  const nodes = [mainComponentNode, ...componentNodes];

  const edges = nodes.map((component) => {
    if (component.id === mainComponent.id) {
      return {};
    }
    return {
      from: component.id,
      to: mainComponent.id,
      arrows: "from",
    };
  });

  const options = {
    nodes: {
      shape: "box",
      size: 16,
    },
    edges: {
      color: "black",
    },
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -26,
        centralGravity: 0.005,
        springLength: nodes.length > 10 ? 250 : 100,
        springConstant: 0.18,
      },
      maxVelocity: 146,
      solver: "forceAtlas2Based",
      timestep: 0.35,
      stabilization: { iterations: 150 },
    },
  };

  React.useEffect(() => {
    container.current && new Network(container.current, { nodes, edges }, options);
  }, [container, nodes, edges]);

  return <div ref={container} className={styles.test} />;
};
