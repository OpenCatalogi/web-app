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
import Skeleton from "react-loading-skeleton";
import { HorizontalFiltersTemplate } from "../templateParts/filters/horizontalFilters/HorizontalFiltersTemplate";
import { SubmitComponentTemplate } from "../templateParts/submitComponent/SubmitComponentTemplate";
import { useSearch } from "../../hooks/search";

export const ComponentsTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

  const queryClient = new QueryClient();
  const _useSearch = useSearch(queryClient);
  const getComponents = _useSearch.getSearch({ ...filters, resultDisplayLayout: "table" }); // Ensure no refetch on resultDisplayLayout change

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

          {getComponents.data?.results?.length === 0 &&
            !getComponents.isLoading &&
            t("No components found with active filters")}

          {!getComponents.data && !getComponents.isLoading && "Geen componenten gevonden"}

          {getComponents.isSuccess && getComponents.data.length > 0 && (
            <>
              <ComponentResultTemplate components={getComponents.data} type={filters.resultDisplayLayout} />

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
          {getComponents.isLoading && <Skeleton height="200px" />}
        </div>
      </div>
    </Container>
  );
};
