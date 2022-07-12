import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import { Container } from "@conduction/components";
import LogoRotterdam from "./../../../assets/svgs/LogoRotterdam.svg";
import LogoConduction from "../../../assets/svgs/LogoConduction.svg";
import { navigate } from "gatsby";
import { Link } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";

export const FooterTemplate: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.headings}>
          <span>{t("An initiative of")}:</span>

          <div onClick={() => navigate("#")}>
            <Link>{t("Privacy declaration")}</Link>
          </div>
        </div>

        <div className={styles.imagesContainer}>
          <img onClick={() => navigate("https://www.rotterdam.nl/")} src={LogoRotterdam} />
          <img onClick={() => navigate("https://www.conduction.nl/")} src={LogoConduction} />
        </div>
      </Container>
    </footer>
  );
};
