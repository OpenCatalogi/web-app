import * as React from "react";
import * as styles from "./OrganizationsTemplate.module.css";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import { IDisplaySwitchButton } from "@conduction/components/lib/components/displaySwitch/DisplaySwitch";
import { Container, DisplaySwitch, Pagination } from "@conduction/components";
import { useFiltersContext } from "../../context/filters";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import { Heading } from "@utrecht/component-library-react/dist/css-module";
import { useOrganization } from "../../hooks/organization";
import { OrganizationSearchFiltersTemplate } from "../templateParts/filters/organizationSearchFilterTemplate/OrganizationSearchFilterTemplate";
import { OrganizationDisplayTemplate } from "../templateParts/OrganizationDisplayTemplates/OrganizationDisplayTemplate";
import { usePaginationContext } from "../../context/pagination";
import { PaginationLimitSelectComponent } from "../../components/paginationLimitSelect/PaginationLimitSelect";
import { useQueryLimitContext } from "../../context/queryLimit";
import { useResultDisplayLayoutContext } from "../../context/resultDisplayLayout";

export const OrganizationsTemplate: React.FC = () => {
  const { t } = useTranslation();
  const { filters } = useFiltersContext();
  const { queryLimit } = useQueryLimitContext();
  const { pagination, setPagination } = usePaginationContext();
  const { resultDisplayLayout, setResultDisplayLayout } = useResultDisplayLayoutContext();

  const queryClient = new QueryClient();
  const _useOrganisation = useOrganization(queryClient);
  const getOrganisations = _useOrganisation.getAll(
    { ...filters },
    pagination.organizationCurrentPage,
    queryLimit.organizationsQueryLimit,
  );

  const displaySwitchButtons: IDisplaySwitchButton[] = [
    {
      label: t("Table"),
      pressed: resultDisplayLayout.organizationsResultDisplayLayout === "table",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, organizationsResultDisplayLayout: "table" }),
      icon: {
        name: "table",
        prefix: "fas",
      },
    },
    {
      label: t("Cards"),
      pressed: resultDisplayLayout.organizationsResultDisplayLayout === "cards",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, organizationsResultDisplayLayout: "cards" }),
      icon: {
        name: "grip-vertical",
        prefix: "fas",
      },
    },
  ];

  React.useEffect(() => {
    setPagination({ ...pagination, organizationCurrentPage: 1 });
  }, [queryLimit.organizationsQueryLimit]);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading level={2} className={clsx(styles.title, !getOrganisations.isSuccess && styles.loading)}>
            {t("Organizations")}{" "}
            {getOrganisations.data?.total >= 0 ? (
              `(${getOrganisations.data?.total})`
            ) : (
              <>
                (<Skeleton height="1ch" width="1ch" />)
              </>
            )}
          </Heading>
        </div>

        <DisplaySwitch buttons={displaySwitchButtons} />
      </div>

      <div>
        <div className={styles.results}>
          <OrganizationSearchFiltersTemplate />

          {getOrganisations.data?.results?.length === 0 && !getOrganisations.isLoading && (
            <span>{t("No organizations found")}</span>
          )}

          {getOrganisations.data?.results && getOrganisations.data?.results?.length > 0 && (
            <>
              <OrganizationDisplayTemplate
                organizations={getOrganisations.data.results}
                type={resultDisplayLayout.organizationsResultDisplayLayout}
              />

              {getOrganisations.data.results.length && (
                <div className={styles.pagination}>
                  <Pagination
                    layoutClassName={styles.paginationContainer}
                    totalPages={getOrganisations.data.pages}
                    currentPage={getOrganisations.data.page}
                    setCurrentPage={(page: any) => setPagination({ ...pagination, organizationCurrentPage: page })}
                    ariaLabels={{ nextPage: t("Next page"), previousPage: t("Previous page"), page: t("Page") }}
                  />
                  <PaginationLimitSelectComponent queryLimitName={"organizationsQueryLimit"} />
                </div>
              )}
            </>
          )}
          {getOrganisations.isLoading && <Skeleton height="200px" />}
        </div>
      </div>
    </Container>
  );
};
