import _ from "lodash";

export const filtersToQueryParams = (filters: any): string => {
  Object.keys(filters)
    .filter((key) => filterKeysToRemove.includes(key))
    .forEach((key) => {
      delete filters[key];
    });

  let params = "";

  for (const [key, value] of Object.entries(filters)) {
    if (!value) continue;

    if (typeof value === "string") {
      switch (key) {
        case "developmentStatus":
          value === "hideObsolete" ? (params += `&developmentStatus[ne]=obsolete`) : (params += `&${key}=${value}`);
          break;
        case "componentsCurrentPage":
          params += "";
          break;
        case "rating":
          window.sessionStorage.getItem("FILTER_RATING") === "OpenCatalogi"
            ? (params += `&embedded.rating.rating[>%3D]=${filters.rating}`)
            : (params += "");
          break;
        case "ratingCommonground":
          window.sessionStorage.getItem("FILTER_RATING") === "Commonground"
            ? (params += `&embedded.nl.embedded.commonground.rating[>%3D]=${filters.ratingCommonground}`)
            : (params += "");
          break;
        case "isForked":
          window.sessionStorage.getItem("FILTER_FORKS") !== "false" ? (params += "&isBasedOn=IS NULL") : (params += "");
          break;
        case "orderRating":
          window.sessionStorage.getItem("FILTER_RATING") !== "false"
            ? window.sessionStorage.getItem("FILTER_RATING") === "Commonground"
              ? (params += "&order[embedded.nl.embedded.commonground.rating]=desc")
              : (params += "&order[embedded.rating.rating]=desc")
            : (params += "");
          break;
        default:
          params += `&${key}=${value}`;
          break;
      }
    }

    if (typeof value === "boolean") {
      switch (key) {
        case "isForked":
          window.sessionStorage.getItem("FILTER_FORKS") !== "false" ? (params += "&isBasedOn=IS NULL") : (params += "");
          break;
        case "orderRating":
          window.sessionStorage.getItem("FILTER_RATING") === "Commonground"
            ? (params += "&order[embedded.nl.embedded.commonground.rating]=desc")
            : (params += "&order[embedded.rating.rating]=desc");
          break;
        default:
          params += `&${key}=${value}`;
          break;
      }
    }
    if (Array.isArray(value)) {
      let arrayParams = "";

      value.forEach((value) => {
        arrayParams += `&${key}[]=${value}`;
      });

      params += arrayParams;
    }
  }

  return params;
};

const filterKeysToRemove: string[] = [
  "resultDisplayLayout",
  "dependenciesDisplayLayout",
  "landingDisplayLayout",
  "catagoryDisplayLayout",
  "organizationsResultDisplayLayout",
];

export const filtersToUrlQueryParams = (filters: Record<string, any>, pathname: string): string => {
  const params = Object.entries(filters)
    .map(([key, value]) => {
      if (value === null || value === undefined || value === "" || (Array.isArray(value) && _.isEmpty(value)))
        return null;
      if (key === "embedded.rating.rating[>%3D]") return `rating=${value}`;

      if (pathname === "/components" || pathname === "/components/" || pathname === "/") {
        if (key === "landingDisplayLayout") return null;
        if (key === "dependenciesDisplayLayout") return null;
        if (key === "catagoryDisplayLayout") return null;
        if (key === "organizationsResultDisplayLayout") return null;
        if (key === "applicationCurrentPage") return null;
        if (key === "organizationCurrentPage") return null;

        if (key === "isForked" && window.sessionStorage.getItem("FILTER_FORKS") === "false") return null;
        if (key === "orderRating" && window.sessionStorage.getItem("FILTER_RATING") === "false") return null;
        if (key === "rating" && window.sessionStorage.getItem("FILTER_RATING") !== "OpenCatalogi") return null;
        if (key === "ratingCommonground" && window.sessionStorage.getItem("FILTER_RATING") !== "Commonground")
          return null;
      }

      const formattedValue = Array.isArray(value)
        ? value.map((v) => encodeURIComponent(v)).join(`&${key}[]=`)
        : encodeURIComponent(value.toString());

      return `${Array.isArray(value) ? `${key}[]` : key}=${formattedValue}`;
    })
    .filter(Boolean)
    .join("&");

  return params ? `?${params}` : "";
};
