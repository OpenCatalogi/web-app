import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import { Heading1, LeadParagraph } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { GitHubLogo } from "../../../assets/svgs/GitHub";
import { HavenLogo } from "../../../assets/svgs/Haven";
import { CommongroundLogo } from "../../../assets/svgs/Commonground";
import { Container, SecondaryTopNav, PrimaryTopNav } from "@conduction/components";
import { FiltersContext } from "../../../context/filters";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { GatsbyContext } from "../../../context/gatsby";
import { SearchComponentTemplate } from "../searchComponent/SearchComponentTemplate";

interface HeaderTemplateProps {
  layoutClassName?: string;
}

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({ layoutClassName }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useContext(FiltersContext);
  const {
    location: { pathname },
  } = React.useContext(GatsbyContext);

  const primaryTopNavItems = [
    {
      label: "Home",
      current: pathname === "/",
      handleClick: () => {
        navigate("/");
      },
    },
    {
      label: t("Software"),
      current: pathname === "/components" && filters.softwareType === "standalone/desktop",
      handleClick: () => {
        setFilters({ ...filters, softwareType: "standalone/desktop" });
        navigate("/components");
      },
    },
    {
      label: t("Processes"),
      current: pathname === "/components" && filters.softwareType === "process",
      handleClick: () => {
        setFilters({ ...filters, softwareType: "process" });
        navigate("/components");
      },
    },
    {
      label: t("Data models"),
      current: pathname === "/components" && filters.softwareType === "schema",
      handleClick: () => {
        setFilters({ ...filters, softwareType: "schema" });
        navigate("/components");
      },
    },
    {
      label: t("API's"),
      current: pathname === "/components" && filters.softwareType === "api",
      handleClick: () => {
        setFilters({ ...filters, softwareType: "api" });
        navigate("/components");
      },
    },
    {
      label: t("Initiatives"),
      current: pathname === "/components" && filters.softwareType === "api",
      handleClick: () => {
        setFilters({ ...filters, developmentStatus: "concept", softwareType: "standalone/web" });
        navigate("/components");
      },
    },
    {
      label: "Documentatie",
      current: pathname.includes("documentation"),
      subItems: [
        {
          label: t("About Open Catalogi"),
          current: pathname === "/documentation/about",
          handleClick: () => navigate("/documentation/about"),
        },
        {
          label: t("Installation"),
          current: pathname === "/documentation/installation",
          handleClick: () => {
            navigate("/documentation/installation");
          },
        },
        {
          label: t("Usage"),
          current: pathname === "/documentation/usage",
          handleClick: () => {
            navigate("/documentation/usage");
          },
        },
        {
          label: t("API"),
          current: pathname === "/documentation/api",
          handleClick: () => {
            navigate("#");
          },
        },
        {
          label: t("Standards"),
          current: pathname === "/documentation/standards",
          handleClick: () => {
            navigate("/documentation/standards");
          },
        },
      ],
    },
  ];

  const secondaryTopNavItems = [
    {
      label: "Common ground",
      handleClick: () => {
        window.open("https://commonground.nl");
      },
      icon: <CommongroundLogo />,
    },
    {
      label: "Haven",
      handleClick: () => {
        window.open("https://haven.commonground.nl/");
      },
      icon: <HavenLogo />,
    },
    {
      label: "NL Design",
      handleClick: () => {
        window.open("https://designsystem.gebruikercentraal.nl/");
      },
      icon: <ExternalLinkIcon />,
    },
    {
      label: "Github",
      handleClick: () => {
        window.open("https://github.com/OpenCatalogi");
      },
      icon: <GitHubLogo />,
    },
    {
      label: "Login",
      current: pathname === "/login",
      handleClick: () => {
        navigate("/login");
      },
      icon: <FontAwesomeIcon icon={faCircleUser} />,
    },
  ];

  return (
    <header className={clsx(styles.headerContainer, layoutClassName && layoutClassName)}>
      <div className={styles.headerTopBar}>
        <Container layoutClassName={styles.secondaryNavContainer}>
          <div className={styles.logoContainer}>
            <div onClick={() => navigate("/")} className={styles.organizationLogo}></div>
          </div>
          <SecondaryTopNav items={secondaryTopNavItems} />
        </Container>
      </div>

      {pathname === "/" && (
        <Container layoutClassName={styles.headerContent}>
          <section className={clsx(styles.headerSearchForm, styles.section)}>
            <div>
              <Heading1 className={styles.title}>{t("Open Catalogs")}</Heading1>

              <LeadParagraph className={styles.subTitle}>
                {t("One central place for reuse of information technology within the government")}
              </LeadParagraph>
            </div>
            <SearchComponentTemplate layoutClassName={styles.searchFormContainer} />
          </section>
        </Container>
      )}

      <Container>
        <PrimaryTopNav items={primaryTopNavItems} />
      </Container>
    </header>
  );
};
