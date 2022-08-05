import * as React from "react";
import "./../styling/design-tokens/component-overrides.css";

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState<string>("rotterdam");

  React.useEffect(() => {
    const link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = `/themes/${theme}.css`;

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [theme]);

  return (
    <>
      {children}
      <ThemeSwitcher {...{ setTheme }} /> {/* Temporary */}
    </>
  );
};

// This component is TEMPORARY and only for DEV & DEMO purposes
interface ThemeSwitcherProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ setTheme }) => {
  return (
    <>
      <label htmlFor="themeChanger">Thema aanpassen:</label>
      <select id="themeChanger" onChange={(e) => setTheme(e.target.value)}>
        <option value="rotterdam">Rotterdam</option>
        <option value="utrecht">Utrecht</option>
      </select>
    </>
  );
};
