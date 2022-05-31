import { PageProps } from "gatsby";
import * as React from "react";
import { ComponentsDetailTemplate } from "../../../templates/componentDetail/ComponentsDetailTemplate";

const test = {
  name: "BAG API Huidige Bevragingen (Basisregistratie Adressen en Gebouwen",
  types: ["REST/JSON", "Software", "React"],
  description:
    "De Basisregistratie Adressen en Gebouwen (BAG) is onderdeel van het overheidsstelsel van basisregistraties. Gemeenten zijn bronhouders van de BAG. Zij zijn verantwoordelijk voor het opnemen van de gegevens in de BAG en voor de kwaliteit ervan. Alle gemeenten stellen gegevens over adressen en gebouwen centraal beschikbaar via de Landelijke Voorziening BAG (LV BAG). Het Kadaster beheert de LV BAG en stelt de gegevens beschikbaar aan de diverse afnemers. De BAG API Huidige Bevragingen is een Haal Centraal API die in samenwerking met VNG Realisatie is ontwikkeld vanuit de Common Ground gedachte. De gebruikerswensen van de gemeenten vormen het uitgangspunt van deze API. De BAG API Huidige Bevragingen is vooralsnog uitsluitend beschikbaar voor gemeenten en leveranciers van gemeenten. De API is 24*7 beschikbaar.",
};

const ComponentsDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return <ComponentsDetailTemplate componentId={props.params.caseId} context={test} />;
};
export default ComponentsDetailPage;
