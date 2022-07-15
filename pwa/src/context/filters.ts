import * as React from "react";

export type TComponentResultsLayout = "table" | "cards" | "layer";

export interface IFilters {
  resultDisplayLayout: TComponentResultsLayout;
  name?: string;
  layerType?: Array<string | undefined>;
  upl?: string;
  platforms?: string[];
  softwareType?: string;
  maintenance?: {
    type?: string;
  };
  legal?: {
    license?: string;
  };
}

export const filters = { resultDisplayLayout: "table" } as IFilters;

export const FiltersContext = React.createContext<[IFilters, (data: IFilters) => void]>([filters, () => null]);

export const FiltersProvider = FiltersContext.Provider;
