import * as React from "react";
import { GlobalContext } from "./global";

export const QUERY_LIMIT_DEFAULT = 10;

export interface IQueryLimitContext {
  previousComponentsSearchQueryLimit: number;
  componentsSearchQueryLimit: number;
  organizationsQueryLimit: number;
  applicationsQueryLimit: number;
}

export const defaultQueryLimitContext: IQueryLimitContext = {
  previousComponentsSearchQueryLimit: QUERY_LIMIT_DEFAULT,
  componentsSearchQueryLimit: QUERY_LIMIT_DEFAULT,
  organizationsQueryLimit: QUERY_LIMIT_DEFAULT,
  applicationsQueryLimit: QUERY_LIMIT_DEFAULT,
};

export const useQueryLimitContext = () => {
  const [globalContext, setGlobalContext] = React.useContext(GlobalContext);

  const queryLimit: IQueryLimitContext = globalContext.queryLimit;

  const setQueryLimit = (query: IQueryLimitContext) => {
    setGlobalContext((context) => ({ ...context, queryLimit: { ...globalContext.queryLimit, ...query } }));
  };

  return { setQueryLimit, queryLimit };
};
