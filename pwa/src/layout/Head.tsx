import * as React from "react";
import "../styling/index.css";
import { Helmet } from "react-helmet";
import { useInitCssVariables } from "../hooks/initCssVariables";

export const Head: React.FC = () => {
  const [theme] = React.useState<string>(
    window.sessionStorage.getItem("NL_DESIGN_THEME_CLASSNAME") ?? "conduction-theme",
  );

  useInitCssVariables(theme);

  return (
    <Helmet
      title={window.sessionStorage.getItem("PAGE_TITLE") ?? "OpenCatalogi"}
      bodyAttributes={{
        class: window.sessionStorage.getItem("NL_DESIGN_THEME_CLASSNAME") ?? "conduction-theme",
      }}
    />
  );
};
