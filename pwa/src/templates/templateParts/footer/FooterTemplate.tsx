import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import { Container } from "@conduction/components";
import LogoConduction from "../../../assets/svgs/LogoConduction.svg";
import LogoConductionWhite from "../../../assets/svgs/LogoConductionWhite.svg";
import LogoRotterdam from "../../../assets/svgs/LogoRotterdam.svg";
import LogoRotterdamWhite from "../../../assets/svgs/LogoRotterdamWhite.svg";
import { navigate } from "gatsby";
import { Heading4, Icon, Link, PageFooter } from "@utrecht/component-library-react/dist/css-module";
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
import { colorIsLight } from "../../../services/colorIsLight";

interface FooterTemplateProps {
  layoutClassName?: string;
}

export const FooterTemplate: React.FC<FooterTemplateProps> = ({ layoutClassName }) => {
  const { t } = useTranslation();
  const [, setFilters] = React.useContext(FiltersContext);
  const [rotterdamLogoSource, setRotterdamLogoSource] = React.useState<string>(LogoRotterdam);
  const [conductionLogoSource, setConductionLogoSource] = React.useState<string>(LogoConduction);
  const footerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!footerRef.current) return;

    if (colorIsLight(getComputedStyle(footerRef.current).getPropertyValue("background-color"))) {
      setRotterdamLogoSource(LogoRotterdam);
      setConductionLogoSource(LogoConduction);

      return;
    }

    setRotterdamLogoSource(LogoRotterdamWhite);
    setConductionLogoSource(LogoConductionWhite);
  }, [footerRef.current]);

  return (
    <PageFooter className={clsx(styles.footer, layoutClassName && layoutClassName)} ref={footerRef}>
      <Container layoutClassName={styles.footerContainer}>
        <div className={styles.navigation}>
          <ul className={styles.list}>
            <Heading4 className={styles.heading}>Componenten</Heading4>

            <li>
              <Link
                onClick={() => {
                  setFilters({ ...baseFilters, softwareType: "process" });
                  navigate("/components");
                }}
              >
                <Icon>
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
                <Icon>
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
                <Icon>
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
                <Icon>
                  <IconArrowRight />
                </Icon>
                {t("Initiatives")}
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <Heading4 className={styles.heading}>Documentatie</Heading4>

            <li>
              <Link onClick={() => navigate("/documentation/about")}>
                <Icon>
                  <IconArrowRight />
                </Icon>
                {t("About OpenCatalogi")}
              </Link>
            </li>

            <li>
              <Link onClick={() => navigate("/documentation/usage")}>
                <Icon>
                  <IconArrowRight />
                </Icon>
                Gebruik
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://github.com/OpenCatalogi">
                <Icon>
                  <GitHubLogo />
                </Icon>
                Github
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <Heading4 className={styles.heading}>Links</Heading4>

            <li>
              <Link target="_new" href="https://commonground.nl/">
                <Icon>
                  <CommongroundLogo />
                </Icon>
                Common ground
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://haven.commonground.nl/">
                <Icon>
                  <HavenLogo />
                </Icon>
                Haven
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://designsystem.gebruikercentraal.nl">
                <Icon>
                  <IconExternalLink />
                </Icon>
                NL design
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://forumstandaardisatie.nl/">
                <Icon className={styles.forumStandaardisatieIcon}>
                  <ForumStandaardisatieLogo />
                </Icon>
                Forum standaardisatie
              </Link>
            </li>

            <li>
              <Link onClick={() => navigate("#")}>
                <Icon>
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
                <Icon>
                  <FontAwesomeIcon icon={faCircleUser} />
                </Icon>
                {t("Login")}
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.navigation}>
          <ul className={styles.list}>
            <Heading4 className={styles.heading}>{t("Conduction")}</Heading4>

            <li>
              <Link href="tel:+31853036840">
                <Icon>
                  <IconPhone />
                </Icon>
                Bel Conduction
              </Link>
            </li>

            <li>
              <Link href="mailto:info@conduction.nl">
                <Icon>
                  <IconMail />
                </Icon>
                Mail Conduction
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://conduction.nl/">
                <Icon>
                  <IconExternalLink />
                </Icon>
                Bezoek de website
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <Heading4 className={styles.heading}>{t("Gemeente Rotterdam")}</Heading4>

            <li>
              <Link href="tel:14010">
                <Icon>
                  <IconPhone />
                </Icon>
                Bel Gemeente Rotterdam
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://rotterdam.nl/">
                <Icon>
                  <IconExternalLink />
                </Icon>
                Bezoek de website
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <Heading4 className={styles.heading}>{t("An initiative of")}</Heading4>

            <div className={styles.logosContainer}>
              <img onClick={() => window.open("https://www.rotterdam.nl/")} src={rotterdamLogoSource} />
              <img onClick={() => window.open("https://www.conduction.nl/")} src={conductionLogoSource} />
            </div>
          </ul>
        </div>
      </Container>
    </PageFooter>
  );
};
