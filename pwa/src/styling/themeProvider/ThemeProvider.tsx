import * as React from "react";
import * as styles from "./ThemeProvider.module.css";
import "./../../styling/design-tokens/component-overrides.css";
import { useForm } from "react-hook-form";
import { themes } from "../../data/themes";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { Heading2 } from "@gemeente-denhaag/components-react";
import { SelectSingle } from "../../pages/components/formFields/select/select";

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
      <div className={styles.container}>
        <div className={styles.content}>
          <ThemeSwitcher {...{ setTheme }} />
        </div>
      </div>
    </>
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
    <>
      <div className={styles.themeSwitcher}>
        <Heading2>Thema Aanpassen:</Heading2>
        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Thema</span>
            </FormFieldLabel>
            <SelectSingle
              name="themeSwitcher"
              defaultValue={{ label: "Rotterdam", value: "rotterdam" }}
              options={themes}
              {...{ errors, control, register }}
            />
          </FormFieldInput>
        </FormField>
      </div>
    </>
  );
};
