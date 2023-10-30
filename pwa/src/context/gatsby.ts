import * as React from "react";
import { GlobalContext } from "./global";

export type TScreenSize = "mobile" | "tablet" | "desktop";

export interface IGatsbyContext {
  pageContext: any;
  location: any;
  screenSize: TScreenSize;
}

export const defaultGatsbyContext: IGatsbyContext = {
  pageContext: null,
  location: null,
  screenSize: "mobile",
};

export const useGatsbyContext = () => {
  const [globalContext] = React.useContext(GlobalContext);

  const gatsbyContext: IGatsbyContext = globalContext.gatsby;

  return gatsbyContext;
};
