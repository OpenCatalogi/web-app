import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import { IDisplaySwitchButton } from "@conduction/components/lib/components/displaySwitch/DisplaySwitch";
import { Container, DisplaySwitch, Pagination } from "@conduction/components";
import { ComponentResultTemplate } from "../templateParts/resultsTemplates/ComponentResultsTemplate";
import { useFiltersContext } from "../../context/filters";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import { VerticalFiltersTemplate } from "../templateParts/filters/verticalFilters/VerticalFiltersTemplate";
import { HorizontalFiltersTemplate } from "../templateParts/filters/horizontalFilters/HorizontalFiltersTemplate";
import { SubmitComponentTemplate } from "../templateParts/submitComponent/SubmitComponentTemplate";
import { useSearch } from "../../hooks/search";
import { ActiveFiltersTemplate } from "../templateParts/filters/activeFilters/ActiveFiltersTemplate";
import { Alert, Heading, Icon, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { IconInfoCircle } from "@tabler/icons-react";
import { usePaginationContext } from "../../context/pagination";
import { PaginationLimitSelectComponent } from "../../components/paginationLimitSelect/PaginationLimitSelect";
import { useQueryLimitContext } from "../../context/queryLimit";
import { useResultDisplayLayoutContext } from "../../context/resultDisplayLayout";

export const ComponentsTemplate: React.FC = () => {
  const { t } = useTranslation();
  const { filters } = useFiltersContext();
  const { queryLimit, setQueryLimit } = useQueryLimitContext();
  const { pagination, setPagination } = usePaginationContext();
  const { resultDisplayLayout, setResultDisplayLayout } = useResultDisplayLayoutContext();

  const queryClient = new QueryClient();
  const _useSearch = useSearch(queryClient);
  const getComponents = _useSearch.getSearch(
    { ...filters, organizationSearch: "" },
    pagination.componentsCurrentPage,
    queryLimit.componentsSearchQueryLimit,
  ); // Ensure no refetch on resultDisplayLayout change
  const searchCount = _useSearch.getCount(filters);

  React.useEffect(() => {
    if (queryLimit.previousComponentsSearchQueryLimit === queryLimit.componentsSearchQueryLimit) return;

    setPagination({ ...pagination, componentsCurrentPage: 1 });
    setQueryLimit({ ...queryLimit, previousComponentsSearchQueryLimit: queryLimit.componentsSearchQueryLimit });
  }, [queryLimit.componentsSearchQueryLimit]);

  const displaySwitchButtons: IDisplaySwitchButton[] = [
    {
      label: t("Table"),
      pressed: resultDisplayLayout.componentsDisplayLayout === "table",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, componentsDisplayLayout: "table" }),
      icon: {
        name: "table",
        prefix: "fas",
      },
    },
    {
      label: t("Cards"),
      pressed: resultDisplayLayout.componentsDisplayLayout === "cards",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, componentsDisplayLayout: "cards" }),
      icon: {
        name: "grip-vertical",
        prefix: "fas",
      },
    },
    {
      label: t("Layer"),
      pressed: resultDisplayLayout.componentsDisplayLayout === "layer",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, componentsDisplayLayout: "layer" }),
      icon: {
        name: "layer-group",
        prefix: "fas",
      },
    },
  ];

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading level={2} className={clsx(styles.title, !searchCount.isSuccess && styles.loading)}>
            {t("Components")}{" "}
            {searchCount.data >= 0 ? (
              `(${searchCount.data})`
            ) : (
              <>
                (<Skeleton height="1ch" width="1ch" />)
              </>
            )}
          </Heading>
        </div>

        <DisplaySwitch buttons={displaySwitchButtons} />
      </div>

      <div className={styles.filtersAndResultsContainer}>
        <VerticalFiltersTemplate filterSet={[filters]} layoutClassName={styles.verticalFilters} />

        <div className={styles.results}>
          <HorizontalFiltersTemplate />
          {resultDisplayLayout.componentsDisplayLayout === "table" && (
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

          {resultDisplayLayout.componentsDisplayLayout === "cards" && (
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
          {resultDisplayLayout.componentsDisplayLayout === "layer" && (
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
              <ComponentResultTemplate
                components={getComponents.data.results}
                type={resultDisplayLayout.componentsDisplayLayout}
              />

              <SubmitComponentTemplate />
              {getComponents.data.results.length && (
                <div className={styles.pagination}>
                  <Pagination
                    layoutClassName={styles.paginationContainer}
                    totalPages={getComponents.data.pages}
                    currentPage={getComponents.data.page}
                    setCurrentPage={(page: any) => setPagination({ ...pagination, componentsCurrentPage: page })}
                    ariaLabels={{ nextPage: t("Next page"), previousPage: t("Previous page"), page: t("Page") }}
                  />
                  <PaginationLimitSelectComponent queryLimitName={"componentsSearchQueryLimit"} />
                </div>
              )}
            </>
          )}
          {getComponents.isLoading && <Skeleton height="200px" />}
        </div>
      </div>
    </Container>
  );
};
