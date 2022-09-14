import * as React from "react";
import * as styles from "./NetworkDependenciesTemplate.module.css";
import { Network } from "vis-network";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { getTokenValue } from "../../../../services/getTokenValue";
import { addNewLineToString } from "../../../../services/addNewLineToString";

interface LayersResultTemplateProps {
  components: any[];
  mainComponent: {
    id: string;
    name: string;
    layer: string;
  };
}

export const NetworkDependenciesTemplate: React.FC<LayersResultTemplateProps> = ({ components, mainComponent }) => {
  const { t } = useTranslation();

  const container = React.useRef(null);

  const componentNodes = components.map((component) => ({
    id: component.id,
    label: addNewLineToString(component.name),
    layer: component.embedded?.nl?.embedded?.commonground?.layerType,
    color: {
      background: getTokenValue(
        styles[_.camelCase(`layerColor ${t(_.upperFirst(component.embedded?.nl?.embedded?.commonground?.layerType))}`)],
      ),
      border: getTokenValue(
        styles[
          _.camelCase(`borderLayerColor ${t(_.upperFirst(component.embedded?.nl?.embedded?.commonground?.layerType))}`)
        ],
      ),
      highlight: {
        background: getTokenValue(
          styles[
            _.camelCase(
              `highlightLayerColor ${t(_.upperFirst(component.embedded?.nl?.embedded?.commonground?.layerType))}`,
            )
          ],
        ),
        border: getTokenValue(
          styles[
            _.camelCase(`layerColor ${t(_.upperFirst(component.embedded?.nl?.embedded?.commonground?.layerType))}`)
          ],
        ),
      },
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
      background: getTokenValue(styles[_.camelCase(`layerColor ${t(_.upperFirst(mainComponent.layer))}`)]),
      border: getTokenValue(styles[_.camelCase(`borderLayerColor ${t(_.upperFirst(mainComponent.layer))}`)]),
      highlight: {
        background: getTokenValue(styles[_.camelCase(`highlightLayerColor ${t(_.upperFirst(mainComponent.layer))}`)]),
        border: getTokenValue(styles[_.camelCase(`layerColor ${t(_.upperFirst(mainComponent.layer))}`)]),
      },
    },
    font: { color: "white", size: 15 },
  };

  const nodes = [mainComponentNode, ...componentNodes];

  const edges = nodes.map((component) => {
    if (component.id === mainComponent.id) {
      return {};
    }
    return {
      from: component.id,
      to: mainComponent.id,
    };
  });

  const options = {
    nodes: {
      shape: "circle",
      borderWidth: 2,
      borderWidthSelected: 1,
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

  React.useEffect(() => {
    container.current && new Network(container.current, { nodes, edges }, options);
  }, [container, nodes, edges]);

  return <div ref={container} className={styles.networkContainer} />;
};
