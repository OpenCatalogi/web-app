import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import { Container } from "@conduction/components";
import LogoConduction from "../../../assets/svgs/LogoConduction.svg";
import { navigate } from "gatsby";
import { Link } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon, ExternalLinkIcon } from "@gemeente-denhaag/icons";
import clsx from "clsx";
import { GitHubLogo } from "../../../assets/svgs/GitHub";
import { FiltersContext } from "../../../context/filters";
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

  const setNewFilters = (newFilter: object) =>
    setFilters({
      ...filters,
      _search: "",
      softwareType: "",
      developmentStatus: "",
      platforms: [],
      category: "",
      "nl.commonground.layerType": [],
      "nl.gemma.bedrijfsfuncties": [],
      "nl.gemma.bedrijfsservices": [],
      "nl.gemma.referentieComponenten": [],
      "nl.gemma.applicatiefunctie": "",
      "nl.upl": [],
      "maintenance.type": "",
      "legal.license": "",
      "legal.mainCopyrightOwner": "",
      "url.organisation.name": "",
      ...newFilter,
    });

  return (
    <footer className={clsx(styles.footer, layoutClassName && layoutClassName)}>
      <Container layoutClassName={styles.footerContainer}>
        <div className={styles.navigation}>
          <ul className={styles.list}>
            <div className={styles.heading}>Componenten</div>

            <li
              onClick={() => {
                setNewFilters({ softwareType: "process" });
                navigate("/components");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                {t("Processes")}
              </Link>
            </li>

            <li
              onClick={() => {
                setNewFilters({ softwareType: "schema" });
                navigate("/components");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                {t("Data models")}
              </Link>
            </li>

            <li
              onClick={() => {
                setNewFilters({ softwareType: "api" });
                navigate("/components");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                {t("API's")}
              </Link>
            </li>

            <li
              onClick={() => {
                setNewFilters({ developmentStatus: "concept" });
                navigate("/components");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
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
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                {t("About OpenCatalogi")}
              </Link>
            </li>

            <li
              onClick={() => {
                navigate("/documentation/usage");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                Gebruik
              </Link>
            </li>

            <li
              onClick={() => {
                navigate("/documentation/contact");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                Contact
              </Link>
            </li>

            <li
              onClick={() => {
                open("https://github.com/OpenCatalogi");
              }}
            >
              <Link icon={<GitHubLogo />} iconAlign="start">
                GitHub
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
              <Link icon={<CommongroundLogo />} iconAlign="start">
                Common ground
              </Link>
            </li>

            <li
              onClick={() => {
                open("https://haven.commonground.nl/");
              }}
            >
              <Link icon={<HavenLogo />} iconAlign="start">
                Haven
              </Link>
            </li>

            <li
              onClick={() => {
                open("https://designsystem.gebruikercentraal.nl/");
              }}
            >
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                NL design
              </Link>
            </li>

            <li
              onClick={() => {
                open("https://forumstandaardisatie.nl/");
              }}
            >
              <Link icon={<ForumStandaardisatieLogo />} iconAlign="start">
                Forum standaardisatie
              </Link>
            </li>

            <li
              onClick={() => {
                navigate("#");
              }}
            >
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                {t("Privacy declaration")}
              </Link>
            </li>

            <li
              onClick={() => {
                open(window.sessionStorage.getItem("ADMIN_DASHBOARD_URL") ?? "#");
              }}
            >
              <Link icon={<FontAwesomeIcon icon={faCircleUser} />} iconAlign="start">
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
