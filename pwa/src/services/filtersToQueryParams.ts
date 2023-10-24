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
      params += `&${key}=${value}`;
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

export const filtersToUrlQueryParams = (filters: Record<string, any>): string => {
  const params = Object.entries(filters)
    .map(([key, value]) => {
      if (value === null || value === undefined) return null;

      const formattedValue = Array.isArray(value)
        ? value.map((v: string) => v.replace(/\s+/g, "_")).join(`&${key}[]=`)
        : value.toString().replace(/\s+/g, "_");

      return `${Array.isArray(value) ? `${key}[]` : key}=${formattedValue}`;
    })
    .filter(Boolean)
    .join("&");

  return params ? `?${params}` : "";
};
