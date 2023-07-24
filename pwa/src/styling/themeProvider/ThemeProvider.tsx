import * as React from "react";
import "./../../styling/design-tokens/component-overrides.css";
import { Document } from "@utrecht/component-library-react/dist/css-module";

export const ThemeProvider = ({ children }: React.PropsWithChildren<object>): JSX.Element => {
  React.useEffect(() => {
    const link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = `/themes/${process.env.GATSBY_NL_DESIGN_THEME_CLASSNAME}.css`;

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return <Document className={`${process.env.GATSBY_NL_DESIGN_THEME_CLASSNAME}-theme`}>{children}</Document>;
};
