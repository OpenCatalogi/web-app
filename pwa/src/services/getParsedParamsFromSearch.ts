import qs from "qs";

export const getParsedParamsFromSearch = (search: string): any => {
  const [, params] = search.split("?");

  const parsedParams = qs.parse(params, {
    decoder: (str, _, __, type) => {
      if (type === "key") return str;

      if (type === "value") {
        if (str === "") return str;

        if (str === "true" || str === "false") return str === "true";

        if (!isNaN(Number(str))) return parseInt(str, 16);

        return str;
      }
    },
  });

  return parsedParams;
};
