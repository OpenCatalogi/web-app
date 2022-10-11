import * as React from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/components-react";
import * as styles from "./LoginFormTemplate.module.css";
import { useTranslation } from "react-i18next";
import { InputPassword, InputText } from "@conduction/components";

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <form className={styles.container}>
      <FormField>
        <FormFieldInput>
          <FormFieldLabel>{t("Username")}</FormFieldLabel>
          <InputText {...{ register, errors }} name="username" validation={{ required: true }} />
        </FormFieldInput>
      </FormField>
      <FormField>
        <FormFieldLabel>{t("Password")}</FormFieldLabel>
        <FormFieldInput>
          <InputPassword {...{ register, errors }} name="password" validation={{ required: true }} />
        </FormFieldInput>
      </FormField>

      <Button size="large">{t("Send")}</Button>
    </form>
  );
};
