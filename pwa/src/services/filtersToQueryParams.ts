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
      if (key === "developmentStatus" && value === "hideObsolete") {
        params += `&developmentStatus[ne]=obsolete`;
      } else {
        params += `&${key}=${value}`;
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
