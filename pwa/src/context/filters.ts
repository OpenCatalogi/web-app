import * as React from "react";
import { GlobalContext } from "./global";

export interface IFiltersContext {
  isForked: string;
  orderRating: string;
  rating: string;
  ratingCommonground: string;

  _search?: string;
  organizationSearch?: string;
  softwareType?: string;
  developmentStatus?: string;
  platforms?: string[];
  category?: string;
  "embedded.nl.embedded.commonground.layerType"?: string[];
  "embedded.nl.embedded.gemma.bedrijfsfuncties"?: string[];
  "embedded.nl.embedded.gemma.bedrijfsservices"?: string[];
  "embedded.nl.embedded.gemma.referentieComponenten"?: string[];
  "embedded.nl.embedded.gemma.applicatiefunctie"?: string;
  "embedded.nl.embedded.upl"?: string[];
  "embedded.maintenance.type"?: string;
  "embedded.legal.license"?: string;
  "embedded.legal.mainCopyrightOwner"?: string;
  "embedded.url.embedded.organisation.name"?: string;

  showMoreControl?: boolean;
  showMoreSupport?: boolean;
}

const isWindow = typeof window !== "undefined";

export const ratingDefault =
  isWindow && window.sessionStorage.getItem("FILTER_RATING_DEFAULT")
    ? window.sessionStorage.getItem("FILTER_RATING_DEFAULT") ?? "0"
    : process.env.GATSBY_FILTER_RATING_DEFAULT ?? "0";

