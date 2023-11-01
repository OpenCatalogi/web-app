import * as React from "react";
import { defaultGatsbyContext, IGatsbyContext } from "./gatsby";
import { defaultFiltersContext, IFiltersContext } from "./filters";
import { defaultPaginationContext, IPaginationContext } from "./pagination";
import { defaultQueryLimitContext, IQueryLimitContext } from "./queryLimit";

export interface IGlobalContext {
  initiated: boolean;
  gatsby: IGatsbyContext;
  filters: IFiltersContext;
  pagination: IPaginationContext;
  queryLimit: IQueryLimitContext;
}

export const defaultGlobalContext: IGlobalContext = {
  initiated: false,
  gatsby: defaultGatsbyContext,
  filters: defaultFiltersContext,
  pagination: defaultPaginationContext,
  queryLimit: defaultQueryLimitContext,
};

export const GlobalContext = React.createContext<
  [IGlobalContext, React.Dispatch<React.SetStateAction<IGlobalContext>>]
>([defaultGlobalContext, () => null]);

export const GlobalProvider = GlobalContext.Provider;
