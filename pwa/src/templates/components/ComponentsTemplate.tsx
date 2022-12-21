import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { Button, Heading2, Heading4 } from "@gemeente-denhaag/components-react";
import { Container } from "@conduction/components";
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
import { GatsbyContext } from "../../context/gatsby";
import { PaginatedItems } from "../../components/pagination/pagination";
import { useSearch } from "../../hooks/search";
import { Tag } from "../../components/tag/Tag";
import {
  maintenanceTypes,
  softwareTypes,
  licenses,
  statuses,
  applicatiefuncties,
  referentieComponenten,
  categories,
} from "./../../data/filters";

export const ComponentsTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();
  const { screenSize } = React.useContext(GatsbyContext);
  const [marginPagesDisplayed, setMarginPageDisplayed] = React.useState<number>(3);

  const queryClient = new QueryClient();
  const _useSearch = useSearch(queryClient);
  const getComponents = _useSearch.getSearch({ ...filters, resultDisplayLayout: "table" }); // Ensure no refetch on resultDisplayLayout change

  React.useEffect(() => {
    if (getComponents.isSuccess && screenSize === "mobile") {
      setMarginPageDisplayed(2);
    }
    if (getComponents.isSuccess && screenSize === "mobile" && getComponents.data.pages > 100) {
      setMarginPageDisplayed(1);
    }
    if (getComponents.isSuccess && screenSize !== "mobile") {
      setMarginPageDisplayed(3);
    }
  }, [getComponents]);

  const category = categories.find((category) => {
    return category.value === filters?.category;
  });

  const status = statuses.find((status) => {
    return status.value === filters?.developmentStatus;
  });

  const maintenanceType = maintenanceTypes.find((maintenanceType) => {
    return maintenanceType.value === filters["maintenance.type"];
  });

  const softwareType = softwareTypes.find((softwareType) => {
    return softwareType.value === filters.softwareType;
  });

  const licence = licenses.find((licence) => {
    return licence.value === filters["legal.license"];
  });

  const applicatiefunctie = applicatiefuncties.find((applicatiefunctie) => {
    return applicatiefunctie.value === filters["nl.gemma.applicatiefunctie"];
  });

  const _referentieComponenten = referentieComponenten.find((referentieComponent) => {
    return referentieComponent.value === filters["nl.gemma.applicatiefunctie"];
  });

  const clearFilters = () => {
    setFilters({
      ...filters,
      _search: "",
      softwareType: "",
      developmentStatus: "",
      platforms: [],
      category: "",
      "nl.commonground.layerType": [],
      "nl.gemma.bedrijfsfuncties": [],
      "nl.gemma.bedrijfsservices": [],
      "nl.gemma.referentieComponenten": [],
      "nl.gemma.applicatiefunctie": "",
      "nl.upl": [],
      "maintenance.type": "",
      "legal.license": "",
      "legal.mainCopyrightOwner": "",
    });
  };

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
        <VerticalFiltersTemplate filterSet={[filters]} layoutClassName={styles.verticalFilters} />

        <div className={styles.results}>
          <HorizontalFiltersTemplate />

          <div>
            <div className={styles.activeFiltersHeader}>
              <Heading4>Actieve Filters</Heading4>
              <Tag layoutClassName={styles.removeActiveFiltersButton} label="Alles wissen" onClick={clearFilters} />
            </div>
            <div className={styles.activeFilters}>
              {filters["nl.commonground.layerType"]?.map((layer, idx) => (
                <Tag
                  key={idx}
                  label={t(_.upperFirst(layer))}
                  remove={{
                    onClick: () =>
                      setFilters({
                        ...filters,
                        "nl.commonground.layerType":
                          filters["nl.commonground.layerType"] &&
                          filters["nl.commonground.layerType"].filter((e) => e !== layer),
                      }),
                  }}
                />
              ))}

              {filters["nl.upl"]?.map((layer, idx) => (
                <Tag
                  key={idx}
                  label={_.upperFirst(layer)}
                  remove={{
                    onClick: () =>
                      setFilters({
                        ...filters,
                        "nl.upl": filters["nl.upl"] && filters["nl.upl"].filter((e) => e !== layer),
                      }),
                  }}
                />
              ))}

              {filters.category && (
                <Tag
                  label={category?.label ?? ""}
                  remove={{ onClick: () => setFilters({ ...filters, category: undefined }) }}
                />
              )}

              {filters.platforms?.map((layer, idx) => (
                <Tag
                  key={idx}
                  label={t(_.upperFirst(layer))}
                  remove={{
                    onClick: () =>
                      setFilters({
                        ...filters,
                        platforms: filters.platforms && filters.platforms.filter((e) => e !== layer),
                      }),
                  }}
                />
              ))}

              {filters.developmentStatus && (
                <Tag
                  label={status?.label ?? ""}
                  remove={{ onClick: () => setFilters({ ...filters, developmentStatus: undefined }) }}
                />
              )}

              {filters["maintenance.type"] && (
                <Tag
                  label={maintenanceType?.label ?? ""}
                  remove={{ onClick: () => setFilters({ ...filters, "maintenance.type": undefined }) }}
                />
              )}

              {filters.softwareType && (
                <Tag
                  label={softwareType?.label ?? ""}
                  remove={{ onClick: () => setFilters({ ...filters, softwareType: undefined }) }}
                />
              )}

              {filters["legal.license"] && (
                <Tag
                  label={licence?.label ?? ""}
                  remove={{ onClick: () => setFilters({ ...filters, "legal.license": undefined }) }}
                />
              )}

              {filters["nl.gemma.bedrijfsfuncties"]?.map((layer, idx) => (
                <Tag
                  key={idx}
                  label={t(_.upperFirst(layer))}
                  remove={{
                    onClick: () =>
                      setFilters({
                        ...filters,
                        "nl.gemma.bedrijfsfuncties":
                          filters["nl.gemma.bedrijfsfuncties"] &&
                          filters["nl.gemma.bedrijfsfuncties"].filter((e) => e !== layer),
                      }),
                  }}
                />
              ))}

              {filters["nl.gemma.bedrijfsservices"]?.map((layer, idx) => (
                <Tag
                  key={idx}
                  label={t(_.upperFirst(layer))}
                  remove={{
                    onClick: () =>
                      setFilters({
                        ...filters,
                        "nl.gemma.bedrijfsservices":
                          filters["nl.gemma.bedrijfsservices"] &&
                          filters["nl.gemma.bedrijfsservices"].filter((e) => e !== layer),
                      }),
                  }}
                />
              ))}
              {filters["nl.gemma.referentieComponenten"]?.map((layer, idx) => (
                <Tag
                  key={idx}
                  label={t(_.upperFirst(layer))}
                  remove={{
                    onClick: () =>
                      setFilters({
                        ...filters,
                        "nl.gemma.referentieComponenten":
                          filters["nl.gemma.referentieComponenten"] &&
                          filters["nl.gemma.referentieComponenten"].filter((e) => e !== layer),
                      }),
                  }}
                />
              ))}

              {filters["nl.gemma.applicatiefunctie"] && (
                <Tag
                  label={applicatiefunctie?.label ?? ""}
                  remove={{ onClick: () => setFilters({ ...filters, "nl.gemma.applicatiefunctie": "" }) }}
                />
              )}
            </div>
          </div>

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
                  marginPagesDisplayed={marginPagesDisplayed}
                  containerClassName={styles.paginationContainer}
                  pageClassName={getComponents.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink}
                  previousClassName={
                    getComponents.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink
                  }
                  nextClassName={getComponents.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink}
                  activeClassName={
                    getComponents.data.pages > 1000 ? styles.paginationActivePageSmall : styles.paginationActivePage
                  }
                  disabledClassName={styles.paginationDisabled}
                  breakClassName={styles.breakLink}
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
