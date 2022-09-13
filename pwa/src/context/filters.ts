import * as React from "react";

export type TComponentResultsLayout = "table" | "cards" | "layer";
export type TComponentDependenciesLayout = "layer" | "network";

export interface IFilters {
  resultDisplayLayout: TComponentResultsLayout;
  dependenciesDisplayLayout: TComponentDependenciesLayout;
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

export const filters = { resultDisplayLayout: "table", dependenciesDisplayLayout: "layer", currentPage: 1 } as IFilters;

export const FiltersContext = React.createContext<[IFilters, (data: IFilters) => void]>([filters, () => null]);

export const FiltersProvider = FiltersContext.Provider;
