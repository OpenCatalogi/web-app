export const getTypeFromSchemaRef = (value: any): any => {
  switch (value) {
    case "https://opencatalogi.nl/organisation.schema.json":
      return "Organization";

    case "https://opencatalogi.nl/component.schema.json":
      return "Component";

    case "https://opencatalogi.nl/application.schema.json":
      return "Application";

    case "https://opencatalogi.nl/contactz.schema.json":
      return "Contact";

    case "https://opencatalogi.nl/componentlegalentity.schema.json":
      return "Component legal Entity";

    case "https://opencatalogi.nl/catalogi.schema.json":
      return "Catalogi";

    //TODO add more values if we make more detail pages
  }
};
