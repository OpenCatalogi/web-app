import * as React from "react";
import "../styling/index.css";
import { Helmet } from "react-helmet";
import { useInitCssVariables } from "../hooks/initCssVariables";

export const Head: React.FC = () => {
  const [theme, setTheme] = React.useState<string>("conduction-theme");
  const [title, setTitle] = React.useState<string>("OpenCatalogi");

  React.useEffect(() => {
    setTheme(window.sessionStorage.getItem("NL_DESIGN_THEME_CLASSNAME") ?? "conduction-theme");
    setTitle(window.sessionStorage.getItem("PAGE_TITLE") ?? "OpenCatalogi");
  }, []);

  useInitCssVariables(theme);

  return (
    <Helmet
      {...{ title }}
      bodyAttributes={{
        class: theme,
      }}
    />
  );
};
