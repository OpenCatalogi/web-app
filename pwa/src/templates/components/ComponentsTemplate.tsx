import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { Button, Heading2 } from "@gemeente-denhaag/components-react";
import { t } from "i18next";
import { Container } from "@conduction/components";
import { ComponentResultTemplate, TComponentResultsLayout } from "../componentResult/ComponentResultsTemplate";
import { FiltersContext } from "../../context/filters";
import { getFilteredComponents } from "../../services/getFilteredComponents";
import { useComponent } from "../../hooks/components";
import { QueryClient } from "react-query";
import { FiltersTemplate } from "../templateParts/filters/FiltersTemplate";

export const ComponentsTemplate: React.FC = () => {
  const [filters] = React.useContext(FiltersContext);
  const [filteredComponents, setFilteredComponents] = React.useState<any[]>([]);
  const [display, setDisplay] = React.useState<TComponentResultsLayout>("table");

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
            variant={display === "table" ? "primary-action" : "secondary-action"}
            onClick={() => setDisplay("table")}
          >
            {t("Table")}
          </Button>
          <Button
            variant={display === "cards" ? "primary-action" : "secondary-action"}
            onClick={() => setDisplay("cards")}
          >
            {t("Cards")}
          </Button>
        </div>
      </div>

      <FiltersTemplate />

      {filteredComponents.length > 0 && <ComponentResultTemplate results={filteredComponents} type={display} />}

      {!filteredComponents.length && t("No components found with active filters")}
    </Container>
  );
};
