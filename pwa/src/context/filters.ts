import * as React from "react";

export type TComponentResultsLayout = "table" | "cards" | "layer";

export interface IFilters {
  name?: string;
  layers?: Array<string | undefined>;
  resultDisplayLayout: TComponentResultsLayout;
}

export const filters = { resultDisplayLayout: "table" } as IFilters;

export const FiltersContext = React.createContext<[IFilters, (data: IFilters) => void]>([filters, () => null]);

export const FiltersProvider = FiltersContext.Provider;
