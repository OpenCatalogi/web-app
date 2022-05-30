import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import { Container } from "../../../components/container/Container";
import DenHaagImage from "./../../../assets/svgs/DenHaag.svg";
import ConductionLogo from "./../../../assets/svgs/ConductionLogo.svg";
import { Link } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";

export const FooterTemplate: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.items}>

            <div className={styles.text}>
              <span>{"Een initiatief van"}</span>
            </div>

            <div onClick={() => navigate("#")}>
              <a className={styles.link}>{"Privacyverklaring"}</a>
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
