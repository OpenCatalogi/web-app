import * as React from "react";

export type TComponentResultsLayout = "table" | "cards" | "layer";

export interface IFilters {
  resultDisplayLayout: TComponentResultsLayout;
  currentPage: number;
  name?: string;
  layerType?: string[];
  platforms?: string[];
  bedrijfsfuncties?: string[];
  bedrijfsservices?: string[];
  referentieComponenten?: string[];
  applicatiefunctie: string;
  softwareType?: string;
  status?: string;
  maintenance?: {
    type?: string;
  };
  legal?: {
    license?: string;
  };
  nl?: {
    upl?: string[];
  };
}

export const filters = { resultDisplayLayout: "table", currentPage: 1 } as IFilters;

export const FiltersContext = React.createContext<[IFilters, (data: IFilters) => void]>([filters, () => null]);

export const FiltersProvider = FiltersContext.Provider;
