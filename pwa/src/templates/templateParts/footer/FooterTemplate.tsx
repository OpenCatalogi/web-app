import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import { Container } from "@conduction/components";
import LogoConduction from "../../../assets/svgs/LogoConduction.svg";
import { navigate } from "gatsby";

import { Icon, Link } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon, ExternalLinkIcon } from "@gemeente-denhaag/icons";
import clsx from "clsx";
import { GitHubLogo } from "../../../assets/svgs/GitHub";
import { baseFilters, FiltersContext } from "../../../context/filters";
import { HavenLogo } from "../../../assets/svgs/Haven";
import { CommongroundLogo } from "../../../assets/svgs/Commonground";
import { ForumStandaardisatieLogo } from "../../../assets/svgs/ForumStandaardisatie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

interface FooterTemplateProps {
  layoutClassName?: string;
}

export const FooterTemplate: React.FC<FooterTemplateProps> = ({ layoutClassName }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useContext(FiltersContext);

  return (
    <footer className={clsx(styles.footer, layoutClassName && layoutClassName)}>
      <Container layoutClassName={styles.footerContainer}>
        <div className={styles.navigation}>
          <ul className={styles.list}>
            <div className={styles.heading}>Componenten</div>

            <li>
              <Link
                href="/components"
                onClick={() => {
                  setFilters({ ...baseFilters, softwareType: "process" });
                }}
              >
                <Icon className="utrecht-icon--conduction-start">
                  <ArrowRightIcon />
                </Icon>
                {t("Processes")}
              </Link>
            </li>

            <li
              onClick={() => {
                setFilters({ ...baseFilters, softwareType: "schema" });
                navigate("/components");
              }}
            >
              <Link
                href="/components"
                onClick={() => {
                  setFilters({ ...baseFilters, softwareType: "schema" });
                }}
              >
                <Icon className="utrecht-icon--conduction-start">
                  <ArrowRightIcon />
                </Icon>
                {t("Data models")}
              </Link>
            </li>

            <li
              onClick={() => {
                setFilters({ ...baseFilters, softwareType: "api" });
                navigate("/components");
              }}
            >
              <Link
                href="/components"
                onClick={() => {
                  setFilters({ ...baseFilters, softwareType: "api" });
                }}
              >
                <Icon className="utrecht-icon--conduction-start">
                  <ArrowRightIcon />
                </Icon>
                {t("API's")}
              </Link>
            </li>

            <li
              onClick={() => {
                setFilters({ ...baseFilters, developmentStatus: "concept" });
                navigate("/components");
              }}
            >
              <Link
                href="/components"
                onClick={() => {
                  setFilters({ ...baseFilters, developmentStatus: "concept" });
                }}
              >
                <Icon className="utrecht-icon--conduction-start">
                  <ArrowRightIcon />
                </Icon>
                {t("Initiatives")}
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <div className={styles.heading}>Documentatie</div>

            <li>
              <Link href="/documentation/about">
                <Icon className="utrecht-icon--conduction-start">
                  <ArrowRightIcon />
                </Icon>
                {t("About OpenCatalogi")}
              </Link>
            </li>

            <li>
              <Link href="/documentation/usage">
                <Icon className="utrecht-icon--conduction-start">
                  <ArrowRightIcon />
                </Icon>
                Gebruik
              </Link>
            </li>

            <li>
              <Link href="/documentation/contact">
                <Icon className="utrecht-icon--conduction-start">
                  <ArrowRightIcon />
                </Icon>
                Contact
              </Link>
            </li>

            <li>
              <Link href="https://github.com/OpenCatalogi">
                <Icon className="utrecht-icon--conduction-start">
                  <GitHubLogo />
                </Icon>
                Github
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <div className={styles.heading}>Links</div>

            <li>
              <Link href="https://commonground.nl/">
                <Icon className="utrecht-icon--conduction-start">
                  <CommongroundLogo />
                </Icon>
                Common ground
              </Link>
            </li>

            <li>
              <Link href="https://haven.commonground.nl/">
                <Icon className="utrecht-icon--conduction-start">
                  <HavenLogo />
                </Icon>
                Haven
              </Link>
            </li>

            <li>
              <Link href="https://designsystem.gebruikercentraal.nl">
                <Icon className="utrecht-icon--conduction-start">
                  <ExternalLinkIcon />
                </Icon>
                NL design
              </Link>
            </li>

            <li>
              <Link href="https://forumstandaardisatie.nl/">
                <Icon className="utrecht-icon--conduction-start">
                  <ForumStandaardisatieLogo />
                </Icon>
                Forum standaardisatie
              </Link>
            </li>

            <li>
              <Link href="#">
                <Icon className="utrecht-icon--conduction-start">
                  <ExternalLinkIcon />
                </Icon>
                {t("Privacy declaration")}
              </Link>
            </li>

            <li>
              <Link href={window.sessionStorage.getItem("ADMIN_DASHBOARD_URL") ?? "#"}>
                <Icon className="utrecht-icon--conduction-start">
                  <FontAwesomeIcon icon={faCircleUser} />
                </Icon>
                {t("Login")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className={styles.heading}>{t("An initiative of")}</div>

          <div className={styles.logosContainer}>
            <div className={styles.organizationLogo}></div>
            <img onClick={() => window.open("https://www.conduction.nl/")} src={LogoConduction} />
          </div>
        </div>
      </Container>
    </footer>
  );
};
