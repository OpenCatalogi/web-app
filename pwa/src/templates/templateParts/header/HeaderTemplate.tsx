import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import clsx from "clsx";
import LogoRotterdam from "../../../assets/svgs/LogoRotterdam.svg";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { Container, Logo, PrimaryTopNav, SecondaryTopNav } from "@conduction/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useGatsbyContext } from "../../../context/gatsby";
import { SearchComponentTemplate } from "../searchComponent/SearchComponentTemplate";
import { Heading1, PageHeader, Paragraph } from "@utrecht/component-library-react";
import { isHomepage } from "../../../services/isHomepage";
import { Breadcrumbs } from "../../../components/breadcrumbs/Breadcrumbs";
import { ITopNavItem } from "@conduction/components/lib/components/topNav/primaryTopNav/PrimaryTopNav";
import { useFiltersContext } from "../../../context/filters";
import { useHeaderContent } from "../../../hooks/headerContent";
import { useHeaderTopNavItems } from "../../../hooks/useHeaderTopNavItems";

export const DEFAULT_HEADER_CONTENT_URL =
  "https://raw.githubusercontent.com/OpenCatalogi/web-app/main/pwa/src/templates/templateParts/header/HeaderContent.json";

interface HeaderTemplateProps {
  layoutClassName?: string;
}

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({ layoutClassName }) => {
  const { t } = useTranslation();
  const { filters } = useFiltersContext();
  const [topNavItems, setTopNavItems] = React.useState<ITopNavItem[]>([]);

  const _useHeaderContent = useHeaderContent();
  const getHeaderContent = _useHeaderContent.getContent();

  const { headerTopNavItems } = useHeaderTopNavItems(getHeaderContent.data);

  const {
    pageContext: {
      breadcrumb: { crumbs },
    },
    location: { pathname },
    screenSize,
  } = useGatsbyContext();

  const secondaryTopNavItemsMobile: ITopNavItem[] = [
    {
      label: t("Login"),
      type: "external",
      current: pathname === "/login",
      handleClick: () => {
        open(window.sessionStorage.getItem("ADMIN_DASHBOARD_URL") ?? "#");
      },
      icon: <FontAwesomeIcon icon={faCircleUser} />,
    },
  ];

  const secondaryTopNavItems = [
    {
      label: t("Login"),
      type: "external",
      current: pathname === "/login",
      handleClick: () => {
        open(window.sessionStorage.getItem("ADMIN_DASHBOARD_URL") ?? "#");
      },
      icon: <FontAwesomeIcon icon={faCircleUser} />,
    },
  ];

  React.useEffect(() => {
    if (screenSize === "desktop") {
      setTopNavItems(headerTopNavItems);
      return;
    }

    window.sessionStorage.getItem("HEADER_SHOW_LOGIN") === "true"
      ? setTopNavItems([...headerTopNavItems, ...secondaryTopNavItemsMobile])
      : setTopNavItems(headerTopNavItems);
  }, [screenSize, pathname, crumbs, filters, getHeaderContent.isSuccess]);

  return (
    <PageHeader className={clsx(styles.headerContainer, layoutClassName && layoutClassName)}>
      {window.sessionStorage.getItem("HEADER_SHOW_LOGIN") === "true" && (
        <div className={styles.headerTopBar}>
          <Container layoutClassName={styles.secondaryNavContainer}>
            <SecondaryTopNav items={secondaryTopNavItems} />
          </Container>
        </div>
      )}
      <div className={styles.headerMiddleBar}>
        <Container layoutClassName={styles.primaryNavContainer}>
          <div className={clsx(styles.logoContainer, styles.logoDesktop)}>
            {window.sessionStorage.getItem("HEADER_LOGO_URL") &&
            window.sessionStorage.getItem("HEADER_LOGO_URL") !== "false" ? (
              <img
                onClick={() => navigate("/")}
                src={window.sessionStorage.getItem("HEADER_LOGO_URL") ?? LogoRotterdam}
              />
            ) : (
              <Logo variant="navbar" />
            )}
          </div>
          <PrimaryTopNav
            mobileLogo={
              <div className={clsx(styles.logoContainer, styles.logoMobile)}>
                {window.sessionStorage.getItem("HEADER_LOGO_URL") &&
                window.sessionStorage.getItem("HEADER_LOGO_URL") !== "false" ? (
                  <img
                    onClick={() => navigate("/")}
                    src={window.sessionStorage.getItem("HEADER_LOGO_URL") ?? LogoRotterdam}
                  />
                ) : (
                  <Logo variant="navbar" />
                )}
              </div>
            }
            layoutClassName={styles.textColor}
            items={topNavItems}
          />
        </Container>
      </div>

      {isHomepage(pathname) && (
        <Container layoutClassName={styles.headerContent}>
          <section className={clsx(styles.headerSearchForm, styles.section)}>
            <div>
              <Heading1 className={styles.title}>
                {window.sessionStorage.getItem("JUMBOTRON_TITLE") && window.sessionStorage.getItem("JUMBOTRON_TITLE") !== ""
                  ? window.sessionStorage.getItem("JUMBOTRON_TITLE")
                  : t("Open Catalogs")}
              </Heading1>
              {window.sessionStorage.getItem("JUMBOTRON_SUBTITLE") !== "false" && (
                <span className={styles.subTitle}>
                  {window.sessionStorage.getItem("JUMBOTRON_SUBTITLE") &&
                  window.sessionStorage.getItem("JUMBOTRON_SUBTITLE") !== ""
                    ? window.sessionStorage.getItem("JUMBOTRON_SUBTITLE")
                    : t("One central place for reuse of information technology within the government")}
                </span>
              )}

              {window.sessionStorage.getItem("JUMBOTRON_DESCRIPTION") !== "false" && (
                <Paragraph className={styles.description}>
                  {window.sessionStorage.getItem("JUMBOTRON_DESCRIPTION") &&
                  window.sessionStorage.getItem("JUMBOTRON_DESCRIPTION") !== ""
                    ? window.sessionStorage.getItem("JUMBOTRON_DESCRIPTION")
                    : t("One central place for reuse of information technology within the government")}
                </Paragraph>
              )}
            </div>
            <SearchComponentTemplate layoutClassName={styles.searchFormContainer} />
          </section>
        </Container>
      )}

      <Breadcrumbs />
    </PageHeader>
  );
};
