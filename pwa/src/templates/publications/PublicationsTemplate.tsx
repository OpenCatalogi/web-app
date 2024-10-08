import * as React from "react";
import * as styles from "./PublicationsTemplate.module.css";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import { IDisplaySwitchButton } from "@conduction/components/lib/components/displaySwitch/DisplaySwitch";
import { Container, DisplaySwitch, Pagination } from "@conduction/components";
import { usePublicationFiltersContext } from "../../context/publicationFilters";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import { VerticalFiltersPublicationsTemplate } from "../templateParts/filters/verticalFiltersPublications/VerticalFiltersPublicationsTemplate";
import { SubmitComponentTemplate } from "../templateParts/submitComponent/SubmitComponentTemplate";
import { useSearch } from "../../hooks/search";
import { ActiveFiltersPublicationsTemplate } from "../templateParts/filters/activeFiltersPublications/ActiveFiltersPublicationsTemplate";
import { Alert, Heading, Icon, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { usePaginationContext } from "../../context/pagination";
import { PaginationLimitSelectComponent } from "../../components/paginationLimitSelect/PaginationLimitSelect";
import { useQueryLimitContext } from "../../context/queryLimit";
import { useResultDisplayLayoutContext } from "../../context/resultDisplayLayout";
import { usePublication } from "../../hooks/publication";
import { PublicationsTableTemplate } from "../templateParts/publicationsTable/PublicationsTableTemplate";
import { HorizontalFiltersPublicationsTemplate } from "../templateParts/filters/horizontalFiltersPublications/HorizontalFiltersPublicationsTemplate";

export const PublicationsTemplate: React.FC = () => {
  const { t } = useTranslation();
  const { publicationFilters } = usePublicationFiltersContext();
  const { queryLimit, setQueryLimit } = useQueryLimitContext();
  const { pagination, setPagination } = usePaginationContext();
  const { resultDisplayLayout, setResultDisplayLayout } = useResultDisplayLayoutContext();

  const queryClient = new QueryClient();
  const _usePublications = usePublication(queryClient);
  const getPublications = _usePublications.getSearch(
    { ...publicationFilters },
    pagination.publicationCurrentPage,
    queryLimit.publicationsQueryLimit,
  ); // Ensure no refetch on resultDisplayLayout change

  React.useEffect(() => {
    if (queryLimit.previousPublicationsQueryLimit === queryLimit.publicationsQueryLimit) return;

    setPagination({ ...pagination, publicationCurrentPage: 1 });
    setQueryLimit({ ...queryLimit, previousPublicationsQueryLimit: queryLimit.publicationsQueryLimit });
  }, [queryLimit.publicationsQueryLimit]);

  const displaySwitchButtons: IDisplaySwitchButton[] = [
    {
      label: t("Table"),
      pressed: resultDisplayLayout.publicationsResultDisplayLayout === "table",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, publicationsResultDisplayLayout: "table" }),
      icon: {
        name: "table",
        prefix: "fas",
      },
    },
  ];

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading level={2} className={clsx(styles.title, !getPublications.isSuccess && styles.loading)}>
            {t("Publications")}{" "}
            {getPublications.data?.results.length >= 0 ? (
              `(${getPublications.data.results.length})`
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
        <VerticalFiltersPublicationsTemplate
          filterSet={[publicationFilters]}
          layoutClassName={styles.verticalFilters}
        />

        <div className={styles.results}>
          <HorizontalFiltersPublicationsTemplate />

          <ActiveFiltersPublicationsTemplate />

          {getPublications.data?.results?.length === 0 && !getPublications.isLoading && (
            <span>{t("No components found with active filters")}</span>
          )}

          {getPublications.data?.results && getPublications.data?.results?.length > 0 && (
            <>
              <PublicationsTableTemplate publications={getPublications.data.results} />

              <SubmitComponentTemplate />
              {getPublications.data.results.length && (
                <div className={styles.pagination}>
                  <Pagination
                    layoutClassName={styles.paginationContainer}
                    totalPages={Math.ceil(getPublications.data.results.length / queryLimit.publicationsQueryLimit)}
                    currentPage={pagination.publicationCurrentPage}
                    setCurrentPage={(page: any) => setPagination({ ...pagination, publicationCurrentPage: page })}
                    ariaLabels={{
                      pagination: t("Pagination"),
                      nextPage: t("Next page"),
                      previousPage: t("Previous page"),
                      page: t("Page"),
                    }}
                  />
                  <PaginationLimitSelectComponent queryLimitName={"publicationsQueryLimit"} />
                </div>
              )}
            </>
          )}
          {getPublications.isLoading && <Skeleton height="200px" />}
        </div>
      </div>
    </Container>
  );
};
