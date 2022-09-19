import * as React from "react";
import * as styles from "./RelationsDependenciesTemplate.module.css";
import { Network } from "vis-network";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { getTokenValue } from "../../../../services/getTokenValue";
import { addNewLineToString } from "../../../../services/addNewLineToString";
import { navigate } from "gatsby";

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

  const container = React.useRef(null);

  const componentNodes = components.map((component) => ({
    id: component.id,
    label: addNewLineToString(component.name),
    layer: component.embedded?.nl?.embedded?.commonground?.layerType,
    color: {
      background: getTokenValue(
        styles[_.camelCase(`layerColor ${t(_.upperFirst(component.embedded?.nl?.embedded?.commonground?.layerType))}`)],
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
      background: getTokenValue(styles[_.camelCase(`layerColor ${t(_.upperFirst(mainComponent.layer))}`)]),
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

  const visJsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const network = visJsRef.current && new Network(visJsRef.current, { nodes, edges }, options);
    network?.on("doubleClick", (event: { nodes: string[] }) => {
      if (event.nodes?.length === 1 && event.nodes[0] !== mainComponent.id) {
        navigate(`/components/${event.nodes[0]}`);
      }
    });
  }, [visJsRef, nodes, edges]);

  return <div ref={visJsRef} className={styles.relationsContainer} />;
};
