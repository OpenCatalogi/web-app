import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import clsx from "clsx";
import LogoRotterdam from "../../../assets/svgs/LogoRotterdam.svg";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { Container, Jumbotron, PrimaryTopNav, SecondaryTopNav } from "@conduction/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useGatsbyContext } from "../../../context/gatsby";
import { SearchComponentTemplate } from "../searchComponent/SearchComponentTemplate";
import { PageHeader } from "@utrecht/component-library-react";
import { isHomepage } from "../../../services/isHomepage";
import { Breadcrumbs } from "../../../components/breadcrumbs/Breadcrumbs";
import { ITopNavItem } from "@conduction/components/lib/components/topNav/primaryTopNav/PrimaryTopNav";
import { IFiltersContext, defaultFiltersContext, useFiltersContext } from "../../../context/filters";
import { useHeaderContent } from "../../../hooks/headerContent";
import { useHeaderTopNavItems } from "../../../hooks/useHeaderTopNavItems";

export const DEFAULT_HEADER_CONTENT_URL =
  "https://raw.githubusercontent.com/OpenCatalogi/web-app/348679b7537b20e51767dfdc6086349602afe219/pwa/src/templates/templateParts/header/HeaderContent.json";

interface HeaderTemplateProps {
  layoutClassName?: string;
}

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({ layoutClassName }) => {
  const { t } = useTranslation();
  const [topNavItems, setTopNavItems] = React.useState<ITopNavItem[]>([]);
  const { filters, setFilters } = useFiltersContext();

  const _useHeaderContent = useHeaderContent();
  const getHeaderContent = _useHeaderContent.getContent();
  const data = require("./HeaderContent.json");
  const { headerTopNavItems } = useHeaderTopNavItems(data);

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
        open(process.env.ADMIN_DASHBOARD_URL ?? "#");
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
        open(process.env.ADMIN_DASHBOARD_URL ?? "#");
      },
      icon: <FontAwesomeIcon icon={faCircleUser} />,
    },
  ];

  React.useEffect(() => {
    if (screenSize === "desktop") {
      setTopNavItems(headerTopNavItems);

      return;
    }

    process.env.GATSBY_HEADER_SHOW_LOGIN === "true"
      ? setTopNavItems([...headerTopNavItems, ...secondaryTopNavItemsMobile])
      : setTopNavItems(headerTopNavItems);
  }, [screenSize, pathname, crumbs, filters, getHeaderContent.isSuccess]);

  return (
    <PageHeader className={clsx(styles.headerContainer, layoutClassName && layoutClassName)}>
      {process.env.GATSBY_HEADER_SHOW_LOGIN === "true" && (
        <div className={styles.headerTopBar}>
          <Container layoutClassName={styles.secondaryNavContainer}>
            <SecondaryTopNav items={secondaryTopNavItems} />
          </Container>
        </div>
      )}
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

      {isHomepage(pathname) && (
        <Jumbotron
          title={
            process.env.GATSBY_JUMBOTRON_TITLE && process.env.GATSBY_JUMBOTRON_TITLE !== ""
              ? process.env.GATSBY_JUMBOTRON_TITLE
              : t("Open Catalogs")
          }
          ariaLabel={{ container: t("Jumbotron"), card: t("Jumbotron card") }}
          role="contentinfo"
          isCard={
            process.env.GATSBY_JUMBOTRON_ISCARD && process.env.GATSBY_JUMBOTRON_ISCARD !== ""
              ? process.env.GATSBY_JUMBOTRON_ISCARD === "true" && true
              : false
          }
          container={
            process.env.GATSBY_JUMBOTRON_CONTAINER && process.env.GATSBY_JUMBOTRON_CONTAINER !== ""
              ? process.env.GATSBY_JUMBOTRON_CONTAINER === "true" && true
              : false
          }
          subTitle={process.env.GATSBY_JUMBOTRON_SUBTITLE && process.env.GATSBY_JUMBOTRON_SUBTITLE}
          description={
            process.env.GATSBY_JUMBOTRON_DESCRIPTION && process.env.GATSBY_JUMBOTRON_DESCRIPTION !== ""
              ? process.env.GATSBY_JUMBOTRON_DESCRIPTION
              : t("One central place for reuse of information technology within the government")
          }
          searchForm={{
            element: <SearchComponentTemplate layoutClassName={styles.searchFormContainer} />,
            show:
              process.env.GATSBY_JUMBOTRON_SEARCHFORM && process.env.GATSBY_JUMBOTRON_SEARCHFORM !== ""
                ? process.env.GATSBY_JUMBOTRON_SEARCHFORM === "true" && true
                : false,
          }}
          image={{
            placement:
              process.env.GATSBY_JUMBOTRON_IMAGE_PLACEMENT && process.env.GATSBY_JUMBOTRON_IMAGE_PLACEMENT !== ""
                ? process.env.GATSBY_JUMBOTRON_IMAGE_PLACEMENT === "background"
                  ? "background"
                  : process.env.GATSBY_JUMBOTRON_IMAGE_PLACEMENT === "right"
                  ? "right"
                  : "false"
                : "false",
            url:
              process.env.GATSBY_JUMBOTRON_IMAGE_URL && process.env.GATSBY_JUMBOTRON_IMAGE_URL !== ""
                ? process.env.GATSBY_JUMBOTRON_IMAGE_URL
                : "",
          }}
        />
      )}

      <Breadcrumbs />
    </PageHeader>
  );
};
