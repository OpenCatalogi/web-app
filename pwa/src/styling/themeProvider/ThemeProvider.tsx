import * as React from "react";
import * as styles from "./ThemeProvider.module.css";
import "./../../styling/design-tokens/component-overrides.css";
import { useForm } from "react-hook-form";
import { themes } from "../../data/themes";
import { FormFieldInput } from "@gemeente-denhaag/form-field";
import { Document } from "@utrecht/component-library-react/dist/css-module";
import { FormField, FormLabel } from "@utrecht/component-library-react/dist/css-module";
import { Select, SelectOption } from "@utrecht/component-library-react";

export const ThemeProvider = ({ children }: React.PropsWithChildren<object>): JSX.Element => {
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
    <Document className={themeData?.className}>
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
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    const subscription = watch(({ themeSwitcher }) => {
      setTheme(themeSwitcher);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className={styles.themeSwitcherContainer}>
      <FormField>
        <FormFieldInput>
          <FormLabel htmlFor="themeChangerForm">
            <span className={styles.label}>Thema aanpasssen:</span>
          </FormLabel>
          <div className={styles.selectBorder}>
            <Select
              id="themeChangerForm"
              defaultValue={themes[0].value}
              invalid={errors["themeSwitcher"]}
              {...register("themeSwitcher")}
            >
              {themes.map(({ label, value }) => (
                <SelectOption value={value} key={label}>
                  {label}
                </SelectOption>
              ))}
            </Select>
          </div>
        </FormFieldInput>
      </FormField>
    </div>
  );
};
