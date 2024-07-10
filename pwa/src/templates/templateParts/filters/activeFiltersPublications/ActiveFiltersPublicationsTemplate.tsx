import * as React from "react";
import * as styles from "./ActiveFiltersPublicationsTemplate.module.css";
import _ from "lodash";
import { usePublicationFiltersContext } from "../../../../context/publicationFilters";
import { useTranslation } from "react-i18next";
import { DataBadge, Heading } from "@utrecht/component-library-react/dist/css-module";

export const ActiveFiltersPublicationsTemplate: React.FC = () => {
  const { publicationFilters, setPublicationFilters } = usePublicationFiltersContext();
  const { t } = useTranslation();

  const clearFilters = () => {
    setPublicationFilters({
      ...publicationFilters,
      _search: "",
      status: undefined,
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
        {publicationFilters._search && (
          <DataBadge onClick={() => setPublicationFilters({ ...publicationFilters, _search: "" })}>{`${t(
            "Search term",
          )}: ${publicationFilters._search}`}</DataBadge>
        )}
        {publicationFilters.status && (
          <DataBadge onClick={() => setPublicationFilters({ ...publicationFilters, status: undefined })}>
            {t(_.upperFirst(publicationFilters.status))}
          </DataBadge>
        )}
      </div>
    </div>
  );
};
