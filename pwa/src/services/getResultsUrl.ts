export const getResultsUrl = (value: any): any => {
	if (value.includes("organisation.schema.json")) return "organizations";
	if (value.includes("component.schema.json")) return "components";
	if (value.includes("application.schema.json")) return "applications";
	if (value.includes("contacts.schema.json")) return "contacts";
	if (value.includes("componentlegalentity.schema.json")) return "componentlegalentities";

	//TODO add more values if we make more detail pages
};
