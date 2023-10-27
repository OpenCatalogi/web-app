import * as React from "react";

export type TComponentResultsLayout = "table" | "cards" | "layer";
export type TComponentDependenciesLayout = "layer" | "relations";
export type TLandingDisplayLayout = "layer" | "cards";
export type TCatagoryDisplayLayout = "table" | "cards" | "layer";
export type TOrganizationsResultDisplayLayout = "table" | "cards";

export interface IFilters {
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
  "embedded.nl.embedded.gemma.applicatiefunctie": string;
  "embedded.nl.embedded.upl"?: string[];
  "embedded.maintenance.type"?: string;
  "embedded.legal.license"?: string;
  "embedded.legal.mainCopyrightOwner"?: string;
  "embedded.url.embedded.organisation.name"?: string;

  showMoreControl?: boolean;
  showMoreSupport?: boolean;
}

export const baseFilters = {
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
} as IFilters;

export const FiltersContext = React.createContext<[IFilters, (_: IFilters) => void]>([baseFilters, () => null]);

export const FiltersProvider = FiltersContext.Provider;
