import * as React from "react";

export type TComponentResultsLayout = "table" | "cards" | "layer";
export type TComponentDependenciesLayout = "layer" | "relations";
export type TLandingDisplayLayout = "layer" | "cards";
export type TCatagoryDisplayLayout = "table" | "cards" | "layer";

export interface IFilters {
  resultDisplayLayout: TComponentResultsLayout;
  dependenciesDisplayLayout: TComponentDependenciesLayout;
  landingDisplayLayout: TLandingDisplayLayout;
  catagoryDisplayLayout: TCatagoryDisplayLayout;
  currentPage: number;
  applicationsCurrentPage: number;

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
  currentPage: 1,
  applicationsCurrentPage: 1,
} as IFilters;

export const FiltersContext = React.createContext<[IFilters, (data: IFilters) => void]>([baseFilters, () => null]);

export const FiltersProvider = FiltersContext.Provider;
