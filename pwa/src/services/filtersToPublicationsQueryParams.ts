import _ from "lodash";

export const filtersToPublicationsQueryParams = (filters: any): string => {
  Object.keys(filters)
    .filter((key) => filterKeysToRemove.includes(key))
    .forEach((key) => {
      delete filters[key];
    });

  let params = "";
  let index = 0;

  for (const [key, value] of Object.entries(filters)) {
    if (!value) continue;
    index + 1;

    if (typeof value === "string") {
      switch (key) {
        // case "softwareType":
        //   value === "standalone" ? (params += `&softwareType[regex]=${value}`) : (params += `&${key}=${value}`);
        //   break;
        default:
          params += index === 0 ? `?${key}=${value}` : `&${key}=${value}`;
          break;
      }
    }

    if (typeof value === "boolean") {
      switch (key) {
        default:
          params += index === 0 ? `?${key}=${value}` : `&${key}=${value}`;
          break;
      }
    }
    if (Array.isArray(value)) {
      let arrayParams = "";

      value.forEach((value) => {
        arrayParams += index === 0 ? `?${key}[]=${value}` : `&${key}[]=${value}`;
      });

      params += arrayParams;
    }
  }

  console.log(params);

  return params;
};

const filterKeysToRemove: string[] = [
  "resultDisplayLayout",
  "dependenciesDisplayLayout",
  "landingDisplayLayout",
  "catagoryDisplayLayout",
  "organizationsResultDisplayLayout",
];

export const filtersToPublicationsUrlQueryParams = (filters: Record<string, any>, pathname: string): string => {
  const params = Object.entries(filters)
    .map(([key, value]) => {
      if (value === null || value === undefined || value === "" || (Array.isArray(value) && _.isEmpty(value)))
        return null;
      if (key === "embedded.rating.rating[>%3D]") return `rating=${value}`;

      if (pathname.includes("/publications")) {
        if (key === "applicationCurrentPage") return null;
        if (key === "organizationCurrentPage") return null;
        if (key === "componentsCurrentPage") return null;

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
