import * as React from "react";
import * as styles from "./LayerAccordionHeaderTemplate.module.css";
import clsx from "clsx";
import { Divider, Heading3 } from "@gemeente-denhaag/components-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

interface LayerAccordionHeaderTemplateProps {
  title: string;
  open: boolean;
}

export const LayerAccordionHeaderTemplate: React.FC<LayerAccordionHeaderTemplateProps> = ({ open, title }) => {
  return (
    <div className={clsx(styles.container, open && styles.open)}>
      <div className={styles.content}>
        <FontAwesomeIcon className={styles.layerIcon} icon={faLayerGroup} />
        <Heading3>{title}</Heading3>

        <FontAwesomeIcon className={clsx(styles.toggleIcon, open && styles.open)} icon={faChevronRight} />
      </div>

      <Divider />
    </div>
  );
};
