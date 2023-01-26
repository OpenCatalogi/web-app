import * as React from "react";
import * as styles from "./ResultsDisplaySwitch.module.css";
import { Button } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { FiltersContext } from "../../context/filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faGripVertical, faLayerGroup, faTable } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import _ from "lodash";

interface AcceptedFilters {
  resultDisplayLayout: ["table", "cards", "layer"];
  dependenciesDisplayLayout: ["layer", "relations"];
  landingDisplayLayout: ["categories", "layer"];
}

interface ResultsDisplaySwitchProps {
  layoutClassName?: string;
  resultsDisplayType: "resultDisplayLayout" | "dependenciesDisplayLayout" | "landingDisplayLayout";
}

const ResultsDisplaySwitch: React.FC<ResultsDisplaySwitchProps> = ({ layoutClassName, resultsDisplayType }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useContext(FiltersContext);

  const acceptedFilters: AcceptedFilters = {
    resultDisplayLayout: ["table", "cards", "layer"],
    dependenciesDisplayLayout: ["layer", "relations"],
    landingDisplayLayout: ["categories", "layer"],
  };

  return (
    <div className={clsx(styles.resultsDisplaySwitchButtons, [layoutClassName] && layoutClassName)}>
      {acceptedFilters[resultsDisplayType].map((displayType) => {
        let icon = faTable;

        if (displayType === "table") icon = faTable;
        if (displayType === "cards") icon = faGripVertical;
        if (displayType === "layer") icon = faLayerGroup;
        if (displayType === "relations") icon = faCircleNodes;
        if (displayType === "categories") icon = faCircleNodes;

        return (
          <Button
            className={styles.buttonIcon}
            variant={filters[resultsDisplayType] === displayType ? "primary-action" : "secondary-action"}
            onClick={() => setFilters({ ...filters, [resultsDisplayType]: displayType })}
          >
            <FontAwesomeIcon icon={icon} />
            {t(_.upperFirst(displayType))}
          </Button>
        );
      })}
    </div>
  );
};

export default ResultsDisplaySwitch;
