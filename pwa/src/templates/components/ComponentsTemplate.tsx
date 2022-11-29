import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { Button, Heading2 } from "@gemeente-denhaag/components-react";
import { Container, Pagination } from "@conduction/components";
import { ComponentResultTemplate } from "../templateParts/resultsTemplates/ComponentResultsTemplate";
import { FiltersContext } from "../../context/filters";
import { faGripVertical, faLayerGroup, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import { VerticalFiltersTemplate } from "../templateParts/filters/verticalFilters/VerticalFiltersTemplate";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";
import { HorizontalFiltersTemplate } from "../templateParts/filters/horizontalFilters/HorizontalFiltersTemplate";
import { SubmitComponentTemplate } from "../templateParts/submitComponent/SubmitComponentTemplate";
import { TEMPORARY_COMPONENTS } from "../../data/components";
import { TEMPORARY_ORGANIZATIONS } from "../../data/organizations";
import { TEMPORARY_APPLICATIONS } from "../../data/applications";

export const ComponentsTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

  const queryClient = new QueryClient();
  const _useComponent = useComponent(queryClient);
  // const getComponents = _useComponent.getAll({ ...filters, resultDisplayLayout: "table" }); // Ensure no refetch on resultDisplayLayout change

  const TempComponents = TEMPORARY_COMPONENTS;
  const TempOrganizations = TEMPORARY_ORGANIZATIONS;
  const TempApplications = TEMPORARY_APPLICATIONS;

  function shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const getComponents = [...TempOrganizations, ...TempComponents, ...TempApplications];

  shuffle(getComponents);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading2 className={styles.title}>Componenten</Heading2>
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

      <div className={styles.filtersAndResultsContainer}>
        <VerticalFiltersTemplate layoutClassName={styles.verticalFilters} />

        <div className={styles.results}>
          <HorizontalFiltersTemplate />

          {getComponents && getComponents.length > 0 && (
            <>
              <ComponentResultTemplate components={getComponents} type={filters.resultDisplayLayout} />

              <SubmitComponentTemplate />

              {/* {getComponents.length && (
                <Pagination
                  setPage={(page) => setFilters({ ...filters, currentPage: page })}
                  pages={getComponents.pages}
                  currentPage={getComponents.page}
                />
              )} */}
            </>
          )}

          {/* {getComponents.length === 0 &&
            !getComponents.isLoading &&
            t("No components found with active filters")}

          {!getComponents && !getComponents.isLoading && "Geen componenten gevonden"}

          {getComponents.isLoading && <Skeleton height="200px" />} */}
        </div>
      </div>
    </Container>
  );
};
