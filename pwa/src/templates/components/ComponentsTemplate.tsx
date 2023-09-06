import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import { Container } from "@conduction/components";
import { ComponentResultTemplate } from "../templateParts/resultsTemplates/ComponentResultsTemplate";
import { FiltersContext } from "../../context/filters";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import { VerticalFiltersTemplate } from "../templateParts/filters/verticalFilters/VerticalFiltersTemplate";
import Skeleton from "react-loading-skeleton";
import { HorizontalFiltersTemplate } from "../templateParts/filters/horizontalFilters/HorizontalFiltersTemplate";
import { SubmitComponentTemplate } from "../templateParts/submitComponent/SubmitComponentTemplate";
import { PaginatedItems } from "../../components/pagination/pagination";
import { useSearch } from "../../hooks/search";
import { ActiveFiltersTemplate } from "../templateParts/filters/activeFilters/ActiveFiltersTemplate";
import ResultsDisplaySwitch from "../../components/resultsDisplaySwitch/ResultsDisplaySwitch";
import { Alert, Heading, Icon, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { IconInfoCircle } from "@tabler/icons-react";

export const ComponentsTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

  const queryClient = new QueryClient();
  const _useSearch = useSearch(queryClient);
  const getComponents = _useSearch.getSearch({ ...filters, resultDisplayLayout: "table", organizationSearch: "" }); // Ensure no refetch on resultDisplayLayout change

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading level={2} className={styles.title}>
            Componenten
          </Heading>
        </div>

        <ResultsDisplaySwitch resultsDisplayType="resultDisplayLayout" />
      </div>

      <div className={styles.filtersAndResultsContainer}>
        <VerticalFiltersTemplate filterSet={[filters]} layoutClassName={styles.verticalFilters} />

        <div className={styles.results}>
          <HorizontalFiltersTemplate />
          {filters.resultDisplayLayout === "table" && (
            <Alert
              type="info"
              icon={
                <Icon>
                  <IconInfoCircle />
                </Icon>
              }
            >
              <Paragraph>Op deze pagina worden alle resultaten weergegeven</Paragraph>
            </Alert>
          )}

          {filters.resultDisplayLayout === "cards" && (
            <Alert
              type="info"
              icon={
                <Icon>
                  <IconInfoCircle />
                </Icon>
              }
            >
              <Paragraph>Op deze pagina staan alleen applicaties, organisaties en componenten</Paragraph>
            </Alert>
          )}
          {filters.resultDisplayLayout === "layer" && (
            <Alert
              type="info"
              icon={
                <Icon>
                  <IconInfoCircle />
                </Icon>
              }
            >
              <Paragraph>Op deze pagina staan alleen componenten met een laag</Paragraph>
            </Alert>
          )}

          <ActiveFiltersTemplate />

          {getComponents.data?.results?.length === 0 && !getComponents.isLoading && (
            <span>{t("No components found with active filters")}</span>
          )}

          {getComponents.data?.results && getComponents.data?.results?.length > 0 && (
            <>
              <ComponentResultTemplate components={getComponents.data.results} type={filters.resultDisplayLayout} />

              <SubmitComponentTemplate />
              {getComponents.data.results.length && (
                <PaginatedItems
                  pages={getComponents.data.pages}
                  currentPage={getComponents.data.page}
                  setPage={(page) => setFilters({ ...filters, currentPage: page })}
                  pageRangeDisplayed={2}
                  containerClassName={styles.paginationContainer}
                />
              )}
            </>
          )}
          {getComponents.isLoading && <Skeleton height="200px" />}
        </div>
      </div>
    </Container>
  );
};
