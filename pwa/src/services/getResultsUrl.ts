export const getResultsUrl = (value: any): any => {
  switch (value) {
    case "https://opencatalogi.nl/organisation.schema.json":
      return "organizations";

    case "https://opencatalogi.nl/component.schema.json":
      return "components";

    case "https://opencatalogi.nl/application.schema.json":
      return "applications";

    case "https://opencatalogi.nl/contactz.schema.json":
      return "contacts";

    case "https://opencatalogi.nl/componentlegalentity.schema.json":
      return "componentlegalentities";

    //TODO add more values if we make more detail pages
  }
};
