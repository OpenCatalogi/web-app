import * as React from "react";
import { GlobalContext } from "./global";

export interface IPaginationContext {
  componentsCurrentPage: number;
  organizationCurrentPage: number;
  applicationCurrentPage: number;
}

export const defaultPaginationContext: IPaginationContext = {
  componentsCurrentPage: 1,
  organizationCurrentPage: 1,
  applicationCurrentPage: 1,
};

export const usePaginationContext = () => {
  const [globalContext, setGlobalContext] = React.useContext(GlobalContext);
  const pagination: IPaginationContext = globalContext.pagination;

  const setPagination = (newFilters: IPaginationContext) => {
    setGlobalContext((context) => ({ ...context, pagination: { ...globalContext.pagination, ...newFilters } }));
  };

  return { pagination, setPagination };
};
