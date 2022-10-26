import { faCoins, faFolder, faHouse, faIdCard, faPeopleRoof, faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TEMPORARY_PORTFOLIOS = [
  {
    id: "fbb37430-4283-4b74-82af-839fae700069",
    title: "Financiële stabiliteit",
    description: "De gemeente helpt inwoners met geldzorgen om grip te krijgen op hun financiële situatie.",
    icon: <FontAwesomeIcon icon={faCoins} />,
  },
  {
    id: "04c94f27-07a8-4a85-91b5-fce564e1f869",
    title: "Melding openbare ruimte",
    description: "Inwoners kunnen digitaal meldingen doen bij de gemeente.",
    icon: <FontAwesomeIcon icon={faHouse} />,
  },
  {
    id: "b8c91026-6e96-45dd-b826-c4edf9c206e3",
    title: "Registratie toeristische verhuur woonruimte",
    description: "Inwoners kunnen een registratienummer aanvragen om hun woning te kunnen verhuren.",
    icon: <FontAwesomeIcon icon={faPeopleRoof} />,
  },
  {
    id: "a724b35b-d21f-4a3b-bf78-76c0aa14db6f",
    title: "Parkeerbeheer",
    description: "De gemeente helpt inwoners met het verkrijgen van parkeer vergunningen.",
    icon: <FontAwesomeIcon icon={faSquareParking} />,
  },
  {
    id: "cd0627fd-1179-4ecd-b883-65a3300ef4dd",
    title: "Mijn Zaken",
    description: "Inwoners kunnen digitaal hun zaken bekijken.",
    icon: <FontAwesomeIcon icon={faFolder} />,
  },
  {
    id: "f88e6139-b86e-43d7-93d1-8ab71f07abeb",
    title: "Inburgering",
    description: "De gemeente helpt nieuwe inwoners met het inburgeren.",
    icon: <FontAwesomeIcon icon={faIdCard} />,
  },
];
