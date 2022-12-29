import * as React from "react";
import * as styles from "./ActiveFiltersTemplate.module.css";
import { FiltersContext } from "../../../../context/filters";
import _ from "lodash";
import {
  maintenanceTypes,
  softwareTypes,
  licenses,
  statuses,
  applicatiefuncties,
  referentieComponenten,
  categories,
} from "../../../../data/filters";
import { Heading4 } from "@gemeente-denhaag/components-react";
import { Tag } from "@conduction/components";
import { useTranslation } from "react-i18next";

export const ActiveFiltersTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

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

  const _referentieComponenten = filters["nl.gemma.referentieComponenten"]?.map((filter) => {
    return referentieComponenten.find((referentieComponent) => {
      return referentieComponent.value === filter;
    });
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
      "url.organisation.name": "",
    });
  };

  return (
    <div>
      <div className={styles.activeFiltersHeader}>
        <Heading4>Actieve Filters</Heading4>
        <Tag layoutClassName={styles.removeActiveFiltersButton} label="Alles wissen" onClick={clearFilters} />
      </div>
      <div className={styles.activeFilters}>
        {filters._search && (
          <Tag
            label={`${t("Search term")}: ${filters._search}`}
            remove={() => setFilters({ ...filters, _search: "" })}
          />
        )}

        {filters["nl.commonground.layerType"]?.map((layer, idx) => (
          <Tag
            key={idx}
            label={t(_.upperFirst(layer))}
            remove={() =>
              setFilters({
                ...filters,
                "nl.commonground.layerType":
                  filters["nl.commonground.layerType"] &&
                  filters["nl.commonground.layerType"].filter((e) => e !== layer),
              })
            }
          />
        ))}

        {filters["nl.upl"]?.map((layer, idx) => (
          <Tag
            key={idx}
            label={_.upperFirst(layer)}
            remove={() =>
              setFilters({
                ...filters,
                "nl.upl": filters["nl.upl"] && filters["nl.upl"].filter((e) => e !== layer),
              })
            }
          />
        ))}

        {filters["url.organisation.name"] && (
          <Tag
            label={filters["url.organisation.name"] ?? ""}
            remove={() => setFilters({ ...filters, "url.organisation.name": undefined })}
          />
        )}

        {filters.category && (
          <Tag label={category?.label ?? ""} remove={() => setFilters({ ...filters, category: undefined })} />
        )}

        {filters.platforms?.map((layer, idx) => (
          <Tag
            key={idx}
            label={t(_.upperFirst(layer))}
            remove={() =>
              setFilters({
                ...filters,
                platforms: filters.platforms && filters.platforms.filter((e) => e !== layer),
              })
            }
          />
        ))}

        {filters.developmentStatus && (
          <Tag label={status?.label ?? ""} remove={() => setFilters({ ...filters, developmentStatus: undefined })} />
        )}

        {filters["maintenance.type"] && (
          <Tag
            label={maintenanceType?.label ?? ""}
            remove={() => setFilters({ ...filters, "maintenance.type": undefined })}
          />
        )}

        {filters.softwareType && (
          <Tag label={softwareType?.label ?? ""} remove={() => setFilters({ ...filters, softwareType: undefined })} />
        )}

        {filters["legal.license"] && (
          <Tag label={licence?.label ?? ""} remove={() => setFilters({ ...filters, "legal.license": undefined })} />
        )}

        {filters["nl.gemma.bedrijfsfuncties"]?.map((layer, idx) => (
          <Tag
            key={idx}
            label={t(_.upperFirst(layer))}
            remove={() =>
              setFilters({
                ...filters,
                "nl.gemma.bedrijfsfuncties":
                  filters["nl.gemma.bedrijfsfuncties"] &&
                  filters["nl.gemma.bedrijfsfuncties"].filter((e) => e !== layer),
              })
            }
          />
        ))}

        {filters["nl.gemma.bedrijfsservices"]?.map((layer, idx) => (
          <Tag
            key={idx}
            label={t(_.upperFirst(layer))}
            remove={() =>
              setFilters({
                ...filters,
                "nl.gemma.bedrijfsservices":
                  filters["nl.gemma.bedrijfsservices"] &&
                  filters["nl.gemma.bedrijfsservices"].filter((e) => e !== layer),
              })
            }
          />
        ))}
        {_referentieComponenten?.map((layer, idx) => (
          <Tag
            key={idx}
            label={layer?.label ?? ""}
            remove={() =>
              setFilters({
                ...filters,
                "nl.gemma.referentieComponenten":
                  filters["nl.gemma.referentieComponenten"] &&
                  filters["nl.gemma.referentieComponenten"].filter((e) => e !== layer?.value),
              })
            }
          />
        ))}

        {filters["nl.gemma.applicatiefunctie"] && (
          <Tag
            label={applicatiefunctie?.label ?? ""}
            remove={() => setFilters({ ...filters, "nl.gemma.applicatiefunctie": "" })}
          />
        )}
      </div>
    </div>
  );
};
