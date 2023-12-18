import * as React from "react";
import * as styles from "./ThemeSwitcherTopBar.module.css";
import { SelectSingle } from "@conduction/components";
import { useForm } from "react-hook-form";
import { availableThemes } from "../../../services/getConfig";
import { useEnvironment } from "../../../hooks/useEnvironment";
import { navigate } from "gatsby";
import clsx from "clsx";
import { Heading3, Paragraph } from "@utrecht/component-library-react";
import { TSelectOption } from "@conduction/components/lib/components/formFields/select/select";

export const ThemeSwitcherTopBar: React.FC = () => {
  const { initiateFromJSON } = useEnvironment();

  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const watchTheme = watch("theme");

  React.useEffect(() => {
    if (watchTheme) return;

    const themeOptions: TSelectOption[] = availableThemes.flatMap((group) => group.options);

    setValue(
      "theme",
      themeOptions.find((theme) => theme.value === window.sessionStorage.getItem("NL_DESIGN_THEME_CLASSNAME")),
    ); // init select field based on domain name
  }, []);

  React.useEffect(() => {
    if (window.sessionStorage.getItem("SHOW_THEME_SWITCHER") !== "true") return;
    if (!watchTheme) return;

    navigate("/");

    initiateFromJSON(watchTheme.value);
  }, [watchTheme]);

  if (window.sessionStorage.getItem("SHOW_THEME_SWITCHER") === "true") {
    return (
      <section className={clsx(styles.container, "open-webconcept-theme")}>
        <div>
          <Heading3>OpenCatalogi organisatie switcher</Heading3>

          <Paragraph>Verander van overheidsorganisatie om andere catalogi te bekijken</Paragraph>
        </div>

        <div>
          <Paragraph className={styles.label}>Selecteer een overheidsorganisatie</Paragraph>

          <SelectSingle
            options={availableThemes}
            name="theme"
            ariaLabel="Theme selector"
            {...{ register, errors, control }}
          />
        </div>
      </section>
    );
  }

  return <></>;
};
