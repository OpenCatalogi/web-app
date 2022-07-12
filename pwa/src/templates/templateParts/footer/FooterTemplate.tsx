import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import { Container } from "@conduction/components";
import LogoRotterdam from "./../../../assets/images/LogoRotterdam.png";
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
          <img src={LogoRotterdam} />
        </div>
      </Container>
    </footer>
  );
};
