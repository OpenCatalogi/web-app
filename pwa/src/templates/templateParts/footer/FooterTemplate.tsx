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
        <div className={styles.content}>
          <div className={styles.headings}>
            <div className={styles.text}>
              <span>{t("An initiative of")}</span>
            </div>

            <div onClick={() => navigate("#")}>
              <Link className={styles.link}>{t("Privacy declaration")}</Link>
            </div>
          </div>

          <div className={styles.imagesContainer}>
            <img src={ConductionLogo} className={styles.image} />
            <img src={DenHaagImage} className={styles.image} />
          </div>
        </div>
      </Container>
    </footer>
  );
};
