import * as React from "react";
import * as styles from "./ResultsDisplaySwitch.module.css";
import { Button, ButtonGroup } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { FiltersContext } from "../../context/filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faGripVertical, faLayerGroup, faTable } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import _ from "lodash";

interface AcceptedFilters {
  resultDisplayLayout: ["table", "cards", "layer"];
  dependenciesDisplayLayout: ["layer", "relations"];
  landingDisplayLayout: ["layer", "cards"];
  organizationsResultDisplayLayout: ["table", "cards"];
}

interface ResultsDisplaySwitchProps {
  layoutClassName?: string;
  resultsDisplayType:
    | "resultDisplayLayout"
    | "dependenciesDisplayLayout"
    | "landingDisplayLayout"
    | "organizationsResultDisplayLayout";
}

const ResultsDisplaySwitch: React.FC<ResultsDisplaySwitchProps> = ({ layoutClassName, resultsDisplayType }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useContext(FiltersContext);

  const acceptedFilters: AcceptedFilters = {
    resultDisplayLayout: ["table", "cards", "layer"],
    dependenciesDisplayLayout: ["layer", "relations"],
    landingDisplayLayout: ["layer", "cards"],
    organizationsResultDisplayLayout: ["table", "cards"],
  };

  return (
    <ButtonGroup className={clsx(styles.resultsDisplaySwitchButtons, [layoutClassName] && layoutClassName)}>
      {acceptedFilters[resultsDisplayType].map((displayType, idx: number) => {
        let icon = faTable;

        if (displayType === "table") icon = faTable;
        if (displayType === "cards") icon = faGripVertical;
        if (displayType === "layer") icon = faLayerGroup;
        if (displayType === "relations") icon = faCircleNodes;

        // TODO: Once the Rotterdam design system supports the "pressed" state,
        // remove the `appereance` switch, and use the same appearance for each button.
        return (
          <Button
            key={idx}
            pressed={filters[resultsDisplayType] === displayType}
            appearance={filters[resultsDisplayType] === displayType ? "secondary-action-button" : "subtle-button"}
            onClick={() => setFilters({ ...filters, [resultsDisplayType]: displayType })}
          >
            <FontAwesomeIcon icon={icon} />
            <span>{t(_.upperFirst(displayType))}</span>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ResultsDisplaySwitch;
