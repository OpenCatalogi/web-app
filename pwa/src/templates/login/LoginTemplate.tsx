import * as React from "react";
import * as styles from "./LoginTemplate.module.css";
import { useTranslation } from "react-i18next";
import { LoginForm } from "../templateParts/loginForm/LoginFormTemplate";
import { Heading } from "@utrecht/component-library-react/dist/css-module";

export const LoginTemplate: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading level={1} className={styles.header}>{t("Login")}</Heading>
        <LoginForm />
      </div>
    </div>
  );
};
