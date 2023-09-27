import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import { Container } from "@conduction/components";
import LogoConduction from "../../../assets/svgs/LogoConduction.svg";
import LogoRotterdam from "../../../assets/svgs/LogoRotterdam.svg";
import LogoRotterdamWhite from "../../../assets/svgs/LogoRotterdamWhite.svg";
import { navigate } from "gatsby";
import { Heading4, Icon, PageFooter } from "@utrecht/component-library-react/dist/css-module";
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
import { Link } from "../../../components";

interface FooterTemplateProps {
  layoutClassName?: string;
}

export const FooterTemplate: React.FC<FooterTemplateProps> = ({ layoutClassName }) => {
  const { t } = useTranslation();
  const [, setFilters] = React.useContext(FiltersContext);
  const [imgSrc, setImgSrc] = React.useState<string>(LogoRotterdam);
  const footerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!footerRef.current) return;
    function getTextColor(rgba: any) {
      rgba = rgba.match(/\d+/g);
      if (rgba[0] * 0.299 + rgba[1] * 0.587 + rgba[2] * 0.114 > 186) {
        return setImgSrc(LogoRotterdam);
      } else {
        return setImgSrc(LogoRotterdamWhite);
      }
    }

    const backgroundStyle = getComputedStyle(document.getElementById("footer")!, "").getPropertyValue(
      "background-color",
    );

    console.log(footerRef.current.style);

    getTextColor(backgroundStyle);
  }, [footerRef.current]);

  return (
    <PageFooter id="footer" className={clsx(layoutClassName && layoutClassName)} ref={footerRef}>
      <Container layoutClassName={styles.footerContainer}>
        <div className={styles.navigation}>
          <ul className={styles.list}>
            <Heading4 className={styles.heading}>Componenten</Heading4>

            <li>
              <Link
                to="/components"
                onClick={() => {
                  setFilters({ ...baseFilters, softwareType: "process" });
                }}
              >
                <Icon className="utrecht-icon--conduction-start">
                  <IconArrowRight />
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
                to="/components"
                onClick={() => {
                  setFilters({ ...baseFilters, softwareType: "schema" });
                }}
              >
                <Icon className="utrecht-icon--conduction-start">
                  <IconArrowRight />
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
                to="/components"
                onClick={() => {
                  setFilters({ ...baseFilters, softwareType: "api" });
                }}
              >
                <Icon className="utrecht-icon--conduction-start">
                  <IconArrowRight />
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
                to="/components"
                onClick={() => {
                  setFilters({ ...baseFilters, developmentStatus: "concept" });
                }}
              >
                <Icon className="utrecht-icon--conduction-start">
                  <IconArrowRight />
                </Icon>
                {t("Initiatives")}
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <Heading4 className={styles.heading}>Documentatie</Heading4>

            <li>
              <Link to="/documentation/usage">
                <Icon className="utrecht-icon--conduction-start">
                  <IconArrowRight />
                </Icon>
                {t("About OpenCatalogi")}
              </Link>
            </li>

            <li>
              <Link to="/documentation/usage">
                <Icon className="utrecht-icon--conduction-start">
                  <IconArrowRight />
                </Icon>
                Gebruik
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://github.com/OpenCatalogi">
                <Icon className="utrecht-icon--conduction-start">
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
                <Icon className="utrecht-icon--conduction-start">
                  <CommongroundLogo />
                </Icon>
                Common ground
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://haven.commonground.nl/">
                <Icon className="utrecht-icon--conduction-start">
                  <HavenLogo />
                </Icon>
                Haven
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://designsystem.gebruikercentraal.nl">
                <Icon className="utrecht-icon--conduction-start">
                  <IconExternalLink />
                </Icon>
                NL design
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://forumstandaardisatie.nl/">
                <Icon className={clsx("utrecht-icon--conduction-start", styles.forumStandaardisatieIcon)}>
                  <ForumStandaardisatieLogo />
                </Icon>
                Forum standaardisatie
              </Link>
            </li>

            <li>
              <Link to="#">
                <Icon className="utrecht-icon--conduction-start">
                  <IconExternalLink />
                </Icon>
                {t("Privacy declaration")}
              </Link>
            </li>

            <li>
              <Link target="_new" to={process.env.ADMIN_DASHBOARD_URL ?? "#"}>
                <Icon className="utrecht-icon--conduction-start">
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
                <Icon className="utrecht-icon--conduction-start">
                  <IconPhone />
                </Icon>
                Bel Conduction
              </Link>
            </li>

            <li>
              <Link href="mailto:info@conduction.nl">
                <Icon className="utrecht-icon--conduction-start">
                  <IconMail />
                </Icon>
                Mail Conduction
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://conduction.nl/">
                <Icon className="utrecht-icon--conduction-start">
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
                <Icon className="utrecht-icon--conduction-start">
                  <IconPhone />
                </Icon>
                Bel Gemeente Rotterdam
              </Link>
            </li>

            <li>
              <Link target="_new" href="https://rotterdam.nl/">
                <Icon className="utrecht-icon--conduction-start">
                  <IconExternalLink />
                </Icon>
                Bezoek de website
              </Link>
            </li>
          </ul>

          <ul className={styles.list}>
            <Heading4 className={styles.heading}>{t("An initiative of")}</Heading4>

            <div className={styles.logosContainer}>
              <img onClick={() => window.open("https://www.rotterdam.nl/")} src={imgSrc} />
              <img onClick={() => window.open("https://www.conduction.nl/")} src={LogoConduction} />
            </div>
          </ul>
        </div>
      </Container>
    </PageFooter>
  );
};
