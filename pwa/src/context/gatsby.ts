import * as React from "react";

export type TScreenSize = "mobile" | "tablet" | "desktop";

export interface IGatsbyContext {
  pageContext: any;
  location: any;
  screenSize: TScreenSize;
}

export const GatsbyContext = React.createContext<IGatsbyContext>({
	pageContext: null,
	location: null,
	screenSize: "mobile",
});

export const GatsbyProvider = GatsbyContext.Provider;
