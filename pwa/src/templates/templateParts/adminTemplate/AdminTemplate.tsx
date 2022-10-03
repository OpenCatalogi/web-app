import * as React from "react";
import * as styles from "./AdminTemplate.module.css";
import { useTranslation } from "react-i18next";
import { PrivateRoute } from "@conduction/components";
import { isLoggedIn } from "../../../services/auth";

export const AdminTemplate: React.FC = ({ children }) => {
  const { t } = useTranslation();

  return (
    <PrivateRoute authenticated={isLoggedIn()}>
      <div className={styles.container}>{children}</div>
    </PrivateRoute>
  );
};
