import {
  faCalendarDays,
  faCoins,
  faFolder,
  faHouse,
  faIdCard,
  faPeopleRoof,
  faSquareParking,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TEMPORARY_PORTFOLIOS = [
  {
    id: "fbb37430-4283-4b74-82af-839fae700069",
    title: "Financiële stabiliteit",
    shortDescription: "De gemeente helpt inwoners met geldzorgen om grip te krijgen op hun financiële situatie.",
    longDescription:
      "Inwoners ervaren schommelingen in inkomsten en uitgaven. Inkomsten en uitgaven worden op verschillende momenten gestort en geïncasseerd. Inwoners maken zich zorgen over op het juiste moment genoeg saldo hebben om rekeningen te betalen, zodat geen achterstand in betaling ontstaat. Een gemeente zorgt ervoor dat inkomsten en uitgaven aan vaste lasten van een inwoner gestabiliseerd worden.",
    icon: <FontAwesomeIcon icon={faCoins} />,
    domain: "Support",
  },
  {
    id: "04c94f27-07a8-4a85-91b5-fce564e1f869",
    title: "Melding openbare ruimte",
    shortDescription: "Inwoners kunnen digitaal meldingen doen bij de gemeente.",
    longDescription:
      "Wanneer de openbare ruimte aandacht van de gemeente nodig heeft, kunnen inwoners hiervan een digitale melding maken. Dat kan bijvoorbeeld gaan over bestrating, afval, reiniging, groenvoorziening, een verstopt riool, openbare verlichting of ongediertebestrijding. Binnen de gemeente wordt de melding automatisch naar de juiste behandelaar doorgezet voor verdere afhandeling.",
    icon: <FontAwesomeIcon icon={faHouse} />,
    domain: "Public services",
  },
  {
    id: "b8c91026-6e96-45dd-b826-c4edf9c206e3",
    title: "Registratie toeristische verhuur woonruimte",
    shortDescription: "Inwoners kunnen een registratienummer aanvragen om hun woning te kunnen verhuren.",
    longDescription:
      "In 2021 gaat de landelijke registratieplicht van kracht als onderdeel van de Wet toeristische verhuur. Afhankelijk van de gemeentelijke verordening zijn verhuurders van vakantiewoningen dan verplicht om bij de gemeente een registratienummer voor vakantieverhuur aan te vragen. Deze aanvraag kan alleen digitaal. Na eventuele toekenning is de verhuurder vervolgens verplicht om het registratienummer in advertenties en bij mogelijke verplichte verhuurmeldingen te vermelden. De gemeente kan registratienummer ook ook gebruiken voor de naleving van veiligheids-, gezondheids- en bruikbaarheidsvoorschriften, en bij het heffen van toeristenbelasting.",
    icon: <FontAwesomeIcon icon={faPeopleRoof} />,
    domain: "Space",
  },
  {
    id: "a724b35b-d21f-4a3b-bf78-76c0aa14db6f",
    title: "Parkeerbeheer",
    shortDescription: "De gemeente helpt inwoners met het verkrijgen van parkeer vergunningen.",
    longDescription: "De gemeente helpt inwoners met het verkrijgen van parkeer vergunningen.",
    icon: <FontAwesomeIcon icon={faSquareParking} />,
    domain: "Public services",
  },
  {
    id: "cd0627fd-1179-4ecd-b883-65a3300ef4dd",
    title: "Mijn Zaken",
    shortDescription: "Inwoners kunnen digitaal hun zaken bekijken.",
    longDescription: "Inwoners kunnen digitaal hun zaken bekijken.",
    icon: <FontAwesomeIcon icon={faFolder} />,
    domain: "Support",
  },
  {
    id: "f88e6139-b86e-43d7-93d1-8ab71f07abeb",
    title: "Inburgering",
    shortDescription: "De gemeente helpt nieuwe inwoners met het inburgeren.",
    longDescription: "De gemeente helpt nieuwe inwoners met het inburgeren.",
    icon: <FontAwesomeIcon icon={faIdCard} />,
    domain: "Governance",
  },
  {
    id: "a036a6be-6514-446b-9ef7-d34b530feeb6",
    title: "Evenementen organiseren",
    shortDescription: "De gemeente helpt inwoners met het verkrijgen van vergunningen voor evenementen.",
    longDescription: "De gemeente helpt inwoners met het verkrijgen van vergunningen voor evenementen.",
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    domain: "Social",
  },
];
