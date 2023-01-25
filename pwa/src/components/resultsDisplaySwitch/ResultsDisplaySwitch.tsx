import * as React from "react";
import * as styles from "./ResultsDisplaySwitch.module.css";
import { Button } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { FiltersContext } from "../../context/filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faGripVertical, faLayerGroup, faTable } from "@fortawesome/free-solid-svg-icons";

interface AcceptedFilters {
  resultDisplayLayout: ["table", "cards", "layer"];
  dependenciesDisplayLayout: ["layer", "relations"];
  landingDisplayLayout: ["layer", "categories"];
}

interface ResultsDisplaySwitchProps {
  resultsDisplayType: "resultDisplayLayout" | "dependenciesDisplayLayout" | "landingDisplayLayout";
}

const ResultsDisplaySwitch: React.FC<ResultsDisplaySwitchProps> = ({ resultsDisplayType }) => {
  const acceptedFilters: AcceptedFilters = {
    resultDisplayLayout: ["table", "cards", "layer"],
    dependenciesDisplayLayout: ["layer", "relations"],
    landingDisplayLayout: ["layer", "categories"],
  };

  return (
    <div className={styles.resultsDisplaySwitchButtons}>
      {acceptedFilters[resultsDisplayType].map((displayType) => {
        if (displayType === "table") return <TableButton {...{ resultsDisplayType }} />;
        if (displayType === "cards") return <CardsButton {...{ resultsDisplayType }} />;
        if (displayType === "layer") return <LayerButton {...{ resultsDisplayType }} />;
        if (displayType === "relations") return <RelationsButton {...{ resultsDisplayType }} />;
        if (displayType === "categories") return <CategoriesButton {...{ resultsDisplayType }} />;
      })}
    </div>
  );
};

export default ResultsDisplaySwitch;

const TableButton: React.FC<ResultsDisplaySwitchProps> = ({ resultsDisplayType }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useContext(FiltersContext);
  return (
    <Button
      className={styles.buttonIcon}
      variant={filters[resultsDisplayType] === "table" ? "primary-action" : "secondary-action"}
      onClick={() => setFilters({ ...filters, [resultsDisplayType]: "table" })}
    >
      <FontAwesomeIcon icon={faTable} />
      {t("Table")}
    </Button>
  );
};

const CardsButton: React.FC<ResultsDisplaySwitchProps> = ({ resultsDisplayType }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useContext(FiltersContext);
  return (
    <Button
      className={styles.buttonIcon}
      variant={filters[resultsDisplayType] === "cards" ? "primary-action" : "secondary-action"}
      onClick={() => setFilters({ ...filters, [resultsDisplayType]: "cards" })}
    >
      <FontAwesomeIcon icon={faGripVertical} />
      {t("Cards")}
    </Button>
  );
};

const LayerButton: React.FC<ResultsDisplaySwitchProps> = ({ resultsDisplayType }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useContext(FiltersContext);
  return (
    <Button
      className={styles.buttonIcon}
      variant={filters[resultsDisplayType] === "layer" ? "primary-action" : "secondary-action"}
      onClick={() => setFilters({ ...filters, [resultsDisplayType]: "layer" })}
    >
      <FontAwesomeIcon icon={faLayerGroup} />
      {t("Layers")}
    </Button>
  );
};

const RelationsButton: React.FC<ResultsDisplaySwitchProps> = ({ resultsDisplayType }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useContext(FiltersContext);
  return (
    <Button
      className={styles.buttonIcon}
      variant={filters[resultsDisplayType] === "relations" ? "primary-action" : "secondary-action"}
      onClick={() => setFilters({ ...filters, [resultsDisplayType]: "relations" })}
    >
      <FontAwesomeIcon icon={faCircleNodes} />
      {t("Relations")}
    </Button>
  );
};

const CategoriesButton: React.FC<ResultsDisplaySwitchProps> = ({ resultsDisplayType }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useContext(FiltersContext);
  return (
    <Button
      className={styles.buttonIcon}
      variant={filters[resultsDisplayType] === "categories" ? "primary-action" : "secondary-action"}
      onClick={() => setFilters({ ...filters, [resultsDisplayType]: "categories" })}
    >
      <FontAwesomeIcon icon={faCircleNodes} />
      {t("Categories")}
    </Button>
  );
};
