import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import { Container } from "@conduction/components";
import LogoConduction from "../../../assets/svgs/LogoConduction.svg";
import { navigate } from "gatsby";
import { Link, UnorderedList, UnorderedListItem } from "@utrecht/component-library-react/dist/css-module";
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
          <UnorderedList className={styles.list}>
            <div className={styles.heading}>Componenten</div>
            <UnorderedListItem
              onClick={() => {
                setFilters({ ...baseFilters, softwareType: "process" });
                navigate("/components");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                {t("Processes")}
              </Link>
            </UnorderedListItem>

            <UnorderedListItem
              onClick={() => {
                setFilters({ ...baseFilters, softwareType: "schema" });
                navigate("/components");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                {t("Data models")}
              </Link>
            </UnorderedListItem>

            <UnorderedListItem
              onClick={() => {
                setFilters({ ...baseFilters, softwareType: "api" });
                navigate("/components");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                {t("API's")}
              </Link>
            </UnorderedListItem>

            <UnorderedListItem
              onClick={() => {
                setFilters({ ...baseFilters, developmentStatus: "concept" });
                navigate("/components");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                {t("Initiatives")}
              </Link>
            </UnorderedListItem>
          </UnorderedList>

          <UnorderedList className={styles.list}>
            <div className={styles.heading}>Documentatie</div>

            <UnorderedListItem
              onClick={() => {
                navigate("/documentation/about");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                {t("About OpenCatalogi")}
              </Link>
            </UnorderedListItem>

            <UnorderedListItem
              onClick={() => {
                navigate("/documentation/usage");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                Gebruik
              </Link>
            </UnorderedListItem>

            <UnorderedListItem
              onClick={() => {
                navigate("/documentation/contact");
              }}
            >
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                Contact
              </Link>
            </UnorderedListItem>

            <UnorderedListItem
              onClick={() => {
                open("https://github.com/OpenCatalogi");
              }}
            >
              <Link icon={<GitHubLogo />} iconAlign="start">
                GitHub
              </Link>
            </UnorderedListItem>
          </UnorderedList>

          <UnorderedList className={styles.list}>
            <div className={styles.heading}>Links</div>

            <UnorderedListItem
              onClick={() => {
                open("https://commonground.nl/");
              }}
            >
              <Link icon={<CommongroundLogo />} iconAlign="start">
                Common ground
              </Link>
            </UnorderedListItem>

            <UnorderedListItem
              onClick={() => {
                open("https://haven.commonground.nl/");
              }}
            >
              <Link icon={<HavenLogo />} iconAlign="start">
                Haven
              </Link>
            </UnorderedListItem>

            <UnorderedListItem
              onClick={() => {
                open("https://designsystem.gebruikercentraal.nl/");
              }}
            >
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                NL design
              </Link>
            </UnorderedListItem>
            <UnorderedListItem
              onClick={() => {
                open("https://forumstandaardisatie.nl/");
              }}
            >
              <Link icon={<ForumStandaardisatieLogo />} iconAlign="start">
                Forum standaardisatie
              </Link>
            </UnorderedListItem>
            <UnorderedListItem
              onClick={() => {
                navigate("#");
              }}
            >
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                {t("Privacy declaration")}
              </Link>
            </UnorderedListItem>
            <UnorderedListItem
              onClick={() => {
                open(window.sessionStorage.getItem("ADMIN_DASHBOARD_URL") ?? "#");
              }}
            >
              <Link icon={<FontAwesomeIcon icon={faCircleUser} />} iconAlign="start">
                {t("Login")}
              </Link>
            </UnorderedListItem>
          </UnorderedList>
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
