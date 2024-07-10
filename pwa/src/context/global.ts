import * as React from "react";
import { defaultGatsbyContext, IGatsbyContext } from "./gatsby";
import { defaultFiltersContext, IFiltersContext } from "./filters";
import { defaultPaginationContext, IPaginationContext } from "./pagination";
import { defaultQueryLimitContext, IQueryLimitContext } from "./queryLimit";
import { defaultResultDisplayLayoutContext, IResultDisplayLayoutContext } from "./resultDisplayLayout";
import { defaultPublicationFiltersContext, IPublicationFiltersContext } from "./publicationFilters";

export interface IGlobalContext {
  initiated: boolean;
  gatsby: IGatsbyContext;
  filters: IFiltersContext;
  publicationFilters: IPublicationFiltersContext;
  pagination: IPaginationContext;
  queryLimit: IQueryLimitContext;
  resultDisplayLayout: IResultDisplayLayoutContext;
}

export const defaultGlobalContext: IGlobalContext = {
  initiated: false,
  gatsby: defaultGatsbyContext,
  filters: defaultFiltersContext,
  publicationFilters: defaultPublicationFiltersContext,
  pagination: defaultPaginationContext,
  queryLimit: defaultQueryLimitContext,
  resultDisplayLayout: defaultResultDisplayLayoutContext,
};

export const GlobalContext = React.createContext<
  [IGlobalContext, React.Dispatch<React.SetStateAction<IGlobalContext>>]
>([defaultGlobalContext, () => null]);

export const GlobalProvider = GlobalContext.Provider;
