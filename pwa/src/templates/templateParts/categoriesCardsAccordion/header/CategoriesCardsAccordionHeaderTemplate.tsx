import * as React from "react";
import * as styles from "./CategoriesCardsAccordionHeaderTemplate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Heading3 } from "@gemeente-denhaag/components-react";
import clsx from "clsx";
import { faChevronRight, faGripVertical } from "@fortawesome/free-solid-svg-icons";

interface CategoriesCardsAccordionHeaderTemplateProps {
  title: string;
  active: boolean;
}

export const CategoriesCardsAccordionHeaderTemplate: React.FC<CategoriesCardsAccordionHeaderTemplateProps> = ({
  title,
  active,
}) => {
  return (
    <div className={clsx(styles.container, active && styles.active)}>
      <div className={styles.content}>
        <FontAwesomeIcon className={styles.categoryIcon} icon={faGripVertical} />
        <Heading3>{title}</Heading3>

        <FontAwesomeIcon className={clsx(styles.toggleIcon, active && styles.active)} icon={faChevronRight} />
      </div>

      <Divider />
    </div>
  );
};
