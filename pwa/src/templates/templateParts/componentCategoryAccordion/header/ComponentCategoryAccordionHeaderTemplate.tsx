import * as React from "react";
import * as styles from "./ComponentCategoryAccordionHeaderTemplate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from "@gemeente-denhaag/components-react";
import { Heading3 } from "@utrecht/component-library-react/dist/css-module";
import clsx from "clsx";
import { faChevronRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

interface ComponentCategoryAccordionHeaderTemplateProps {
  title: string;
  active: boolean;
}

export const ComponentCategoryAccordionHeaderTemplate: React.FC<ComponentCategoryAccordionHeaderTemplateProps> = ({
  title,
  active,
}) => {
  return (
    <div className={clsx(styles.container, active && styles.active)}>
      <div className={styles.content}>
        <FontAwesomeIcon className={styles.layerIcon} icon={faLayerGroup} />
        <Heading3>{title}</Heading3>

        <FontAwesomeIcon className={clsx(styles.toggleIcon, active && styles.active)} icon={faChevronRight} />
      </div>

      <Divider />
    </div>
  );
};
