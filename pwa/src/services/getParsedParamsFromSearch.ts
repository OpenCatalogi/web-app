import qs from "qs";

export const getParsedParamsFromSearch = (search: string): any => {
  const [, params] = search.split("?");

  const parsedParams: Record<string, unknown> = qs.parse(params, {
    decoder: (str, _, __, type) => {
      if (type === "key") return decodeURIComponent(str);

      if (type === "value") {
        if (str === "") return; // ignore empty strings

        if (str === "true" || str === "false") return str === "true";

        if (!isNaN(Number(str))) return parseInt(str, 16);

        return decodeURIComponent(str);
      }
    },
  });

  // ignore empty array params
  Object.keys(parsedParams).forEach((key) => {
    if (Array.isArray(parsedParams[key]) && (parsedParams[key] as unknown[]).length === 0) {
      delete parsedParams[key];
    }
  });

  return parsedParams;
};
