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

            <li
              onClick={() => {
                setFilters({ ...baseFilters, softwareType: "process" });
                navigate("/components");
              }}
            >
              <Link>
                <Icon>
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
              <Link>
                <Icon>
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
              <Link>
                <Icon>
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
              <Link>
                <Icon>
                  <ArrowRightIcon />
                </Icon>
                {t("Initiatives")}
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <div className={styles.heading}>Documentatie</div>

            <li
              onClick={() => {
                navigate("/documentation/about");
              }}
            >
              <Link>
                <Icon>
                  <ArrowRightIcon />
                </Icon>
                {t("About OpenCatalogi")}
              </Link>
            </li>

            <li
              onClick={() => {
                navigate("/documentation/usage");
              }}
            >
              <Link>
                <Icon>
                  <ArrowRightIcon />
                </Icon>
                Gebruik
              </Link>
            </li>

            <li
              onClick={() => {
                navigate("/documentation/contact");
              }}
            >
              <Link>
                <Icon>
                  <ArrowRightIcon />
                </Icon>
                Contact
              </Link>
            </li>

            <li
              onClick={() => {
                open("https://github.com/OpenCatalogi");
              }}
            >
              <Link>
                <Icon>
                  <GitHubLogo />
                </Icon>
                Github
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <div className={styles.heading}>Links</div>

            <li
              onClick={() => {
                open("https://commonground.nl/");
              }}
            >
              <Link>
                <Icon>
                  <CommongroundLogo />
                </Icon>
                Common ground
              </Link>
            </li>

            <li
              onClick={() => {
                open("https://haven.commonground.nl/");
              }}
            >
              <Link>
                <Icon>
                  <HavenLogo />
                </Icon>
                Haven
              </Link>
            </li>

            <li
              onClick={() => {
                open("https://designsystem.gebruikercentraal.nl/");
              }}
            >
              <Link>
                <Icon>
                  <ExternalLinkIcon />
                </Icon>
                NL design
              </Link>
            </li>

            <li
              onClick={() => {
                open("https://forumstandaardisatie.nl/");
              }}
            >
              <Link>
                <Icon>
                  <ForumStandaardisatieLogo />
                </Icon>
                Forum standaardisatie
              </Link>
            </li>

            <li
              onClick={() => {
                navigate("#");
              }}
            >
              <Link>
                <Icon>
                  <ExternalLinkIcon />
                </Icon>
                {t("Privacy declaration")}
              </Link>
            </li>

            <li
              onClick={() => {
                open(window.sessionStorage.getItem("ADMIN_DASHBOARD_URL") ?? "#");
              }}
            >
              <Link>
                <Icon>
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
