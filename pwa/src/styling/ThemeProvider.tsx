import * as React from "react";
import "./../styling/design-tokens/component-overrides.css";

export const ThemeProvider: React.FC = ({ children }) => {
  return <>{children}</>;
};
