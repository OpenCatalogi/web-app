import * as React from "react";
import * as styles from "./OrganizationsTemplate.module.css";
import { Container } from "@conduction/components";
import { FiltersContext } from "../../context/filters";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import Skeleton from "react-loading-skeleton";
import { GatsbyContext } from "../../context/gatsby";
import { PaginatedItems } from "../../components/pagination/pagination";
import ResultsDisplaySwitch from "../../components/resultsDisplaySwitch/ResultsDisplaySwitch";
import { Heading } from "@utrecht/component-library-react/dist/css-module";
import { useOrganization } from "../../hooks/organization";
import { OrganizationHorizontalFiltersTemplate } from "../templateParts/filters/horizontalFilters/HorizontalFiltersTemplate";
import { OrganizationDisplayTemplate } from "../templateParts/OrganizationDisplayTemplates/OrganizationDisplayTemplate";

export const OrganizationsTemplate: React.FC = (props) => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();
  const { screenSize } = React.useContext(GatsbyContext);
  const [marginPagesDisplayed, setMarginPageDisplayed] = React.useState<number>(3);

  const queryClient = new QueryClient();
  const _useOrganisation = useOrganization(queryClient);
  const getOrganisations = _useOrganisation.getAll({ ...filters, organizationsResultDisplayLayout: "cards" });

  React.useEffect(() => {
    if (getOrganisations.isSuccess && screenSize === "mobile") {
      setMarginPageDisplayed(2);
    }
    if (getOrganisations.isSuccess && screenSize === "mobile" && getOrganisations.data.pages > 100) {
      setMarginPageDisplayed(1);
    }
    if (getOrganisations.isSuccess && screenSize !== "mobile") {
      setMarginPageDisplayed(3);
    }
  }, [getOrganisations]);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading level={2} className={styles.title}>
            Organizations
          </Heading>
        </div>

        <ResultsDisplaySwitch resultsDisplayType="organizationsResultDisplayLayout" />
      </div>

      <div className={styles.filtersAndResultsContainer}>
        <div className={styles.results}>
          <OrganizationHorizontalFiltersTemplate />

          {getOrganisations.data?.results?.length === 0 && !getOrganisations.isLoading && (
            <span>{t("No organizations found")}</span>
          )}

          {getOrganisations.data?.results && getOrganisations.data?.results?.length > 0 && (
            <>
              <OrganizationDisplayTemplate
                organizations={getOrganisations.data.results}
                type={filters.organizationsResultDisplayLayout}
              />

              {getOrganisations.data.results.length && (
                <PaginatedItems
                  pages={getOrganisations.data.pages}
                  currentPage={getOrganisations.data.page}
                  setPage={(page) => setFilters({ ...filters, organizationCurrentPage: page })}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={marginPagesDisplayed}
                  containerClassName={styles.paginationContainer}
                  pageClassName={
                    getOrganisations.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink
                  }
                  previousClassName={
                    getOrganisations.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink
                  }
                  nextClassName={
                    getOrganisations.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink
                  }
                  activeClassName={
                    getOrganisations.data.pages > 1000 ? styles.paginationActivePageSmall : styles.paginationActivePage
                  }
                  disabledClassName={styles.paginationDisabled}
                  breakClassName={styles.breakLink}
                />
              )}
            </>
          )}
          {getOrganisations.isLoading && <Skeleton height="200px" />}
        </div>
      </div>
    </Container>
  );
};
