import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import { Container, Pagination } from "@conduction/components";
import { ComponentResultTemplate } from "../templateParts/resultsTemplates/ComponentResultsTemplate";
import { defaultFiltersContext, useFiltersContext } from "../../context/filters";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import { VerticalFiltersTemplate } from "../templateParts/filters/verticalFilters/VerticalFiltersTemplate";
import Skeleton from "react-loading-skeleton";
import { HorizontalFiltersTemplate } from "../templateParts/filters/horizontalFilters/HorizontalFiltersTemplate";
import { SubmitComponentTemplate } from "../templateParts/submitComponent/SubmitComponentTemplate";
import { useSearch } from "../../hooks/search";
import { ActiveFiltersTemplate } from "../templateParts/filters/activeFilters/ActiveFiltersTemplate";
import ResultsDisplaySwitch from "../../components/resultsDisplaySwitch/ResultsDisplaySwitch";
import { Alert, Heading, Icon, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { IconInfoCircle } from "@tabler/icons-react";
import { useComponent } from "../../hooks/components";
import { usePaginationContext } from "../../context/pagination";

export const ComponentsTemplate: React.FC = () => {
  const { t } = useTranslation();
  const { filters } = useFiltersContext();
  const { pagination, setPagination } = usePaginationContext();

  const queryClient = new QueryClient();
  const _useSearch = useSearch(queryClient);
  const getComponents = _useSearch.getSearch(
    { ...filters, resultDisplayLayout: "table", organizationSearch: "" },
    pagination.componentsCurrentPage,
  ); // Ensure no refetch on resultDisplayLayout change

  const _useComponents = useComponent(queryClient);
  const componentsCount = _useComponents.getCount(defaultFiltersContext);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading level={2} className={styles.title}>
            Componenten {componentsCount.data && `(${componentsCount.data})`}
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
                <>
                  <Pagination
                    layoutClassName={styles.paginationContainer}
                    totalPages={getComponents.data.pages}
                    currentPage={getComponents.data.page}
                    setCurrentPage={(page: any) => setPagination({ ...pagination, componentsCurrentPage: page })}
                    ariaLabels={{ nextPage: t("Next page"), previousPage: t("Previous page"), page: t("Page") }}
                  />
                </>
              )}
            </>
          )}
          {getComponents.isLoading && <Skeleton height="200px" />}
        </div>
      </div>
    </Container>
  );
};