export const defaultFiltersContext: IFiltersContext = {
  isForked:
    isWindow && window.sessionStorage.getItem("FILTER_FORKS")
      ? window.sessionStorage.getItem("FILTER_FORKS") === "true"
        ? "true"
        : "false"
      : process.env.GATSBY_FILTER_FORKS ?? "false",

  orderRating:
    isWindow && window.sessionStorage.getItem("FILTER_RATING")
      ? window.sessionStorage.getItem("FILTER_RATING") !== "false"
        ? "true"
        : "false"
      : process.env.GATSBY_RATING ?? "false",
  rating:
    isWindow && window.sessionStorage.getItem("FILTER_RATING")
      ? window.sessionStorage.getItem("FILTER_RATING") !== "false"
        ? ratingDefault
        : "0"
      : process.env.GATSBY_FILTER_RATING_DEFAULT && process.env.GATSBY_FILTER_RATING !== "false"
        ? process.env.GATSBY_FILTER_RATING_DEFAULT
        : "0",
  ratingCommonground:
    isWindow && window.sessionStorage.getItem("FILTER_RATING")
      ? window.sessionStorage.getItem("FILTER_RATING") !== "false"
        ? ratingDefault
        : "0"
      : process.env.GATSBY_FILTER_RATING_DEFAULT && process.env.GATSBY_FILTER_RATING !== "false"
        ? process.env.GATSBY_FILTER_RATING_DEFAULT
        : "0",

  _search: "",
  organizationSearch: "",
  softwareType:
    isWindow && window.sessionStorage.getItem("FILTER_SOFTWARE_TYPE")
      ? window.sessionStorage.getItem("FILTER_SOFTWARE_TYPE") !== "false"
        ? window.sessionStorage.getItem("FILTER_SOFTWARE_TYPE") ?? ""
        : ""
      : process.env.GATSBY_FILTER_SOFTWARE_TYPE && process.env.GATSBY_FILTER_SOFTWARE_TYPE !== "false"
        ? process.env.GATSBY_FILTER_SOFTWARE_TYPE
        : "",

  developmentStatus:
    isWindow && window.sessionStorage.getItem("FILTER_STATUS")
      ? window.sessionStorage.getItem("FILTER_STATUS") !== "false"
        ? window.sessionStorage.getItem("FILTER_STATUS") ?? ""
        : ""
      : process.env.GATSBY_FILTER_STATUS && process.env.GATSBY_FILTER_STATUS !== "false"
        ? process.env.GATSBY_FILTER_STATUS
        : "",
  platforms:
    isWindow && window.sessionStorage.getItem("FILTER_PLATFORMS")
      ? window.sessionStorage.getItem("FILTER_PLATFORMS") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_PLATFORMS") ?? "")]
        : []
      : process.env.GATSBY_FILTER_PLATFORMS !== "false" && process.env.GATSBY_FILTER_PLATFORMS !== ""
        ? [...JSON.parse(process.env.GATSBY_FILTER_PLATFORMS ?? "")]
        : [],
  category:
    isWindow && window.sessionStorage.getItem("FILTER_CATEGORY")
      ? window.sessionStorage.getItem("FILTER_CATEGORY") !== "false"
        ? window.sessionStorage.getItem("FILTER_CATEGORY") ?? ""
        : ""
      : process.env.GATSBY_FILTER_CATEGORY && process.env.GATSBY_FILTER_CATEGORY !== "false"
        ? process.env.GATSBY_FILTER_CATEGORY
        : "",
  "embedded.nl.embedded.commonground.layerType":
    isWindow && window.sessionStorage.getItem("FILTER_LAYER")
      ? window.sessionStorage.getItem("FILTER_LAYER") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_LAYER") ?? "")]
        : []
      : process.env.GATSBY_FILTER_LAYER !== "false" && process.env.GATSBY_FILTER_LAYER
        ? [...JSON.parse(process.env.GATSBY_FILTER_LAYER ?? "")]
        : [],
  "embedded.nl.embedded.gemma.bedrijfsfuncties":
    isWindow && window.sessionStorage.getItem("FILTER_BUSINESS_FUNCTIONS")
      ? window.sessionStorage.getItem("FILTER_BUSINESS_FUNCTIONS") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_BUSINESS_FUNCTIONS") ?? "")]
        : []
      : process.env.GATSBY_FILTER_BUSINESS_FUNCTIONS !== "false" && process.env.GATSBY_FILTER_BUSINESS_FUNCTIONS
        ? [...JSON.parse(process.env.GATSBY_FILTER_BUSINESS_FUNCTIONS ?? "")]
        : [],
  "embedded.nl.embedded.gemma.bedrijfsservices":
    isWindow && window.sessionStorage.getItem("FILTER_BUSINESS_SERVICES")
      ? window.sessionStorage.getItem("FILTER_BUSINESS_SERVICES") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_BUSINESS_SERVICES") ?? "")]
        : []
      : process.env.GATSBY_FILTER_BUSINESS_SERVICES !== "false" && process.env.GATSBY_FILTER_BUSINESS_SERVICES
        ? [...JSON.parse(process.env.GATSBY_FILTER_BUSINESS_SERVICES ?? "")]
        : [],
  "embedded.nl.embedded.gemma.referentieComponenten":
    isWindow && window.sessionStorage.getItem("FILTER_REFERENCE_COMPONENTS")
      ? window.sessionStorage.getItem("FILTER_REFERENCE_COMPONENTS") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_REFERENCE_COMPONENTS") ?? "")]
        : []
      : process.env.GATSBY_FILTER_REFERENCE_COMPONENTS !== "false" && process.env.GATSBY_FILTER_REFERENCE_COMPONENTS
        ? [...JSON.parse(process.env.GATSBY_FILTER_REFERENCE_COMPONENTS ?? "")]
        : [],
  "embedded.nl.embedded.gemma.applicatiefunctie": "",
  "embedded.nl.embedded.upl":
    isWindow && window.sessionStorage.getItem("FILTER_UPL")
      ? window.sessionStorage.getItem("FILTER_UPL") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_UPL") ?? "")]
        : []
      : process.env.GATSBY_FILTER_UPL !== "false" && process.env.GATSBY_FILTER_UPL
        ? [...JSON.parse(process.env.GATSBY_FILTER_UPL ?? "")]
        : [],
  "embedded.maintenance.type":
    isWindow && window.sessionStorage.getItem("FILTER_MAINTENANCE_TYPES")
      ? window.sessionStorage.getItem("FILTER_MAINTENANCE_TYPES") !== "false"
        ? window.sessionStorage.getItem("FILTER_MAINTENANCE_TYPES") ?? ""
        : ""
      : process.env.GATSBY_FILTER_MAINTENEANCE_TYPES && process.env.GATSBY_FILTER_MAINTENEANCE_TYPES !== "false"
        ? process.env.GATSBY_FILTER_MAINTENEANCE_TYPES
        : "",
  "embedded.legal.license":
    isWindow && window.sessionStorage.getItem("FILTER_LICENSE")
      ? window.sessionStorage.getItem("FILTER_LICENSE") !== "false"
        ? window.sessionStorage.getItem("FILTER_LICENSE") ?? ""
        : ""
      : process.env.GATSBY_FILTER_LICENSE && process.env.GATSBY_FILTER_LICENSE !== "false"
        ? process.env.GATSBY_FILTER_LICENSE
        : "",
};

export const useFiltersContext = () => {
  const [globalContext, setGlobalContext] = React.useContext(GlobalContext);

  const filters: IFiltersContext = globalContext.filters;

  const setFilters = (newFilters: IFiltersContext) => {
    setGlobalContext((oldGlobalContext) => ({
      ...oldGlobalContext,
      filters: newFilters,
    }));
  };

  return { setFilters, filters };
};
