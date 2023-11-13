import * as React from "react";

export const useInitCssVariables = (theme: string) => {
  const themeName: string = theme.replace("-theme", "");

  React.useEffect(() => {
    const themeVariables = document.querySelector(`.${theme}`);

    if (!themeVariables) return; // theme is not yet available

    const styles = getComputedStyle(themeVariables);

    setSizeVariables(styles);
  });

  const setSizeVariables = (styles: CSSStyleDeclaration) => {
    const setSize = (size: string) => {
      document.documentElement.style.setProperty(
        `--web-app-size-${size}`,
        styles.getPropertyValue(`--${themeName}-size-${size}`).trim(),
      );
    };

    ["4xl", "3xl", "2xl", "xl", "lg", "md", "sm", "xs", "2xs", "3xs", "4xs"].forEach((size) => setSize(size));
  };
};
