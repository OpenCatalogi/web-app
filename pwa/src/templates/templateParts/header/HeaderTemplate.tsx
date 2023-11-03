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

export const DEFAULT_HEADER_CONTENT_URL =
  "https://raw.githubusercontent.com/OpenCatalogi/web-app/348679b7537b20e51767dfdc6086349602afe219/pwa/src/templates/templateParts/header/HeaderContent.json";

interface HeaderTemplateProps {
  layoutClassName?: string;
}

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({ layoutClassName }) => {
  const { t } = useTranslation();
  const [topNavItems, setTopNavItems] = React.useState<ITopNavItem[]>([]);

  const {
    pageContext: {
      breadcrumb: { crumbs },
    },
    location: { pathname },
    screenSize,
  } = useGatsbyContext();

  const { filters, setFilters } = useFiltersContext();
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

  const _useHeaderContent = useHeaderContent();
  const getHeaderContent = _useHeaderContent.getContent();

  React.useEffect(() => {
    const itemsArray: ITopNavItem[] = [];

    getHeaderContent.isSuccess &&
      getHeaderContent.data.map((item: any) => {
        const isCurrent = (current: any) => {
          if (current && !current.filterCondition) {
            switch (current.operator) {
              case "equals":
                if (process.env.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX === "true") {
                  return pathname === `/${process.env.GATSBY_GITHUB_REPOSITORY_NAME}${current.pathname}`;
                } else {
                  return pathname === current.pathname;
                }

              case "includes":
                return pathname.includes(current.pathname);
            }
          }
          if (current && current.filterCondition) {
            switch (current.operator) {
              case "equals":
                if (process.env.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX === "true") {
                  return pathname === `/${process.env.GATSBY_GITHUB_REPOSITORY_NAME}${current.pathname}` &&
                    current.filterCondition?.isObject === true
                    ? filters[current.filterCondition.filter as keyof IFiltersContext]
                        ?.toString()
                        .includes(current.filterCondition.value)
                    : filters[current.filterCondition.filter as keyof IFiltersContext] === current.filterConditon.value;
                } else {
                  return pathname === current.pathname && current.filterCondition?.isObject === true
                    ? filters[current.filterCondition.filter as keyof IFiltersContext]
                        ?.toString()
                        ?.includes(current.filterCondition.value)
                    : filters[current.filterCondition.filter as keyof IFiltersContext] === current.filterConditon.value;
                }

              case "includes":
                return current.filterCondition?.isObject === true
                  ? pathname.includes(current.pathname) &&
                      filters[current.filterCondition.filter as keyof IFiltersContext]
                        ?.toString()
                        ?.includes(current.filterCondition?.value)
                  : pathname.includes(current.pathname) &&
                      filters[current.filterCondition.filter as keyof IFiltersContext] ===
                        current.filterCondition?.value;
            }
          }
        };

        const getOnClick = (onClick: any, type: "readme" | "internal" | "external", label: string) => {
          if (!onClick || !type || !label) return;

          if (onClick.link && !onClick.setFilter) {
            if (type === "internal") {
              navigate(onClick.link);
            }
            if (type === "external") {
              open(onClick.link);
            }
            if (type === "readme") {
              navigate(`/github/${label.replaceAll(" ", "_")}/?link=${onClick.link}`);
            }
          }
          if (onClick.link && onClick.setFilter && type === "internal") {
            onClick.setFilter?.isObject === true
              ? setFilters({ ...defaultFiltersContext, [onClick.setFilter!.filter]: [onClick.setFilter!.value] })
              : setFilters({ ...defaultFiltersContext, [onClick.setFilter!.filter]: onClick.setFilter!.value });
            navigate(onClick.link);
          }
        };

        const setSubItems = (subItems: ITopNavItem[]) => {
          if (!subItems) return;
          const subItemsArray: ITopNavItem[] = [];

          subItems.map((item: any) => {
            subItemsArray.push({
              label: t(item.label),
              type: item.type,
              current: isCurrent(item.current),
              handleClick: () => getOnClick(item.handleClick, item.type, item.label),
            });
          });

          const subItemsObject = Object.assign(subItemsArray);

          return subItemsObject;
        };

        itemsArray.push({
          label: t(item.label),
          type: item.type,
          current: isCurrent(item.current),
          handleClick: () => getOnClick(item.handleClick, item.type, item.label),
          subItems: setSubItems(item.subItems),
        });
      });

    if (screenSize === "desktop") {
      setTopNavItems(itemsArray);

      return;
    }

    process.env.GATSBY_HEADER_SHOW_LOGIN === "true"
      ? setTopNavItems([...itemsArray, ...secondaryTopNavItemsMobile])
      : setTopNavItems(itemsArray);
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
