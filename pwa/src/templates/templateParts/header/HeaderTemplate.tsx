import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import { Heading1, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { Container, SecondaryTopNav, Breadcrumbs, PrimaryTopNav } from "@conduction/components";
import { baseFilters, FiltersContext } from "../../../context/filters";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { GatsbyContext } from "../../../context/gatsby";
import { SearchComponentTemplate } from "../searchComponent/SearchComponentTemplate";
import _ from "lodash";

interface HeaderTemplateProps {
  layoutClassName?: string;
}

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({ layoutClassName }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useContext(FiltersContext);
  const [topNavItems, setTopNavItems] = React.useState<any[]>([]);

  const {
    pageContext: {
      breadcrumb: { crumbs },
    },
    location: { pathname },
    screenSize,
  } = React.useContext(GatsbyContext);

  const translatedCrumbs = crumbs.map((crumb: any) => ({ ...crumb, crumbLabel: t(_.upperFirst(crumb.crumbLabel)) }));

  const primaryTopNavItems = [
    {
      label: "Home",
      current: pathname === "/",
      handleClick: () => {
        navigate("/");
      },
    },
    {
      label: t("Categories"),
      current: pathname.includes("/categories"),
      handleClick: () => {
        navigate("/categories");
      },
    },
    {
      label: t("Applications"),
      current: pathname.includes("/applications"),
      handleClick: () => {
        navigate("/applications");
      },
    },
    {
      label: t("Components"),
      current: pathname.includes("/components"),
      handleClick: () => {
        navigate("/components");
      },
      subItems: [
        {
          label: t("Processes"),
          current:
            pathname === "/components" && filters["embedded.nl.embedded.commonground.layerType"]?.includes("process"),
          handleClick: () => {
            setFilters({ ...baseFilters, "embedded.nl.embedded.commonground.layerType": ["process"] });
            navigate("/components");
          },
        },
        {
          label: t("Data models"),
          current:
            pathname === "/components" && filters["embedded.nl.embedded.commonground.layerType"]?.includes("data"),
          handleClick: () => {
            setFilters({ ...baseFilters, "embedded.nl.embedded.commonground.layerType": ["data"] });
            navigate("/components");
          },
        },
        {
          label: t("API's"),
          current:
            pathname === "/components" && filters["embedded.nl.embedded.commonground.layerType"]?.includes("service"),
          handleClick: () => {
            setFilters({ ...baseFilters, "embedded.nl.embedded.commonground.layerType": ["service"] });
            navigate("/components");
          },
        },
      ],
    },
    {
      label: t("Initiatives"),
      current: pathname === "/components" && filters.developmentStatus === "concept",
      handleClick: () => {
        setFilters({ ...baseFilters, developmentStatus: "concept" });
        navigate("/components");
      },
    },
    {
      label: "Documentatie",
      current: pathname.includes("/documentation"),
      subItems: [
        {
          label: t("About OpenCatalogi"),
          current: pathname === "/documentation/about",
          handleClick: () => navigate("/documentation/about"),
        },
        {
          label: t("Usage"),
          current: pathname === "/documentation/usage",
          handleClick: () => {
            navigate("/documentation/usage");
          },
        },
        {
          label: t("Contact"),
          current: pathname === "/documentation/contact",
          handleClick: () => {
            navigate("/documentation/contact");
          },
        },
      ],
    },
  ];

  const secondaryTopNavItems = [
    {
      label: t("Login"),
      current: pathname === "/login",
      handleClick: () => {
        open(window.sessionStorage.getItem("ADMIN_DASHBOARD_URL") ?? "#");
      },
      icon: <FontAwesomeIcon icon={faCircleUser} />,
    },
  ];

  React.useEffect(() => {
    if (screenSize === "desktop") {
      setTopNavItems(primaryTopNavItems);
      return;
    }

    setTopNavItems([...primaryTopNavItems, ...secondaryTopNavItems]);
  }, [screenSize, pathname, crumbs]);

  return (
    <header className={clsx(styles.headerContainer, layoutClassName && layoutClassName)}>
      <div className={styles.headerTopBar}>
        <Container layoutClassName={styles.secondaryNavContainer}>
          <SecondaryTopNav items={secondaryTopNavItems} />
        </Container>
      </div>
      <div className={styles.headerMiddleBar}>
        <Container layoutClassName={styles.primaryNavContainer}>
          <div className={clsx(styles.logoContainer, styles.logoDesktop)}>
            <div onClick={() => navigate("/")} className={styles.organizationLogo} />
          </div>

          <PrimaryTopNav
            mobileLogo={
              <div className={clsx(styles.logoContainer, styles.logoMobile)}>
                <div onClick={() => navigate("/")} className={styles.organizationLogo} />
              </div>
            }
            layoutClassName={styles.textColor}
            items={topNavItems}
          />
        </Container>
      </div>

      {pathname === "/" && (
        <Container layoutClassName={styles.headerContent}>
          <section className={clsx(styles.headerSearchForm, styles.section)}>
            <div>
              <Heading1 className={styles.title}>{t("Open Catalogs")}</Heading1>

              <Paragraph lead className={styles.subTitle}>
                {t("One central place for reuse of information technology within the government")}
              </Paragraph>
            </div>
            <SearchComponentTemplate layoutClassName={styles.searchFormContainer} />
          </section>
        </Container>
      )}
      {pathname !== "/" && (
        <Container layoutClassName={styles.breadcrumbsContainer}>
          <Breadcrumbs crumbs={translatedCrumbs} />
        </Container>
      )}
    </header>
  );
};
