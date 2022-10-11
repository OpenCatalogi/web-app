import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import { Heading1, LeadParagraph } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { Container, SecondaryTopNav, PrimaryTopNav } from "@conduction/components";
import { FiltersContext } from "../../../context/filters";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { GatsbyContext } from "../../../context/gatsby";
import { SearchComponentTemplate } from "../searchComponent/SearchComponentTemplate";
import { isLoggedIn } from "../../../services/auth";

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

  const authenticatedSecondaryTopNavItems = [
    {
      label: "Dashboard",
      current: pathname === "/admin",
      handleClick: () => {
        navigate("/admin");
      },
    },
    {
      label: t("Logout"),
      handleClick: () => {
        navigate("/logout");
      },
      icon: <FontAwesomeIcon icon={faCircleUser} />,
    },
  ];

  const unauthenticatedSecondaryTopNavItems = [
    {
      label: t("Login"),
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
          <SecondaryTopNav
            items={isLoggedIn() ? authenticatedSecondaryTopNavItems : unauthenticatedSecondaryTopNavItems}
          />
        </Container>
      </div>
      <div>
        <div className={styles.headerMiddleBar}>
          <Container layoutClassName={styles.primaryNavContainer}>
            <div className={styles.logoContainer}>
              <div onClick={() => navigate("/")} className={styles.organizationLogo}></div>
            </div>
            <PrimaryTopNav items={primaryTopNavItems} />
          </Container>
        </div>
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
    </header>
  );
};
