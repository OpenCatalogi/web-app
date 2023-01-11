import {
  faAddressBook,
  faBellConcierge,
  faBoxArchive,
  faBuilding,
  faBurger,
  faCircleExclamation,
  faCircleInfo,
  faCity,
  faCloud,
  faComments,
  faDiagramProject,
  faFileZipper,
  faGaugeSimpleHigh,
  faGears,
  faHandFist,
  faHandHolding,
  faHandshake,
  faHandshakeAngle,
  faHelmetSafety,
  faHouseChimneyUser,
  faIcons,
  faInfo,
  faLifeRing,
  faListCheck,
  faMoneyBillTransfer,
  faMoneyBillTrendUp,
  faPeopleArrows,
  faPersonChalkboard,
  faPersonCircleExclamation,
  faPersonCircleQuestion,
  faPersonMilitaryPointing,
  faQuestionCircle,
  faRightLeft,
  faScaleBalanced,
  faShop,
  faSignal,
  faThList,
  faTicket,
  faTowerCell,
  faTreeCity,
  faUserCheck,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TEMPORARY_PORTFOLIOS = [
  {
    id: "1224a58e-dfff-4198-a3e7-d4adab3ac624",
    title: "Huisvesting",
    shortDescription:
      "Het verlenen van vastgoedgerelateerde diensten, parkeerdiensten en nutsdiensten (gas, water en licht), de planning daarvan en het onderhoud daarop.",
    longDescription:
      "Het verlenen van vastgoedgerelateerde diensten, parkeerdiensten en nutsdiensten (gas, water en licht), de planning daarvan en het onderhoud daarop.",
    icon: <FontAwesomeIcon icon={faHouseChimneyUser} />,
    domain: "Support",
  },
  {
    id: "0ed3bb56-547c-4c4e-8df5-064c121a9598",
    title: "Projectmanagement",
    shortDescription: "Het plannen, beheren en rapporteren van en over projecten.",
    longDescription: "Het plannen, beheren en rapporteren van en over projecten.",
    icon: <FontAwesomeIcon icon={faDiagramProject} />,
    domain: "Support",
  },
  {
    id: "0818ea14-56f8-4923-a850-7fb927f8e52d",
    title: "Veiligheidsmanagement",
    shortDescription: "Het bewaken dat de organisatie voldoet aan alle aspecten van veiligheid en beveiliging.",
    longDescription: "Het bewaken dat de organisatie voldoet aan alle aspecten van veiligheid en beveiliging.",
    icon: <FontAwesomeIcon icon={faHelmetSafety} />,
    domain: "Support",
  },
  {
    id: "c50d9de3-f716-419f-bca4-20d8880b37df",
    title: "Administratieve ondersteuning",
    shortDescription: "Het bieden van ondersteuning bij administratieve taken.",
    longDescription: "Het bieden van ondersteuning bij administratieve taken.",
    icon: <FontAwesomeIcon icon={faTicket} />,
    domain: "Support",
  },
  {
    id: "8679ad28-ee65-497d-ae59-1cc6beca7d0e",
    title: "Informatie en archiefbeheer",
    shortDescription:
      "Het ervoor zorgdragen dat gegevens beschikbaar blijven zodat het handelen van gemeenten publiek verantwoord kan worden.",
    longDescription:
      "Het ervoor zorgdragen dat gegevens beschikbaar blijven zodat het handelen van gemeenten publiek verantwoord kan worden.",
    icon: <FontAwesomeIcon icon={faBoxArchive} />,
    domain: "Support",
  },
  {
    id: "d28b8928-e7c0-4e08-94f4-6ad9063332dc",
    title: "Juridische ondersteuning",
    shortDescription: "Het bieden van advies en ondersteuning op het gebied van wet- en regelgeving.",
    longDescription: "Het bieden van advies en ondersteuning op het gebied van wet- en regelgeving.",
    icon: <FontAwesomeIcon icon={faScaleBalanced} />,
    domain: "Support",
  },
  {
    id: "3c8464f5-9c87-47f7-bfc6-c46f46e253b0",
    title: "Personeelsmanagement",
    shortDescription:
      "Het ervoor zorgdragen dat er competente medewerkers beschikbaar zijn voor de uitvoering van bedrijfsprocessen.",
    longDescription:
      "Het ervoor zorgdragen dat er competente medewerkers beschikbaar zijn voor de uitvoering van bedrijfsprocessen.",
    icon: <FontAwesomeIcon icon={faUsersGear} />,
    domain: "Support",
  },
  {
    id: "bc81e154-e114-438f-b322-da3ca5afb79e",
    title: "Automatiseringsmanagement",
    shortDescription:
      "Het ervoor zorgen dat IT-systemen beschikbaar zijn voor de ondersteuning van de informatievoorziening.",
    longDescription:
      "Het ervoor zorgen dat IT-systemen beschikbaar zijn voor de ondersteuning van de informatievoorziening.",
    icon: <FontAwesomeIcon icon={faGears} />,
    domain: "Support",
  },
  {
    id: "81ef8a19-e626-446d-8c41-09ef9246f965",
    title: "Informatiseringsmanagement",
    shortDescription:
      "Het ervoor zorgen dat informatiebehoeften bekend zijn en zijn vertaald naar gewenste functionaliteiten van de informatievoorziening.",
    longDescription:
      "Het ervoor zorgen dat informatiebehoeften bekend zijn en zijn vertaald naar gewenste functionaliteiten van de informatievoorziening.",
    icon: <FontAwesomeIcon icon={faInfo} />,
    domain: "Support",
  },
  {
    id: "d6f17288-4807-44c8-b61f-d054f2936095",
    title: "Communicatiemanagement",
    shortDescription:
      "Het ervoor zorgdragen dat de organisatie zich op de juiste wijze uit naar interne en externe partijen.",
    longDescription:
      "Het ervoor zorgdragen dat de organisatie zich op de juiste wijze uit naar interne en externe partijen.",
    icon: <FontAwesomeIcon icon={faTowerCell} />,
    domain: "Support",
  },
  {
    id: "0d985db4-79a9-408e-8702-4f80a794815a",
    title: "Financieël management",
    shortDescription: "Het zorgdragen voor alle inkomende en uitgaande financiële stromen.",
    longDescription: "Het zorgdragen voor alle inkomende en uitgaande financiële stromen.",
    icon: <FontAwesomeIcon icon={faMoneyBillTransfer} />,
    domain: "Support",
  },
  {
    id: "339dee3b-e743-4b67-859a-4a06c553ff2e",
    title: "Inkoop en contractmanagement",
    shortDescription: "Het verwerven van middelen en het bewaken van de afspraken hierover met de leverancier.",
    longDescription: "Het verwerven van middelen en het bewaken van de afspraken hierover met de leverancier.",
    icon: <FontAwesomeIcon icon={faShop} />,
    domain: "Support",
  },
  {
    id: "6181b79b-d2e3-4c68-9049-6c0dfae0a845",
    title: "Gegevensbeheer",
    shortDescription:
      "Het geheel van activiteiten om in de gemeente op het juiste moment over de juiste gegevens van de juiste kwaliteit te beschikken.",
    longDescription:
      "Het geheel van activiteiten om in de gemeente op het juiste moment over de juiste gegevens van de juiste kwaliteit te beschikken.",
    icon: <FontAwesomeIcon icon={faFileZipper} />,
    domain: "Execution",
  },
  {
    id: "eee3f64c-d2a0-43a3-abfb-7e2de3e86d38",
    title: "Openbare orde en veiligheid",
    shortDescription:
      "Het leveren van gemeentelijke producten en diensten die tot het domein openbare orde en veiligheid worden gerekend.",
    longDescription:
      "Het leveren van gemeentelijke producten en diensten die tot het domein openbare orde en veiligheid worden gerekend.",
    icon: <FontAwesomeIcon icon={faScaleBalanced} />,
    domain: "Execution",
  },
  {
    id: "b827c826-25af-4da7-b2fd-1116d2e02995",
    title: "Publieksdiensten",
    shortDescription:
      "Het leveren van gemeentelijke producten en diensten die tot het domein publieksdiensten worden gerekend.",
    longDescription:
      "Het leveren van gemeentelijke producten en diensten die tot het domein publieksdiensten worden gerekend.",
    icon: <FontAwesomeIcon icon={faUserCheck} />,
    domain: "Execution",
  },
  {
    id: "06fb294c-37af-4f38-b36d-7fbfa606154a",
    title: "Ruimtelijk Domein",
    shortDescription:
      "Het leveren van gemeentelijke producten en diensten die tot het ruimtelijk domein worden gerekend",
    longDescription:
      "Het leveren van gemeentelijke producten en diensten die tot het ruimtelijk domein worden gerekend",
    icon: <FontAwesomeIcon icon={faCloud} />,
    domain: "Execution",
  },
  {
    id: "898a3186-1966-4e81-99f1-5d1e789a83ee",
    title: "Sociaal Domein",
    shortDescription: "Het leveren van gemeentelijke producten en diensten die tot het sociaal domein worden gerekend.",
    longDescription: "Het leveren van gemeentelijke producten en diensten die tot het sociaal domein worden gerekend.",
    icon: <FontAwesomeIcon icon={faIcons} />,
    domain: "Execution",
  },
  {
    id: "06131594-76ae-4677-a976-3c9736d970cc",
    title: "Verstrekking",
    shortDescription: "Het leveren van een product of dienst",
    longDescription: "Het leveren van een product of dienst",
    icon: <FontAwesomeIcon icon={faHandFist} />,
    domain: "Customer and chain interaction",
  },
  {
    id: "a95ce825-dde6-490c-b866-d8a6ef0ed4c3",
    title: "Samenwerking en participatie",
    shortDescription:
      "Het actief benutten van ideeën en denkkracht van partners bij het plannen, ontwikkelen, uitvoeren en/of evalueren van gemeentelijk beleid",
    longDescription:
      "Het actief benutten van ideeën en denkkracht van partners bij het plannen, ontwikkelen, uitvoeren en/of evalueren van gemeentelijk beleid",
    icon: <FontAwesomeIcon icon={faHandshakeAngle} />,
    domain: "Customer and chain interaction",
  },
  {
    id: "a7840503-3c3d-43d8-9392-fb8bd2a91576",
    title: "Klantenservice",
    shortDescription: "Het verlenen van service aan dienstenafnemers",
    longDescription: "Het verlenen van service aan dienstenafnemers",
    icon: <FontAwesomeIcon icon={faCircleInfo} />,
    domain: "Customer and chain interaction",
  },
  {
    id: "68bedb78-95e1-424d-9946-77910829b20c",
    title: "Signaalverwerking",
    shortDescription: "Het verwerken van signalen ten aanzien van het betreffende onderwerp",
    longDescription: "Het verwerken van signalen ten aanzien van het betreffende onderwerp",
    icon: <FontAwesomeIcon icon={faSignal} />,
    domain: "Customer and chain interaction",
  },
  {
    id: "2a46b511-add4-4d98-8e57-9dea30cc9a9c",
    title: "Ontvangst",
    shortDescription:
      "Het ontvangen van signalen, gegevens of een verzoek of een melding die aanleiding geeft om een proces te starten of die anderszins bijdraagt aan de uitvoering van het proces.",
    longDescription:
      "Het ontvangen van signalen, gegevens of een verzoek of een melding die aanleiding geeft om een proces te starten of die anderszins bijdraagt aan de uitvoering van het proces.",
    icon: <FontAwesomeIcon icon={faHandHolding} />,
    domain: "Customer and chain interaction",
  },
  {
    id: "00be0951-759b-4af1-9d15-b99a4454c59e",
    title: "Zelfredzaamheidstimulering",
    shortDescription: "Het ondersteunen van de zelfredzaamheidsontwikkeling van burgers",
    longDescription: "Het ondersteunen van de zelfredzaamheidsontwikkeling van burgers",
    icon: <FontAwesomeIcon icon={faBurger} />,
    domain: "Customer and chain interaction",
  },
  {
    id: "a82555c1-9326-4e43-9830-6596409bfab4",
    title: "Contactbeheer",
    shortDescription: "Het onderhouden van de relatie met klanten en ketenpartners.",
    longDescription: "Het onderhouden van de relatie met klanten en ketenpartners.",
    icon: <FontAwesomeIcon icon={faAddressBook} />,
    domain: "Customer and chain interaction",
  },
  {
    id: "eece55d7-3d90-4887-a37f-14db12251a19",
    title: "Informering",
    shortDescription: "Het geven van algemene of persoonlijke informatie of advies.",
    longDescription: "Het geven van algemene of persoonlijke informatie of advies.",
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
    domain: "Customer and chain interaction",
  },
  {
    id: "b004c232-e44e-4b75-b8a3-63f71526d595",
    title: "Afstemming",
    shortDescription:
      "Het inhoudelijke en procesmatig afstemmen met een partij met wie wordt samengewerkt of waarvan diensten worden betrokken, zodat beiden over de juiste informatie beschikken.",
    longDescription:
      "Het inhoudelijke en procesmatig afstemmen met een partij met wie wordt samengewerkt of waarvan diensten worden betrokken, zodat beiden over de juiste informatie beschikken.",
    icon: <FontAwesomeIcon icon={faComments} />,
    domain: "Directing",
  },
  {
    id: "5c47932a-16c7-4776-8bb9-a77deff2a21d",
    title: "Opdrachtbewaking",
    shortDescription: "Het bewaken of de door een aanbieder geleverde dienst conform afspraken is.",
    longDescription: "Het bewaken of de door een aanbieder geleverde dienst conform afspraken is.",
    icon: <FontAwesomeIcon icon={faListCheck} />,
    domain: "Directing",
  },
  {
    id: "3ecd987f-c849-4803-9529-5a8fe20f45bb",
    title: "Opdrachtsverstrekking",
    shortDescription: "Het verstrekken van een opdracht aan een aanbieder voor het leveren van een dienst.",
    longDescription: "Het verstrekken van een opdracht aan een aanbieder voor het leveren van een dienst.",
    icon: <FontAwesomeIcon icon={faThList} />,
    domain: "Directing",
  },
  {
    id: "a31b1340-9951-4dc2-8e97-fa5f1803d6b1",
    title: "Organisatiekeuze",
    shortDescription:
      "Het kiezen van een aanbieder voor een bepaalde in te kopen dienst of in het geval van een samenwerking het bepalen van de keuze van een organisatie om mee te gaan samenwerken als gevolg van de strategie van Samenwerkingsvorming",
    longDescription:
      "Het kiezen van een aanbieder voor een bepaalde in te kopen dienst of in het geval van een samenwerking het bepalen van de keuze van een organisatie om mee te gaan samenwerken als gevolg van de strategie van Samenwerkingsvorming",
    icon: <FontAwesomeIcon icon={faPersonCircleQuestion} />,
    domain: "Directing",
  },
  {
    id: "55092f41-dd09-4080-aa45-c016df880d4d",
    title: "Samenwerkingsbewaking",
    shortDescription: "Het bewaken of een samenwerkingsverband verloopt conform verwachtingen en afspraken.",
    longDescription: "Het bewaken of een samenwerkingsverband verloopt conform verwachtingen en afspraken.",
    icon: <FontAwesomeIcon icon={faPersonMilitaryPointing} />,
    domain: "Surveillance",
  },
  {
    id: "aac13194-9c2e-48c7-a7a5-1e58ac006dfd",
    title: "Compliance management",
    shortDescription: "Het bewaken of processen worden uitgevoerd in lijn met wet- en regelgeving.",
    longDescription: "Het bewaken of processen worden uitgevoerd in lijn met wet- en regelgeving.",
    icon: <FontAwesomeIcon icon={faHandshake} />,
    domain: "Surveillance",
  },
  {
    id: "683ba434-e1ed-4424-a4b3-7aa4ad8d951d",
    title: "Risicomanagement",
    shortDescription: "Het bepalen en bewaken van de risico's waaraan de organisatie wordt blootgesteld.",
    longDescription: "Het bepalen en bewaken van de risico's waaraan de organisatie wordt blootgesteld.",
    icon: <FontAwesomeIcon icon={faCircleExclamation} />,
    domain: "Surveillance",
  },
  {
    id: "ba3874b4-f84b-4f9c-8f28-24319c506c6a",
    title: "Kaderbewaking",
    shortDescription: "Het bewaken of processen binnen de zelf opgestelde beperkingen worden uitgevoerd.",
    longDescription: "Het bewaken of processen binnen de zelf opgestelde beperkingen worden uitgevoerd.",
    icon: <FontAwesomeIcon icon={faLifeRing} />,
    domain: "Surveillance",
  },
  {
    id: "c9e04fd0-dd0d-48fd-a224-8411c9bbf616",
    title: "Verandermanagement",
    shortDescription:
      "Het bepalen en managen van grotere veranderingen zodat maximaal wordt bijgedragen aan de doelstellingen.",
    longDescription:
      "Het bepalen en managen van grotere veranderingen zodat maximaal wordt bijgedragen aan de doelstellingen.",
    icon: <FontAwesomeIcon icon={faRightLeft} />,
    domain: "Surveillance",
  },
  {
    id: "f0258cec-26aa-4b92-adeb-f1793fbc6e97",
    title: "Performance management",
    shortDescription:
      "Het bewaken of processen worden uitgevoerd in lijn met de opgestelde doelstellingen (inhoud en proces).",
    longDescription:
      "Het bewaken of processen worden uitgevoerd in lijn met de opgestelde doelstellingen (inhoud en proces).",
    icon: <FontAwesomeIcon icon={faGaugeSimpleHigh} />,
    domain: "Surveillance",
  },
  {
    id: "16c83d91-bb28-4623-aec3-0027f387068e",
    title: "Organisatieontwikkeling",
    shortDescription: "Het operationaliseren en implementeren van veranderingen in de organisatie.",
    longDescription: "Het operationaliseren en implementeren van veranderingen in de organisatie.",
    icon: <FontAwesomeIcon icon={faBuilding} />,
    domain: "Development",
  },
  {
    id: "811ce1be-362b-4dcb-a581-8acea30a6a22",
    title: "Leefomgeving ontwikkeling",
    shortDescription: "Ontwikkeling en implementatie op het gebied van de leefomgeving binnen een gemeente.",
    longDescription: "Ontwikkeling en implementatie op het gebied van de leefomgeving binnen een gemeente.",
    icon: <FontAwesomeIcon icon={faTreeCity} />,
    domain: "Development",
  },
  {
    id: "87dd5326-b397-41e2-bb92-1fe8db1b851b",
    title: "Sociale ontwikkeling",
    shortDescription: "Het ontwikkelen en implementeren van beleid dat betrekking heeft op sociale aspecten.",
    longDescription: "Het ontwikkelen en implementeren van beleid dat betrekking heeft op sociale aspecten.",
    icon: <FontAwesomeIcon icon={faIcons} />,
    domain: "Development",
  },
  {
    id: "fac979c0-9196-4e22-a003-2366f2c63812",
    title: "Economische ontwikkeling",
    shortDescription: "Het ontwikkelen en implementeren van beleid dat betrekking heeft op economische aspecten.",
    longDescription: "Het ontwikkelen en implementeren van beleid dat betrekking heeft op economische aspecten.",
    icon: <FontAwesomeIcon icon={faMoneyBillTrendUp} />,
    domain: "Development",
  },
  {
    id: "5b40c9bc-f1fb-4a43-a68f-437fa9eb7970",
    title: "Openbare orde en veiligheidontwikkeling",
    shortDescription:
      "Het ontwikkelen en invoeren van beleid dat betrekking heeft op openbare orde en veiligheidsaspecten.",
    longDescription:
      "Het ontwikkelen en invoeren van beleid dat betrekking heeft op openbare orde en veiligheidsaspecten.",
    icon: <FontAwesomeIcon icon={faScaleBalanced} />,
    domain: "Development",
  },
  {
    id: "48452449-4d1a-481b-a66f-45890242d035",
    title: "Ontwikkeling dienstverlening",
    shortDescription:
      "Het bepalen welke producten en diensten worden geleverd, onder welke voorwaarden dit gebeurt en het doorvoeren hiervan",
    longDescription:
      "Het bepalen welke producten en diensten worden geleverd, onder welke voorwaarden dit gebeurt en het doorvoeren hiervan",
    icon: <FontAwesomeIcon icon={faBellConcierge} />,
    domain: "Development",
  },
  {
    id: "13d3d192-fd0e-441d-8e1a-ea684bfd16da",
    title: "Samenwerkingsvorming",
    shortDescription:
      "Het vormen van een samenwerkingsverband met andere organisaties en het maken van de daarbij behorende afspraken.",
    longDescription:
      "Het vormen van een samenwerkingsverband met andere organisaties en het maken van de daarbij behorende afspraken.",
    icon: <FontAwesomeIcon icon={faPeopleArrows} />,
    domain: "Control",
  },
  {
    id: "a29d601b-4ff2-4b9f-9d2a-f964e332cfcf",
    title: "Verantwoording",
    shortDescription:
      "Het rapporteren naar belanghebbenden binnen en buiten de organisatie over de mate waarin wordt voldaan aan verplichtingen en afspraken",
    longDescription:
      "Het rapporteren naar belanghebbenden binnen en buiten de organisatie over de mate waarin wordt voldaan aan verplichtingen en afspraken",
    icon: <FontAwesomeIcon icon={faPersonCircleExclamation} />,
    domain: "Control",
  },
  {
    id: "f729c0d6-0d6f-47f4-b279-816079863a6d",
    title: "Strategie",
    shortDescription:
      "Het bepalen welke veranderingen zouden moeten worden doorgevoerd en de doelstellingen die daaraan ten grondslag liggen.",
    longDescription:
      "Het bepalen welke veranderingen zouden moeten worden doorgevoerd en de doelstellingen die daaraan ten grondslag liggen.",
    icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
    domain: "Control",
  },
  {
    id: "39cda7a0-a4a9-4a17-be8f-6c7ade70dd0a",
    title: "Besturing",
    shortDescription:
      "Het inrichten en uitvoeren van de besluitvormingsprocessen en -structuren en het nemen van strategische besluiten.",
    longDescription:
      "Het inrichten en uitvoeren van de besluitvormingsprocessen en -structuren en het nemen van strategische besluiten.",
    icon: <FontAwesomeIcon icon={faCity} />,
    domain: "Control",
  },
];
