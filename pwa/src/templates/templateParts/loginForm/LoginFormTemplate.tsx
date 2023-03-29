import * as React from "react";
import { useForm } from "react-hook-form";
import { handleLogin } from "../../../services/auth";
import { Alert, Button, FormFieldInput } from "@gemeente-denhaag/components-react";
import { FormField, FormLabel } from "@utrecht/component-library-react/dist/css-module";
import * as styles from "./LoginFormTemplate.module.css";
import { useTranslation } from "react-i18next";
import { InputPassword, InputText } from "@conduction/components";
import APIService from "../../../apiService/apiService";
import APIContext from "../../../apiService/apiContext";

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formError, setFormError] = React.useState<string>("");
  const API: APIService | null = React.useContext(APIContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setFormError("");

    API &&
      handleLogin(data, API)
        .catch((err) => {
          setFormError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      {formError && <Alert text={formError} title={t("Oops, something went wrong")} variant="error" />}

      <FormField>
        <FormFieldInput>
          <FormLabel htmlFor={""}>{t("Username")}</FormLabel>
          <InputText {...{ register, errors }} name="username" validation={{ required: true }} disabled={loading} />
        </FormFieldInput>
      </FormField>
      <FormField>
        <FormLabel htmlFor={""}>{t("Password")}</FormLabel>
        <FormFieldInput>
          <InputPassword {...{ register, errors }} name="password" validation={{ required: true }} disabled={loading} />
        </FormFieldInput>
      </FormField>

      <Button size="large" type="submit" disabled={loading}>
        {t("Send")}
      </Button>
    </form>
  );
};
