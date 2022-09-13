import * as React from "react";
import * as styles from "./NetworkDependenciesTemplate.module.css";
import { Network } from "vis-network";
import { Link } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import _ from "lodash";
import { ToolTip } from "../../../../components/toolTip/ToolTip";
import { Tag } from "../../../../components/tag/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { getTokenValue } from "../../../../services/getTokenValue";

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
    label: component.name,
    layer: component.embedded?.nl?.embedded?.commonground?.layerType,
    color: getTokenValue(
      styles[_.camelCase(`layerColor ${t(component.embedded?.nl?.embedded?.commonground?.layerType)}`)],
    ),
    shape: "box",
  }));

  console.log(componentNodes);

  const mainComponentNode = {
    id: mainComponent.id,
    label: mainComponent.name,
    layer: mainComponent.layer,
    color: getTokenValue(styles[_.camelCase(`layerColor ${t(mainComponent.layer)}`)]),
    shape: "box",
  };

  const nodes = [mainComponentNode, ...componentNodes];

  const edges = nodes.map((component) => {
    if (component.id === mainComponent.id) {
      return {};
    }
    return {
      from: mainComponent.id,
      to: component.id,
      arrows: "to",
    };
  });

  const options = {};

  React.useEffect(() => {
    container.current && new Network(container.current, { nodes, edges }, options);
  }, [container, nodes, edges]);

  return <div ref={container} className={styles.test} />;
};
