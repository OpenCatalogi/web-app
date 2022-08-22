import {
  faArrowDownUpLock,
  faArrowRotateBack,
  faBell,
  faBook,
  faBullseye,
  faCheckDouble,
  faDatabase,
  faFileShield,
  faFingerprint,
  faFolderOpen,
  faGavel,
  faKey,
  faLaptopFile,
  faLink,
  faLock,
  faMagnifyingGlassChart,
  faMagnifyingGlassDollar,
  faMicrochip,
  faNetworkWired,
  faSliders,
  faToolbox,
  faUserSecret,
  faUserShield,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type TCategories = "interactie" | "proces" | "integratie" | "services" | "data";

export const categories = {
  interactie: [
    { title: "Procesondersteuning", icon: <FontAwesomeIcon icon={faMicrochip} />, value: "procesondersteuning" },
    { title: "Regie op gegevens", icon: <FontAwesomeIcon icon={faFileShield} />, value: "regie op gegevens" },
    { title: "Aanvragen en meldingen", icon: <FontAwesomeIcon icon={faBell} />, value: "aanvragen en meldingen" },
    {
      title: "Eindgebruiker authenticatie",
      icon: <FontAwesomeIcon icon={faUserShield} />,
      value: "eindgebruiker authenticatie",
    },
  ],
  proces: [
    {
      title: "Procesinrichting en uitvoering",
      icon: <FontAwesomeIcon icon={faMicrochip} />,
      value: "procesinrichting en uitvoering",
    },
    { title: "Bedrijfsregels", icon: <FontAwesomeIcon icon={faGavel} />, value: "bedrijfsregels" },
    {
      title: "Data analyse ondersteuning",
      icon: <FontAwesomeIcon icon={faMagnifyingGlassChart} />,
      value: "data analyse ondersteuning",
    },
    { title: "Functie autorisatie", icon: <FontAwesomeIcon icon={faLock} />, value: "functie autorisatie" },
    { title: "Doel en groendslag", icon: <FontAwesomeIcon icon={faBullseye} />, value: "doel en groendslag" },
    { title: "Audit logging", icon: <FontAwesomeIcon icon={faMagnifyingGlassDollar} />, value: "audit logging" },
  ],
  integratie: [
    { title: "Netwerk", icon: <FontAwesomeIcon icon={faNetworkWired} />, value: "netwerk" },
    { title: "Netwerk beveiliging", icon: <FontAwesomeIcon icon={faKey} />, value: "netwerk beveiliging" },
    { title: "Verbinden", icon: <FontAwesomeIcon icon={faLink} />, value: "verbinden" },
    { title: "Dienstencatalogus", icon: <FontAwesomeIcon icon={faBook} />, value: "dienstencatalogus" },
  ],
  services: [
    {
      title: "Organisatie authenticatie",
      icon: <FontAwesomeIcon icon={faFingerprint} />,
      value: "organisatie authenticatie",
    },
    {
      title: "Diensten autorisatie",
      icon: <FontAwesomeIcon icon={faArrowDownUpLock} />,
      value: "diensten autorisatie",
    },
    { title: "Diensten", icon: <FontAwesomeIcon icon={faToolbox} />, value: "diensten" },
    { title: "Terugmelden", icon: <FontAwesomeIcon icon={faArrowRotateBack} />, value: "terugmelden" },
    {
      title: "Abonneren en notificeren",
      icon: <FontAwesomeIcon icon={faCheckDouble} />,
      value: "abonneren en notificeren",
    },
    { title: "Audit logging", icon: <FontAwesomeIcon icon={faMagnifyingGlassDollar} />, value: "audit logging" },
    { title: "Transformatie", icon: <FontAwesomeIcon icon={faSliders} />, value: "transformatie" },
    { title: "Integratie", icon: <FontAwesomeIcon icon={faWrench} />, value: "integratie" },
    {
      title: "Pseudonimisering en anonimisering",
      icon: <FontAwesomeIcon icon={faUserSecret} />,
      value: "pseudonimisering en anonimisering",
    },
  ],
  data: [
    { title: "Bijhouding gegevens", icon: <FontAwesomeIcon icon={faDatabase} />, value: "bijhouding gegevens" },
    {
      title: "Historie en metadatering",
      icon: <FontAwesomeIcon icon={faFolderOpen} />,
      value: "historie en metadatering",
    },
    { title: "Protocollering", icon: <FontAwesomeIcon icon={faLaptopFile} />, value: "protocollering" },
  ],
};
