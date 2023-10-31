import * as React from "react";
import { GlobalContext } from "./global";

export interface IPaginationContext {
  currentPage: number;
}

export const defaultPaginationContext: IPaginationContext = {
  currentPage: 1,
};

export const usePaginationContext = () => {
  const [globalContext, setGlobalContext] = React.useContext(GlobalContext);
  const pagination: IPaginationContext = globalContext.pagination;

  const setPagination = (newFilters: IPaginationContext) => {
    setGlobalContext((context) => ({ ...context, pagination: { ...globalContext.pagination, ...newFilters } }));
  };

  return { pagination, setPagination };
};
