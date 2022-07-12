export const stringToCssModuleSelector = (string: any): string => {
  function capitalize(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function unCapitalize(str: any) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  const newString = string.split(" ").map(capitalize).join(" ").replace(/\s/g, "").split(" ").map(unCapitalize);
  return newString;
};
