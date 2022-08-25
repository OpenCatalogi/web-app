import * as React from "react";
import * as styles from "./LayersResultTemplate.module.css";

import _ from "lodash";
import { CardsSearchTemplate } from "../../CardsSearch/CardsSearchTemplate";

interface LayersResultTemplateProps {
  components: any[];
}

export const LayersResultTemplate: React.FC<LayersResultTemplateProps> = ({ components }) => {
  return <CardsSearchTemplate components={components} />;
};
