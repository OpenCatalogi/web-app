import * as React from "react";
import * as styles from "./LayerDependenciesTemplate.module.css";
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
import { ComponentCardsAccordionTemplate } from "../../componentCardsAccordion/ComponentCardsAccordionTemplate";

interface LayersResultTemplateProps {
  components: any[];
  hideTableHead?: boolean;
}

export const LayerDependenciesTemplate: React.FC<LayersResultTemplateProps> = ({ components, hideTableHead }) => {
  const { t } = useTranslation();

  return <ComponentCardsAccordionTemplate {...{ components }} />;
};
