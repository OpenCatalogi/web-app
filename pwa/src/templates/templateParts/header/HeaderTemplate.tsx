import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import {
  Paragraph,
  Heading,
  BreadcrumbNav,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Icon,
} from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { Container, SecondaryTopNav, PrimaryTopNav } from "@conduction/components";
import { baseFilters, FiltersContext } from "../../../context/filters";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { GatsbyContext } from "../../../context/gatsby";
import { SearchComponentTemplate } from "../searchComponent/SearchComponentTemplate";
import _ from "lodash";
import LogoRotterdam from "../../../assets/svgs/LogoRotterdam.svg";

interface HeaderTemplateProps {
  layoutClassName?: string;
}

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({ layoutClassName }) => {
  const { t } = useTranslation();
  const [isHomePage, setIsHomePage] = React.useState<boolean>(false);
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

  const handleBreadcrumbClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, pathname: string) => {
    e.preventDefault();

    navigate(pathname);
  };

  React.useEffect(() => {
    setIsHomePage(
      pathname === "/" ||
        (process.env.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX === "true" &&
          pathname === `/${process.env.GATSBY_GITHUB_REPOSITORY_NAME}/`),
    );
  }, [pathname]);

  const primaryTopNavItems = [
    {
      label: "Home",
      current:
        pathname === "/" ||
        (process.env.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX === "true" &&
          pathname === `/${process.env.GATSBY_GITHUB_REPOSITORY_NAME}/`),
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
      label: t("Organizations"),
      current: pathname.includes("/organizations"),
      handleClick: () => {
        navigate("/organizations");
      },
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
          label: t("About"),
          current: pathname === "/documentation/about",
          handleClick: () => navigate("/documentation/about"),
        },
        {
          label: t("Use"),
          current: pathname === "/documentation/usage",
          handleClick: () => {
            navigate("/documentation/usage");
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
        open(process.env.ADMIN_DASHBOARD_URL ?? "#");
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
            <img onClick={() => navigate("/")} src={process.env.GATSBY_HEADER_LOGO_URL ?? LogoRotterdam} />
          </div>
          <PrimaryTopNav
            mobileLogo={
              <div className={clsx(styles.logoContainer, styles.logoMobile)}>
                <img onClick={() => navigate("/")} src={process.env.GATSBY_HEADER_LOGO_URL ?? LogoRotterdam} />
              </div>
            }
            layoutClassName={styles.textColor}
            items={topNavItems}
          />
        </Container>
      </div>

      {isHomePage && (
        <Container layoutClassName={styles.headerContent}>
          <section className={clsx(styles.headerSearchForm, styles.section)}>
            <div>
              <Heading level={1} className={styles.title}>
                {t("Open Catalogs")}
              </Heading>

              <Paragraph className={styles.subTitle}>
                {t("One central place for reuse of information technology within the government")}
              </Paragraph>
            </div>
            <SearchComponentTemplate layoutClassName={styles.searchFormContainer} />
          </section>
        </Container>
      )}
      {pathname !== "/" &&
        ((process.env.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX === "true" &&
          pathname !== `/${process.env.GATSBY_GITHUB_REPOSITORY_NAME}/`) ||
          process.env.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX === "false") && (
          <Container layoutClassName={styles.breadcrumbsContainer}>
            {process.env.GATSBY_ARROW_BREADCRUMBS === "true" && (
              <BreadcrumbNav className={styles.breadcrumbs} label={t("Breadcrumbs")} appearance="arrows">
                {translatedCrumbs.map((crumb: any, idx: number) => {
                  if (crumbs.length !== idx + 1) {
                    return (
                      <BreadcrumbLink
                        className={styles.breadcrumbLink}
                        key={idx}
                        onClick={(e) => handleBreadcrumbClick(e, crumb.pathname)}
                        href=""
                      >
                        {crumb.crumbLabel}
                      </BreadcrumbLink>
                    );
                  }
                  return (
                    <BreadcrumbLink key={idx} className={styles.breadcrumbDisabled} current disabled href="">
                      {crumb.crumbLabel}
                    </BreadcrumbLink>
                  );
                })}
              </BreadcrumbNav>
            )}
            {process.env.GATSBY_ARROW_BREADCRUMBS === "false" && (
              <BreadcrumbNav className={styles.breadcrumbs} label={t("Breadcrumbs")}>
                {translatedCrumbs.map((crumb: any, idx: number) => {
                  if (crumbs.length !== idx + 1) {
                    return (
                      <React.Fragment key={idx}>
                        <BreadcrumbLink
                          className={styles.breadcrumbLink}
                          onClick={(e) => handleBreadcrumbClick(e, crumb.pathname)}
                          href=""
                        >
                          {crumb.crumbLabel}
                        </BreadcrumbLink>

                        <BreadcrumbSeparator>
                          <Icon>
                            <FontAwesomeIcon icon={faChevronRight} />
                          </Icon>
                        </BreadcrumbSeparator>
                      </React.Fragment>
                    );
                  }
                  return (
                    <BreadcrumbLink key={idx} className={styles.breadcrumbDisabled} current disabled href="">
                      {crumb.crumbLabel}
                    </BreadcrumbLink>
                  );
                })}
              </BreadcrumbNav>
            )}
          </Container>
        )}
    </header>
  );
};
