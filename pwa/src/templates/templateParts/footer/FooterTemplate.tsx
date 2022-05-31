import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import { Container } from "../../../components/container/Container";
import DenHaagImage from "./../../../assets/svgs/DenHaag.svg";
import ConductionLogo from "./../../../assets/svgs/ConductionLogo.svg";
import { navigate } from "gatsby";
import { t } from "i18next";
import { Link } from "@gemeente-denhaag/components-react";

export const FooterTemplate: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.headings}>
          <span>{t("An initiative of")}</span>

          <div onClick={() => navigate("#")}>
            <Link>{t("Privacy declaration")}</Link>
          </div>
        </div>

        <div className={styles.imagesContainer}>
          <img src={ConductionLogo} />
          <img src={DenHaagImage} />
        </div>
      </Container>
    </footer>
  );
};
