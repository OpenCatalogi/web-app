import * as React from "react";
import "../styling/index.css";
import { Helmet } from "react-helmet";
import { useInitCssVariables } from "../hooks/initCssVariables";

export const Head: React.FC = () => {
  const theme = process.env.GATSBY_NL_DESIGN_THEME_CLASSNAME ?? "conduction-theme";
  useInitCssVariables(theme);

  return (
    <Helmet
      bodyAttributes={{
        class: theme,
      }}
    >
      <title>
        {process.env.GATSBY_PAGE_TITLE && process.env.GATSBY_PAGE_TITLE !== ""
          ? process.env.GATSBY_PAGE_TITLE
          : "OpenCatalogi"}
      </title>
    </Helmet>
  );
};
