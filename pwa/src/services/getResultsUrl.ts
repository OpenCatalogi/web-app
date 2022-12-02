export const getResultsUrl = (value: any): any => {
  switch (value) {
    case "Organisation":
      return "organizations";

    case "Component":
      return "components";

    case "Application":
      return "applications";

    case "Contact":
      return "contacts";

    case "ComponentlegalEntity":
      return "componentlegalentities";

    //TODO add more values if we make more detail pages
  }
};
