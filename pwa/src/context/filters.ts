import * as React from "react";
import { GlobalContext } from "./global";

export interface IFiltersContext {
  isForked: boolean;
  orderRating: boolean;
  rating: number;
  ratingCommonground: number;

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
  isWindow && !isNaN(parseInt(window.sessionStorage.getItem("FILTER_RATING_DEFAULT") ?? ""))
    ? parseInt(window.sessionStorage.getItem("FILTER_RATING_DEFAULT") ?? "")
    : 0;

export const defaultFiltersContext: IFiltersContext = {
  isForked:
    isWindow && window.sessionStorage.getItem("FILTER_FORKS")
      ? window.sessionStorage.getItem("FILTER_FORKS") === "true"
        ? true
        : false
      : false,

  orderRating:
    isWindow && window.sessionStorage.getItem("FILTER_RATING")
      ? window.sessionStorage.getItem("FILTER_RATING") !== "false"
        ? true
        : false
      : false,
  rating:
    isWindow && window.sessionStorage.getItem("FILTER_RATING")
      ? window.sessionStorage.getItem("FILTER_RATING") !== "false"
        ? ratingDefault
        : 0
      : 0,
  ratingCommonground:
    isWindow && window.sessionStorage.getItem("FILTER_RATING")
      ? window.sessionStorage.getItem("FILTER_RATING") !== "false"
        ? ratingDefault
        : 0
      : 0,

  _search: "",
  organizationSearch: "",
  softwareType:
    isWindow && window.sessionStorage.getItem("FILTER_SOFTWARE_TYPE")
      ? window.sessionStorage.getItem("FILTER_SOFTWARE_TYPE") !== "false"
        ? window.sessionStorage.getItem("FILTER_SOFTWARE_TYPE") ?? ""
        : ""
      : "",

  developmentStatus:
    isWindow && window.sessionStorage.getItem("FILTER_STATUS")
      ? window.sessionStorage.getItem("FILTER_STATUS") !== "false"
        ? window.sessionStorage.getItem("FILTER_STATUS") ?? ""
        : ""
      : "",
  platforms:
    isWindow && window.sessionStorage.getItem("FILTER_PLATFORMS")
      ? window.sessionStorage.getItem("FILTER_PLATFORMS") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_PLATFORMS") ?? "")]
        : []
      : [],
  category:
    isWindow && window.sessionStorage.getItem("FILTER_CATEGORY")
      ? window.sessionStorage.getItem("FILTER_CATEGORY") !== "false"
        ? window.sessionStorage.getItem("FILTER_CATEGORY") ?? ""
        : ""
      : "",
  "embedded.nl.embedded.commonground.layerType":
    isWindow && window.sessionStorage.getItem("FILTER_LAYER")
      ? window.sessionStorage.getItem("FILTER_LAYER") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_LAYER") ?? "")]
        : []
      : [],
  "embedded.nl.embedded.gemma.bedrijfsfuncties":
    isWindow && window.sessionStorage.getItem("FILTER_BUSINESS_FUNCTIONS")
      ? window.sessionStorage.getItem("FILTER_BUSINESS_FUNCTIONS") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_BUSINESS_FUNCTIONS") ?? "")]
        : []
      : [],
  "embedded.nl.embedded.gemma.bedrijfsservices":
    isWindow && window.sessionStorage.getItem("FILTER_BUSINESS_SERVICES")
      ? window.sessionStorage.getItem("FILTER_BUSINESS_SERVICES") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_BUSINESS_SERVICES") ?? "")]
        : []
      : [],
  "embedded.nl.embedded.gemma.referentieComponenten":
    isWindow && window.sessionStorage.getItem("FILTER_REFERENCE_COMPONENTS")
      ? window.sessionStorage.getItem("FILTER_REFERENCE_COMPONENTS") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_REFERENCE_COMPONENTS") ?? "")]
        : []
      : [],
  "embedded.nl.embedded.gemma.applicatiefunctie": "",
  "embedded.nl.embedded.upl":
    isWindow && window.sessionStorage.getItem("FILTER_UPL")
      ? window.sessionStorage.getItem("FILTER_UPL") !== "false"
        ? [...JSON.parse(window.sessionStorage.getItem("FILTER_UPL") ?? "")]
        : []
      : [],
  "embedded.maintenance.type":
    isWindow && window.sessionStorage.getItem("FILTER_MAINTENANCE_TYPES")
      ? window.sessionStorage.getItem("FILTER_MAINTENANCE_TYPES") !== "false"
        ? window.sessionStorage.getItem("FILTER_MAINTENANCE_TYPES") ?? ""
        : ""
      : "",
  "embedded.legal.license":
    isWindow && window.sessionStorage.getItem("FILTER_LICENSE")
      ? window.sessionStorage.getItem("FILTER_LICENSE") !== "false"
        ? window.sessionStorage.getItem("FILTER_LICENSE") ?? ""
        : ""
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
