import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import { Heading1, LeadParagraph } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { Container, SecondaryTopNav, Breadcrumbs, PrimaryTopNav } from "@conduction/components";
import { FiltersContext } from "../../../context/filters";
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

  const setNewFilters = (newFilters: any) => {
    const resets = {
      search: undefined,
      softwareType: undefined,
      developmentStatus: undefined,
      platforms: [],
      category: undefined,
      "nl.commonground.layerType": [],
      "nl.gemma.bedrijfsfuncties": [],
      "nl.gemma.bedrijfsservices": [],
      "nl.gemma.referentieComponenten": [],
      "nl.gemma.applicatiefunctie": undefined,
      "nl.upl": [],
      "maintenance.type": undefined,
      "legal.license": undefined,
      "legal.mainCopyrightOwner": undefined,
    };
    setFilters({ ...filters, ...resets, ...newFilters });
  };

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
      current: pathname === "/categories",
      handleClick: () => {
        navigate("/categories");
      },
    },
    {
      label: t("Applications"),
      current: pathname === "/applications",
      handleClick: () => {
        navigate("/applications");
      },
    },
    {
      label: t("Components"),
      current: pathname.includes("/components"),
      subItems: [
        {
          label: t("Processes"),
          current: pathname === "/components" && filters.softwareType === "process",
          handleClick: () => {
            setNewFilters({ softwareType: "process" });
            navigate("/components");
          },
        },
        {
          label: t("Data models"),
          current: pathname === "/components" && filters.softwareType === "schema",
          handleClick: () => {
            setNewFilters({ softwareType: "schema" });
            navigate("/components");
          },
        },
        {
          label: t("API's"),
          current: pathname === "/components" && filters.softwareType === "api",
          handleClick: () => {
            setNewFilters({ softwareType: "api" });
            navigate("/components");
          },
        },
      ],
    },
    {
      label: t("Initiatives"),
      current: pathname === "/components" && filters.developmentStatus === "concept",
      handleClick: () => {
        setNewFilters({ developmentStatus: "concept" });
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
        open("https://admin.opencatalogi.nl/");
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
      <div>
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
      {pathname !== "/" && (
        <Container layoutClassName={styles.breadcrumbsContainer}>
          <Breadcrumbs crumbs={translatedCrumbs} />
        </Container>
      )}
    </header>
  );
};
