import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import { Container } from "@conduction/components";
import LogoConduction from "../../../assets/svgs/LogoConduction.svg";
import LogoRotterdam from "../../../assets/svgs/LogoRotterdam.svg";
import { navigate } from "gatsby";
import { Icon, Link } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { IconArrowRight, IconExternalLink, IconPhone, IconMail } from "@tabler/icons-react";
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
  const [, setFilters] = React.useContext(FiltersContext);

  return (
    <footer className={clsx(styles.footer, layoutClassName && layoutClassName)}>
      <Container layoutClassName={styles.footerContainer}>
        <div className={styles.navigation}>
          <ul className={styles.list}>
            <div className={styles.heading}>Componenten</div>

            <li>
              <Link
                onClick={() => {
                  setFilters({ ...baseFilters, softwareType: "process" });
                  navigate("/components");
                }}
              >
                <Icon className={styles.icon}>
                  <IconArrowRight />
                </Icon>
                {t("Processes")}
              </Link>
            </li>

            <li>
              <Link
                onClick={() => {
                  setFilters({ ...baseFilters, softwareType: "schema" });
                  navigate("/components");
                }}
              >
                <Icon className={styles.icon}>
                  <IconArrowRight />
                </Icon>
                {t("Data models")}
              </Link>
            </li>

            <li>
              <Link
                onClick={() => {
                  setFilters({ ...baseFilters, softwareType: "api" });
                  navigate("/components");
                }}
              >
                <Icon className={styles.icon}>
                  <IconArrowRight />
                </Icon>
                {t("API's")}
              </Link>
            </li>

            <li>
              <Link
                onClick={() => {
                  setFilters({ ...baseFilters, developmentStatus: "concept" });
                  navigate("/components");
                }}
              >
                <Icon className={styles.icon}>
                  <IconArrowRight />
                </Icon>
                {t("Initiatives")}
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <div className={styles.heading}>Documentatie</div>

            <li>
              <Link onClick={() => navigate("/documentation/about")}>
                <Icon className={styles.icon}>
                  <IconArrowRight />
                </Icon>
                {t("About OpenCatalogi")}
              </Link>
            </li>

            <li>
              <Link onClick={() => navigate("/documentation/usage")}>
                <Icon className={styles.icon}>
                  <IconArrowRight />
                </Icon>
                Gebruik
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://github.com/OpenCatalogi">
                <Icon className={styles.icon}>
                  <GitHubLogo />
                </Icon>
                Github
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <div className={styles.heading}>Links</div>

            <li>
              <Link target="_new" href="https://commonground.nl/">
                <Icon className={styles.icon}>
                  <CommongroundLogo />
                </Icon>
                Common ground
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://haven.commonground.nl/">
                <Icon className={styles.icon}>
                  <HavenLogo />
                </Icon>
                Haven
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://designsystem.gebruikercentraal.nl">
                <Icon className={styles.icon}>
                  <IconExternalLink />
                </Icon>
                NL design
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://forumstandaardisatie.nl/">
                <Icon className={clsx(styles.icon, styles.forumStandaardisatieIcon)}>
                  <ForumStandaardisatieLogo />
                </Icon>
                Forum standaardisatie
              </Link>
            </li>

            <li>
              <Link onClick={() => navigate("#")}>
                <Icon className={styles.icon}>
                  <IconExternalLink />
                </Icon>
                {t("Privacy declaration")}
              </Link>
            </li>

            <li>
              <Link
                onClick={() =>
                  process.env.GATSBY_ADMIN_DASHBOARD_URL
                    ? window.open(process.env.GATSBY_ADMIN_DASHBOARD_URL)
                    : navigate("#")
                }
              >
                <Icon className={styles.icon}>
                  <FontAwesomeIcon icon={faCircleUser} />
                </Icon>
                {t("Login")}
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.navigation}>
          <ul className={styles.list}>
            <div className={styles.heading}>{t("Conduction")}</div>

            <li>
              <Link href="tel:+31853036840">
                <Icon className={styles.icon}>
                  <IconPhone />
                </Icon>
                Bel Conduction
              </Link>
            </li>

            <li>
              <Link href="mailto:info@conduction.nl">
                <Icon className={styles.icon}>
                  <IconMail />
                </Icon>
                Mail Conduction
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://conduction.nl/">
                <Icon className={styles.icon}>
                  <IconExternalLink />
                </Icon>
                Bezoek de website
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <div className={styles.heading}>{t("Gemeente Rotterdam")}</div>

            <li>
              <Link href="tel:14010">
                <Icon className={styles.icon}>
                  <IconPhone />
                </Icon>
                Bel Gemeente Rotterdam
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://rotterdam.nl/">
                <Icon className={styles.icon}>
                  <IconExternalLink />
                </Icon>
                Bezoek de website
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <div className={styles.heading}>{t("An initiative of")}</div>

            <div className={styles.logosContainer}>
              <img onClick={() => window.open("https://www.rotterdam.nl/")} src={LogoRotterdam} />
              <img onClick={() => window.open("https://www.conduction.nl/")} src={LogoConduction} />
            </div>
          </ul>
        </div>
      </Container>
    </footer>
  );
};
