import * as React from "react";
import * as styles from "./ThemeProvider.module.css";
import "./../../styling/design-tokens/component-overrides.css";
import { useForm } from "react-hook-form";
import "@utrecht/component-library-css";
// import "@utrecht/design-tokens/dist/index.css";
import { themes } from "../../data/themes";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { SelectSingle } from "@conduction/components/lib/components/formFields/select/select";
import { Document } from "@utrecht/component-library-react/dist/css-module";
import clsx from "clsx";

export const ThemeProvider = ({ children }: React.PropsWithChildren<{}>): JSX.Element => {
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
  const themeData = themes.find(({ value }) => value === theme);

  return (
    <Document className={clsx("conduction-theme", themeData?.className)}>
      {children}

      <div className={styles.container}>
        <div className={styles.content}>
          <ThemeSwitcher {...{ setTheme }} />
        </div>
      </div>
    </Document>
  );
};

// This component is TEMPORARY and only for DEV & DEMO purposes
interface ThemeSwitcherProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ setTheme }) => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    const subscription = watch(({ themeSwitcher }) => {
      setTheme(themeSwitcher?.value);
    });

    return () => subscription.unsubscribe();
  });

  return (
    <div className={styles.themeSwitcherContainer}>
      <FormField>
        <FormFieldInput>
          <FormFieldLabel>
            <span className={styles.label}>Thema aanpasssen:</span>
          </FormFieldLabel>
          <div className={styles.selectBorder}>
            <SelectSingle
              name="themeSwitcher"
              defaultValue={themes[0]}
              options={themes}
              {...{ errors, control, register }}
            />
          </div>
        </FormFieldInput>
      </FormField>
    </div>
  );
};
