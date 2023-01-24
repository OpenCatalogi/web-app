import * as React from "react";

export type TComponentResultsLayout = "table" | "cards" | "layer";
export type TLandingDisplayLayout = "layer" | "categories";
export type TComponentDependenciesLayout = "layer" | "relations";

export interface IFilters {
  resultDisplayLayout: TComponentResultsLayout;
  dependenciesDisplayLayout: TComponentDependenciesLayout;
  landingDisplayLayout: TLandingDisplayLayout;
  currentPage: number;

  search?: string;
  softwareType?: string;
  developmentStatus?: string;
  platforms?: string[];
  category?: string;
  "nl.commonground.layerType"?: string[];
  "nl.gemma.bedrijfsfuncties"?: string[];
  "nl.gemma.bedrijfsservices"?: string[];
  "nl.gemma.referentieComponenten"?: string[];
  "nl.gemma.applicatiefunctie": string;
  "nl.upl"?: string[];
  "maintenance.type"?: string;
  "legal.license"?: string;
  "legal.mainCopyrightOwner"?: string;
}

export const baseFilters = {
  resultDisplayLayout: "table",
  dependenciesDisplayLayout: "layer",
  landingDisplayLayout: "categories",
  currentPage: 1,
} as IFilters;

export const FiltersContext = React.createContext<[IFilters, (data: IFilters) => void]>([baseFilters, () => null]);

export const FiltersProvider = FiltersContext.Provider;
