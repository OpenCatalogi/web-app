import * as React from "react";
import { GlobalContext } from "./global";
import { getParsedParamsFromSearch } from "../services/getParsedParamsFromSearch";
import { navigate } from "gatsby";
import { filtersToUrlQueryParams } from "../services/filtersToQueryParams";

export type TComponentResultsLayout = "table" | "cards" | "layer";
export type TComponentDependenciesLayout = "layer" | "relations";
export type TLandingDisplayLayout = "layer" | "cards";
export type TCatagoryDisplayLayout = "table" | "cards" | "layer";
export type TOrganizationsResultDisplayLayout = "table" | "cards";

export interface IFiltersContext {
  resultDisplayLayout: TComponentResultsLayout;
  dependenciesDisplayLayout: TComponentDependenciesLayout;
  landingDisplayLayout: TLandingDisplayLayout;
  catagoryDisplayLayout: TCatagoryDisplayLayout;
  currentPage: number;
  applicationsCurrentPage: number;
  isForked: boolean;

  organizationCurrentPage: number;
  organizationsResultDisplayLayout: TOrganizationsResultDisplayLayout;
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
  resultDisplayLayout: "table",
  dependenciesDisplayLayout: "layer",
  landingDisplayLayout: "cards",
  catagoryDisplayLayout: "table",
  organizationsResultDisplayLayout: "table",
  currentPage: 1,
  applicationsCurrentPage: 1,
  organizationCurrentPage: 1,
  _search: "",
  organizationSearch: "",
  isForked: true,
  developmentStatus: "hideObsolete",
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
