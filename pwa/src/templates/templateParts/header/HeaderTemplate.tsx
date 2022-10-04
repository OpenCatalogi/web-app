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
      handleClick: () => {
        navigate("/");
      },
    },
    {
      label: t("Software"),
      handleClick: () => {
        setFilters({ ...filters, softwareType: "standalone/desktop" });
        navigate("/components");
      },
    },
    {
      label: t("Processes"),
      handleClick: () => {
        setFilters({ ...filters, softwareType: "process" });
        navigate("/components");
      },
    },
    {
      label: t("Data models"),
      handleClick: () => {
        setFilters({ ...filters, softwareType: "schema" });
        navigate("/components");
      },
    },
    {
      label: t("API's"),
      handleClick: () => {
        setFilters({ ...filters, softwareType: "api" });
        navigate("/components");
      },
    },
    {
      label: "Documentatie",
      subItems: [
        {
          label: t("About Open Catalogi"),
          handleClick: () => navigate("/documentation/about"),
        },
        {
          label: t("Installation"),
          handleClick: () => {
            navigate("/documentation/installation");
          },
        },
        {
          label: t("Usage"),
          handleClick: () => {
            navigate("/documentation/usage");
          },
        },
        {
          label: t("API"),
          handleClick: () => {
            navigate("#");
          },
        },
        {
          label: t("Standards"),
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
      handleClick: () => {
        navigate("/admin");
      },
    },
    {
      label: "Logout",
      handleClick: () => {
        navigate("/logout");
      },
      icon: <FontAwesomeIcon icon={faCircleUser} />,
    },
  ];

  const unauthenticatedSecondaryTopNavItems = [
    {
      label: "Login",
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
