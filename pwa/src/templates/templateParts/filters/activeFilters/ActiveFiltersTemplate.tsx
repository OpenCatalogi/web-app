import * as React from "react";
import * as styles from "./ActiveFiltersTemplate.module.css";
import { useFiltersContext } from "../../../../context/filters";
import _ from "lodash";
import { maintenanceTypes, statuses, applicatiefuncties, referentieComponenten } from "../../../../data/filters";
import { useTranslation } from "react-i18next";
import { DataBadge, Heading } from "@utrecht/component-library-react/dist/css-module";
import { getSoftwareTypeLabel } from "../../../../services/getSoftwareTypeLabel";

export const ActiveFiltersTemplate: React.FC = () => {
  const { filters, setFilters } = useFiltersContext();
  const { t } = useTranslation();

  const status = statuses.find((status) => {
    return status.value === filters?.developmentStatus;
  });

  const maintenanceType = maintenanceTypes.find((maintenanceType) => {
    return maintenanceType.value === filters["embedded.maintenance.type"];
  });

  const applicatiefunctie = applicatiefuncties.find((applicatiefunctie) => {
    return applicatiefunctie.value === filters["embedded.nl.embedded.gemma.applicatiefunctie"];
  });

  const _referentieComponenten = filters["embedded.nl.embedded.gemma.referentieComponenten"]?.map((filter) => {
    return referentieComponenten.find((referentieComponent) => {
      return referentieComponent.value === filter;
    });
  });

  const clearFilters = () => {
    setFilters({
      ...filters,
      _search: "",
      softwareType: undefined,
      developmentStatus: undefined,
      platforms: [],
      category: "",
      "embedded.nl.embedded.commonground.layerType": [],
      "embedded.nl.embedded.gemma.bedrijfsfuncties": [],
      "embedded.nl.embedded.gemma.bedrijfsservices": [],
      "embedded.nl.embedded.gemma.referentieComponenten": [],
      "embedded.nl.embedded.gemma.applicatiefunctie": "",
      "embedded.nl.embedded.upl": [],
      "embedded.maintenance.type": undefined,
      "embedded.legal.license": "",
      "embedded.legal.mainCopyrightOwner": "",
      "embedded.url.embedded.organisation.name": "",
    });
  };

  return (
    <div>
      <div className={styles.activeFiltersHeader}>
        <Heading level={4}>Actieve Filters</Heading>
        <DataBadge className={styles.onClickActiveFiltersButton} onClick={clearFilters}>
          Alle filters wissen
        </DataBadge>
      </div>
      <div className={styles.activeFilters}>
        {filters._search && (
          <DataBadge onClick={() => setFilters({ ...filters, _search: "" })}>{`${t("Search term")}: ${
            filters._search
          }`}</DataBadge>
        )}

        {filters["embedded.nl.embedded.commonground.layerType"]?.map((layer, idx) => (
          <DataBadge
            key={idx}
            onClick={() =>
              setFilters({
                ...filters,
                "embedded.nl.embedded.commonground.layerType":
                  filters["embedded.nl.embedded.commonground.layerType"] &&
                  filters["embedded.nl.embedded.commonground.layerType"].filter((e) => e !== layer),
              })
            }
          >
            {t(_.upperFirst(layer))}
          </DataBadge>
        ))}

        {filters["embedded.nl.embedded.upl"]?.map((layer, idx) => (
          <DataBadge
            key={idx}
            onClick={() =>
              setFilters({
                ...filters,
                "embedded.nl.embedded.upl":
                  filters["embedded.nl.embedded.upl"] && filters["embedded.nl.embedded.upl"].filter((e) => e !== layer),
              })
            }
          >
            {_.upperFirst(layer)}
          </DataBadge>
        ))}

        {filters["embedded.url.embedded.organisation.name"] && (
          <DataBadge onClick={() => setFilters({ ...filters, "embedded.url.embedded.organisation.name": undefined })}>
            {filters["embedded.url.embedded.organisation.name"] ?? ""}
          </DataBadge>
        )}

        {filters.category && (
          <DataBadge onClick={() => setFilters({ ...filters, category: undefined })}>
            {_.upperFirst(filters.category) ?? ""}
          </DataBadge>
        )}

        {filters.platforms?.map((layer, idx) => (
          <DataBadge
            key={idx}
            onClick={() =>
              setFilters({
                ...filters,
                platforms: filters.platforms && filters.platforms.filter((e) => e !== layer),
              })
            }
          >
            {t(_.upperFirst(layer))}
          </DataBadge>
        ))}

        {filters.developmentStatus && (
          <DataBadge onClick={() => setFilters({ ...filters, developmentStatus: undefined })}>
            {t(status?.label ?? "")}
          </DataBadge>
        )}

        {filters["embedded.maintenance.type"] && (
          <DataBadge onClick={() => setFilters({ ...filters, "embedded.maintenance.type": undefined })}>
            {maintenanceType?.label ?? ""}
          </DataBadge>
        )}

        {filters.softwareType && (
          <DataBadge onClick={() => setFilters({ ...filters, softwareType: undefined })}>
            {getSoftwareTypeLabel(filters.softwareType)}
          </DataBadge>
        )}

        {filters["embedded.legal.license"] && (
          <DataBadge onClick={() => setFilters({ ...filters, "embedded.legal.license": undefined })}>
            {filters["embedded.legal.license"] ?? ""}
          </DataBadge>
        )}

        {filters["embedded.nl.embedded.gemma.bedrijfsfuncties"]?.map((layer, idx) => (
          <DataBadge
            key={idx}
            onClick={() =>
              setFilters({
                ...filters,
                "embedded.nl.embedded.gemma.bedrijfsfuncties":
                  filters["embedded.nl.embedded.gemma.bedrijfsfuncties"] &&
                  filters["embedded.nl.embedded.gemma.bedrijfsfuncties"].filter((e) => e !== layer),
              })
            }
          >
            {t(_.upperFirst(layer))}
          </DataBadge>
        ))}

        {filters["embedded.nl.embedded.gemma.bedrijfsservices"]?.map((layer, idx) => (
          <DataBadge
            key={idx}
            onClick={() =>
              setFilters({
                ...filters,
                "embedded.nl.embedded.gemma.bedrijfsservices":
                  filters["embedded.nl.embedded.gemma.bedrijfsservices"] &&
                  filters["embedded.nl.embedded.gemma.bedrijfsservices"].filter((e) => e !== layer),
              })
            }
          >
            {t(_.upperFirst(layer))}
          </DataBadge>
        ))}
        {_referentieComponenten?.map((layer, idx) => (
          <DataBadge
            key={idx}
            onClick={() =>
              setFilters({
                ...filters,
                "embedded.nl.embedded.gemma.referentieComponenten":
                  filters["embedded.nl.embedded.gemma.referentieComponenten"] &&
                  filters["embedded.nl.embedded.gemma.referentieComponenten"].filter((e) => e !== layer?.value),
              })
            }
          >
            {layer?.label ?? ""}
          </DataBadge>
        ))}

        {filters["embedded.nl.embedded.gemma.applicatiefunctie"] && (
          <DataBadge onClick={() => setFilters({ ...filters, "embedded.nl.embedded.gemma.applicatiefunctie": "" })}>
            {applicatiefunctie?.label ?? ""}
          </DataBadge>
        )}
      </div>
    </div>
  );
};
