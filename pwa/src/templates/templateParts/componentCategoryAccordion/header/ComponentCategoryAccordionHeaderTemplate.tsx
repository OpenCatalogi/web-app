import * as React from "react";
import * as styles from "./ComponentCategoryAccordionHeaderTemplate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { faChevronRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { Heading, Separator } from "@utrecht/component-library-react/dist/css-module";

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
        <Heading level={3}>{title}</Heading>

        <FontAwesomeIcon className={clsx(styles.toggleIcon, active && styles.active)} icon={faChevronRight} />
      </div>

      <Separator />
    </div>
  );
};
