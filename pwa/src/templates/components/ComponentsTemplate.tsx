import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { Button, FormField, FormFieldInput, FormFieldLabel, Heading2 } from "@gemeente-denhaag/components-react";
import { useForm } from "react-hook-form";
import { InputText, Container, SelectMultiple } from "@conduction/components";
import { ComponentResultTemplate, TComponentResultsLayout } from "../templateParts/resultsTemplates/ComponentResultsTemplate";
import { FiltersContext } from "../../context/filters";
import { getFilteredComponents } from "../../services/getFilteredComponents";
import { faGripVertical, faLayerGroup, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import { FiltersTemplate } from "../templateParts/filters/FiltersTemplate";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";

export const ComponentsTemplate: React.FC = () => {
  const [filters] = React.useContext(FiltersContext);
  const [filteredComponents, setFilteredComponents] = React.useState<any[]>([]);
  const { t } = useTranslation();

  const queryClient = new QueryClient();
  const _useComponent = useComponent(queryClient);
  const getComponents = _useComponent.getAll();

  React.useEffect(() => {
    if (!getComponents.isSuccess) return;

    setFilteredComponents(getFilteredComponents(getComponents.data, filters));
  }, [filters, getComponents.isSuccess]);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading2>Components</Heading2>
          <span>Donec id elit non mi porta gravida at eget metus.</span>
        </div>
        <div className={styles.resultsDisplaySwitchButtons}>
          <Button
            className={styles.buttonIcon}
            variant={filters.resultDisplayLayout === "table" ? "primary-action" : "secondary-action"}
            onClick={() => setFilters({ ...filters, resultDisplayLayout: "table" })}
          >
            <FontAwesomeIcon icon={faTable} />
            {t("Table")}
          </Button>
          <Button
            className={styles.buttonIcon}
            variant={filters.resultDisplayLayout === "cards" ? "primary-action" : "secondary-action"}
            onClick={() => setFilters({ ...filters, resultDisplayLayout: "cards" })}
          >
            <FontAwesomeIcon icon={faGripVertical} />
            {t("Cards")}
          </Button>
          <Button
            className={styles.buttonIcon}
            variant={filters.resultDisplayLayout === "layer" ? "primary-action" : "secondary-action"}
            onClick={() => setFilters({ ...filters, resultDisplayLayout: "layer" })}
          >
            <FontAwesomeIcon icon={faLayerGroup} />
            {t("Layers")}
          </Button>
        </div>
      </div>

      <FiltersTemplate />

      {filteredComponents.length > 0 && (
        <ComponentResultTemplate components={filteredComponents} type={filters.resultDisplayLayout} />
      )}

      {!filteredComponents.length && !getComponents.isLoading && t("No components found with active filters")}
      {getComponents.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
