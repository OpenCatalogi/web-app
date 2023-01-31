export const getTypeFromSchemaRef = (value: any): any => {
  if (value.includes("organisation.schema.json")) return "Organization";
  if (value.includes("component.schema.json")) return "Component";
  if (value.includes("application.schema.json")) return "Application";
  if (value.includes("contacts.schema.json")) return "Contact";
  if (value.includes("componentlegalentity.schema.json")) return "Component legal Entity";
  if (value.includes("catalogi.schema.json")) return "Catalogi";

  //TODO add more values if we make more detail pages
};
