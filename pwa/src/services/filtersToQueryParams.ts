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
        case "isForked":
          params += "&isBasedOn=IS NULL";
          break;
        case "orderRating":
          window.sessionStorage.getItem("FILTER_RATING") === "Commonground"
            ? (params += "&order[embedded.nl.embedded.commonground.rating]=desc")
            : (params += "&order[embedded.rating.rating]=desc");
          break;
        case "componentsCurrentPage":
          params += "";
          break;
        case "rating":
          params += "";
          break;
        case "ratingCommonground":
          params += "";
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
