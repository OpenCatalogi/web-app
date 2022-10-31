export const filtersToQueryParams = (filters: any, deletes: { name: string }[]): string => {
  deletes.map((test) => {
    let name = test.name;
    delete filters[name];
  });

  let params: string = "";

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
