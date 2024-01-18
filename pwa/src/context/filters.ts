import * as React from "react";
import { GlobalContext } from "./global";

export interface IFiltersContext {
  isForked: boolean;
  organizationSearch?: string;

  _search?: string;
  softwareType?: string;
  developmentStatus?: string;
  platforms?: string[];
  category?: string;
  "embedded.nl.embedded.commonground.layerType"?: string[];
  "embedded.nl.embedded.gemma.bedrijfsfuncties"?: string[];
  "embedded.nl.embedded.gemma.bedrijfsservices"?: string[];
  "embedded.nl.embedded.gemma.referentieComponenten"?: string[];
  "embedded.nl.embedded.gemma.applicatiefunctie"?: string;
  "embedded.nl.embedded.upl"?: string[];
  "embedded.maintenance.type"?: string;
  "embedded.legal.license"?: string;
  "embedded.legal.mainCopyrightOwner"?: string;
  "embedded.url.embedded.organisation.name"?: string;

  showMoreControl?: boolean;
  showMoreSupport?: boolean;
}

export const defaultFiltersContext: IFiltersContext = {
  _search: "",
  organizationSearch: "",
  isForked: true,
  developmentStatus: "stable",
};

export const useFiltersContext = () => {
  const [globalContext, setGlobalContext] = React.useContext(GlobalContext);

  const filters: IFiltersContext = globalContext.filters;

  const setFilters = (newFilters: IFiltersContext) => {
    setGlobalContext((oldGlobalContext) => ({
      ...oldGlobalContext,
      filters: newFilters,
    }));
  };

  return { setFilters, filters };
};
