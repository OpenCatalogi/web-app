import * as React from "react";
import { GlobalContext } from "./global";

export type TComponentResultsLayout = "table" | "cards" | "layer";
export type TComponentDependenciesLayout = "layer" | "relations";
export type TLandingDisplayLayout = "layer" | "cards";
export type TCatagoryDisplayLayout = "table" | "cards" | "layer";
export type TOrganizationsResultDisplayLayout = "table" | "cards";

export interface IResultDisplayLayoutContext {
  componentsDisplayLayout: TComponentResultsLayout;
  dependenciesDisplayLayout: TComponentDependenciesLayout;
  landingDisplayLayout: TLandingDisplayLayout;
  catagoryDisplayLayout: TCatagoryDisplayLayout;
  organizationsResultDisplayLayout: TOrganizationsResultDisplayLayout;
}

export const defaultResultDisplayLayoutContext: IResultDisplayLayoutContext = {
  componentsDisplayLayout: "table",
  dependenciesDisplayLayout: "layer",
  landingDisplayLayout: "cards",
  catagoryDisplayLayout: "table",
  organizationsResultDisplayLayout: "cards",
};

export const useResultDisplayLayoutContext = () => {
  const [globalContext, setGlobalContext] = React.useContext(GlobalContext);

  const resultDisplayLayout: IResultDisplayLayoutContext = globalContext.resultDisplayLayout;

  const setResultDisplayLayout = (query: IResultDisplayLayoutContext) => {
    setGlobalContext((context) => ({
      ...context,
      resultDisplayLayout: { ...globalContext.resultDisplayLayout, ...query },
    }));
  };

  return { setResultDisplayLayout, resultDisplayLayout };
};
