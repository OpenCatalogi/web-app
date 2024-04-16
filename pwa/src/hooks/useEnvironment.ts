import * as React from "react";
import { getConfig } from "../services/getConfig";
import { uniqueId } from "lodash";

export const useEnvironment = () => {
  const [, setSessionStorageUpdatedId] = React.useState("-1");

  const handleStorageChange = () => {
    setSessionStorageUpdatedId(uniqueId());
    themeSwitcherMiddleware();
  };

  const updateSessionStorage = () => {
    window.dispatchEvent(new Event("sessionStorageChange"));
  };

  React.useEffect(() => {
    window.addEventListener("sessionStorageChange", handleStorageChange);

    return () => {
      window.removeEventListener("sessionStorageChange", handleStorageChange);
    };
  }, []);

  const initiateFromEnv = () => {
    window.sessionStorage.setItem("SHOW_THEME_SWITCHER", process.env.GATSBY_SHOW_THEME_SWITCHER ?? "");
    window.sessionStorage.setItem("GITHUB_REPOSITORY_NAME", process.env.GATSBY_GITHUB_REPOSITORY_NAME ?? "");
    window.sessionStorage.setItem(
      "USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX",
      process.env.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX ?? "",
    );
    window.sessionStorage.setItem("API_URL", process.env.GATSBY_API_URL ?? "");
    window.sessionStorage.setItem("BASE_URL", process.env.GATSBY_BASE_URL ?? "");
    window.sessionStorage.setItem("NL_DESIGN_THEME_CLASSNAME", process.env.GATSBY_NL_DESIGN_THEME_CLASSNAME ?? "");
    window.sessionStorage.setItem("GITHUB_ORGANIZATION_URL", process.env.GATSBY_GITHUB_ORGANIZATION_URL ?? "");
    window.sessionStorage.setItem("FAVICON_URL", process.env.GATSBY_FAVICON_URL ?? "");
    window.sessionStorage.setItem("PAGE_TITLE", process.env.GATSBY_PAGE_TITLE ?? "");
    window.sessionStorage.setItem("HEADER_LOGO_URL", process.env.GATSBY_HEADER_LOGO_URL ?? "");
    window.sessionStorage.setItem("HEADER_SHOW_LOGIN", process.env.GATSBY_HEADER_SHOW_LOGIN ?? "");
    window.sessionStorage.setItem("HEADER_CONTENT", process.env.GATSBY_HEADER_CONTENT ?? "");
    window.sessionStorage.setItem("JUMBOTRON_TITLE", process.env.GATSBY_JUMBOTRON_TITLE ?? "");
    window.sessionStorage.setItem("JUMBOTRON_SUBTITLE", process.env.GATSBY_JUMBOTRON_SUBTITLE ?? "");
    window.sessionStorage.setItem("JUMBOTRON_DESCRIPTION", process.env.GATSBY_JUMBOTRON_DESCRIPTION ?? "");
    window.sessionStorage.setItem("FOOTER_SHOW_CREATOR", process.env.GATSBY_FOOTER_SHOW_CREATOR ?? "");
    window.sessionStorage.setItem("FOOTER_LOGO_URL", process.env.GATSBY_FOOTER_LOGO_URL ?? "");
    window.sessionStorage.setItem("FOOTER_CONTENT", process.env.GATSBY_FOOTER_CONTENT ?? "");
    window.sessionStorage.setItem("FOOTER_CONTENT_HEADER", process.env.GATSBY_FOOTER_CONTENT_HEADER ?? "");
    window.sessionStorage.setItem("OPTIONAL_START_PAGE", process.env.GATSBY_OPTIONAL_START_PAGE ?? "");

    window.sessionStorage.setItem("COMMONGROUND_CHARTS", process.env.GATSBY_COMMONGROUND_CHARTS ?? "false");

    window.sessionStorage.setItem("FILTER_FORKS", process.env.GATSBY_FILTER_FORKS ?? "");
    window.sessionStorage.setItem("FILTER_RATING", process.env.GATSBY_FILTER_RATING ?? "OpenCatalogi");
    window.sessionStorage.setItem("FILTER_RATING_DEFAULT", process.env.FILTER_RATING_DEFAULT ?? "");
    window.sessionStorage.setItem("FILTER_LAYER", process.env.GATSBY_FILTER_LAYER ?? "");
    window.sessionStorage.setItem("FILTER_UPL", process.env.GATSBY_FILTER_UPL ?? "");
    window.sessionStorage.setItem("FILTER_ORGANISATION", process.env.GATSBY_FILTER_ORGANISATION ?? "");
    window.sessionStorage.setItem("FILTER_CATEGORY", process.env.GATSBY_FILTER_CATEGORY ?? "");
    window.sessionStorage.setItem("FILTER_PLATFORMS", process.env.GATSBY_FILTER_PLATFORMS ?? "");
    window.sessionStorage.setItem("FILTER_STATUS", process.env.GATSBY_FILTER_STATUS ?? "");
    window.sessionStorage.setItem("FILTER_MAINTENANCE_TYPES", process.env.GATSBY_FILTER_MAINTENANCE_TYPES ?? "");
    window.sessionStorage.setItem("FILTER_LICENSE", process.env.GATSBY_FILTER_LICENSE ?? "");
    window.sessionStorage.setItem("FILTER_BUSINESS_FUNCTIONS", process.env.GATSBY_FILTER_BUSINESS_FUNCTIONS ?? "");
    window.sessionStorage.setItem("FILTER_SOFTWARE_TYPE", process.env.GATSBY_FILTER_SOFTWARE_TYPE ?? "");
    window.sessionStorage.setItem("FILTER_BUSINESS_SERVICES", process.env.GATSBY_FILTER_BUSINESS_SERVICES ?? "");
    window.sessionStorage.setItem("FILTER_REFERENCE_COMPONENTS", process.env.GATSBY_FILTER_REFERENCE_COMPONENTS ?? "");

    updateSessionStorage();
  };

  const initiateFromJSON = (themeOrDomainName: string) => {
    const config = getConfig(themeOrDomainName);

    if (!config) return; // no config found, nothing else to do

    window.sessionStorage.setItem("SHOW_THEME_SWITCHER", config.GATSBY_SHOW_THEME_SWITCHER ?? "");
    window.sessionStorage.setItem("GITHUB_REPOSITORY_NAME", config.GATSBY_GITHUB_REPOSITORY_NAME ?? "");
    window.sessionStorage.setItem(
      "USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX",
      config.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX ?? "",
    );
    window.sessionStorage.setItem("API_URL", config.GATSBY_API_URL ?? "");
    window.sessionStorage.setItem("BASE_URL", config.GATSBY_BASE_URL ?? "");
    window.sessionStorage.setItem("NL_DESIGN_THEME_CLASSNAME", config.GATSBY_NL_DESIGN_THEME_CLASSNAME ?? "");
    window.sessionStorage.setItem("GITHUB_ORGANIZATION_URL", config.GATSBY_GITHUB_ORGANIZATION_URL ?? "");
    window.sessionStorage.setItem("FAVICON_URL", config.GATSBY_FAVICON_URL ?? "");
    window.sessionStorage.setItem("PAGE_TITLE", config.GATSBY_PAGE_TITLE ?? "");
    window.sessionStorage.setItem("HEADER_LOGO_URL", config.GATSBY_HEADER_LOGO_URL ?? "");
    window.sessionStorage.setItem("HEADER_SHOW_LOGIN", config.GATSBY_HEADER_SHOW_LOGIN ?? "");
    window.sessionStorage.setItem("HEADER_CONTENT", config.GATSBY_HEADER_CONTENT ?? "");
    window.sessionStorage.setItem("JUMBOTRON_TITLE", config.GATSBY_JUMBOTRON_TITLE ?? "");
    window.sessionStorage.setItem("JUMBOTRON_SUBTITLE", config.GATSBY_JUMBOTRON_SUBTITLE ?? "");
    window.sessionStorage.setItem("JUMBOTRON_ISCARD", config.GATSBY_JUMBOTRON_ISCARD ?? "");
    window.sessionStorage.setItem("FOOTER_SHOW_CREATOR", config.GATSBY_FOOTER_SHOW_CREATOR ?? "");
    window.sessionStorage.setItem("FOOTER_LOGO_URL", config.GATSBY_FOOTER_LOGO_URL ?? "");
    window.sessionStorage.setItem("FOOTER_CONTENT", config.GATSBY_FOOTER_CONTENT ?? "");
    window.sessionStorage.setItem("FOOTER_CONTENT_HEADER", config.GATSBY_FOOTER_CONTENT_HEADER ?? "");
    window.sessionStorage.setItem("OPTIONAL_START_PAGE", config.GATSBY_OPTIONAL_START_PAGE ?? "");

    window.sessionStorage.setItem("COMMONGROUND_CHARTS", config.GATSBY_COMMONGROUND_CHARTS ?? "false");

    window.sessionStorage.setItem("FILTER_FORKS", config.GATSBY_FILTER_FORKS ?? "");
    window.sessionStorage.setItem("FILTER_RATING", config.GATSBY_FILTER_RATING ?? "OpenCatalogi");
    window.sessionStorage.setItem("FILTER_RATING_DEFAULT", config.FILTER_RATING_DEFAULT ?? "");
    window.sessionStorage.setItem("FILTER_LAYER", config.GATSBY_FILTER_LAYER ?? "");
    window.sessionStorage.setItem("FILTER_UPL", config.GATSBY_FILTER_UPL ?? "");
    window.sessionStorage.setItem("FILTER_ORGANISATION", config.GATSBY_FILTER_ORGANISATION ?? "");
    window.sessionStorage.setItem("FILTER_CATEGORY", config.GATSBY_FILTER_CATEGORY ?? "");
    window.sessionStorage.setItem("FILTER_PLATFORMS", config.GATSBY_FILTER_PLATFORMS ?? "");
    window.sessionStorage.setItem("FILTER_STATUS", config.GATSBY_FILTER_STATUS ?? "");
    window.sessionStorage.setItem("FILTER_MAINTENANCE_TYPES", config.GATSBY_FILTER_MAINTENANCE_TYPES ?? "");
    window.sessionStorage.setItem("FILTER_LICENSE", config.GATSBY_FILTER_LICENSE ?? "");
    window.sessionStorage.setItem("FILTER_BUSINESS_FUNCTIONS", config.GATSBY_FILTER_BUSINESS_FUNCTIONS ?? "");
    window.sessionStorage.setItem("FILTER_SOFTWARE_TYPE", config.GATSBY_FILTER_SOFTWARE_TYPE ?? "");
    window.sessionStorage.setItem("FILTER_BUSINESS_SERVICES", config.GATSBY_FILTER_BUSINESS_SERVICES ?? "");
    window.sessionStorage.setItem("FILTER_REFERENCE_COMPONENTS", config.GATSBY_FILTER_REFERENCE_COMPONENTS ?? "");
    updateSessionStorage();
  };

  const themeSwitcherMiddleware = () => {
    switch (window.location.hostname) {
      case "koophulpje.nl":
        // case "localhost": // development purposes
        window.sessionStorage.setItem("SHOW_THEME_SWITCHER", "true");
        break;
    }

    if (process.env.GATSBY_SHOW_THEME_SWITCHER === "true") window.sessionStorage.setItem("SHOW_THEME_SWITCHER", "true");
  };

  return { initiateFromEnv, initiateFromJSON };
};
