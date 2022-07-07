import * as React from "react";

export interface IFilters {
  name?: string;
  layers?: Array<string | undefined>;
}

export const filters = {} as IFilters;

export const FiltersContext = React.createContext<[IFilters, (data: IFilters) => void]>([filters, () => null]);

export const FiltersProvider = FiltersContext.Provider;
