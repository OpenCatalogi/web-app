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
    { title: "Procesondersteuning", icon: <FontAwesomeIcon icon={faMicrochip} />, value: "process support" },
    { title: "Regie op gegevens", icon: <FontAwesomeIcon icon={faFileShield} />, value: "control over data" },
    { title: "Aanvragen en meldingen", icon: <FontAwesomeIcon icon={faBell} />, value: "request and notifications" },
    {
      title: "Eindgebruiker authenticatie",
      icon: <FontAwesomeIcon icon={faUserShield} />,
      value: "end user authentication",
    },
  ],
  proces: [
    {
      title: "Procesinrichting en uitvoering",
      icon: <FontAwesomeIcon icon={faMicrochip} />,
      value: "process design and execution",
    },
    { title: "Bedrijfsregels", icon: <FontAwesomeIcon icon={faGavel} />, value: "business rules" },
    {
      title: "Data analyse ondersteuning",
      icon: <FontAwesomeIcon icon={faMagnifyingGlassChart} />,
      value: "data analysis support",
    },
    { title: "Functie autorisatie", icon: <FontAwesomeIcon icon={faLock} />, value: "function authorization" },
    { title: "Doel en grondslag", icon: <FontAwesomeIcon icon={faBullseye} />, value: "purpose limitation" },
    { title: "Audit logging", icon: <FontAwesomeIcon icon={faMagnifyingGlassDollar} />, value: "audit log" },
  ],
  integratie: [
    { title: "Netwerk", icon: <FontAwesomeIcon icon={faNetworkWired} />, value: "network" },
    { title: "Netwerk beveiliging", icon: <FontAwesomeIcon icon={faKey} />, value: "network security" },
    { title: "Verbinden", icon: <FontAwesomeIcon icon={faLink} />, value: "connecting" },
    { title: "Dienstencatalogus", icon: <FontAwesomeIcon icon={faBook} />, value: "service catalog" },
  ],
  services: [
    {
      title: "Organisatie authenticatie",
      icon: <FontAwesomeIcon icon={faFingerprint} />,
      value: "organization authentication",
    },
    {
      title: "Diensten autorisatie",
      icon: <FontAwesomeIcon icon={faArrowDownUpLock} />,
      value: "services authorization",
    },
    { title: "Diensten", icon: <FontAwesomeIcon icon={faToolbox} />, value: "services" },
    { title: "Terugmelden", icon: <FontAwesomeIcon icon={faArrowRotateBack} />, value: "callback" },
    {
      title: "Abonneren en notificeren",
      icon: <FontAwesomeIcon icon={faCheckDouble} />,
      value: "subscription and notification",
    },
    { title: "Audit logging", icon: <FontAwesomeIcon icon={faMagnifyingGlassDollar} />, value: "audit log" },
    { title: "Transformatie", icon: <FontAwesomeIcon icon={faSliders} />, value: "transformation" },
    { title: "Integratie", icon: <FontAwesomeIcon icon={faWrench} />, value: "integration" },
    {
      title: "Pseudonimisering en anonimisering",
      icon: <FontAwesomeIcon icon={faUserSecret} />,
      value: "pseudonymization and anonymization",
    },
  ],
  data: [
    { title: "Bijhouding gegevens", icon: <FontAwesomeIcon icon={faDatabase} />, value: "record keeping" },
    {
      title: "Historie en metadatering",
      icon: <FontAwesomeIcon icon={faFolderOpen} />,
      value: "history and metadata",
    },
    { title: "Protocollering", icon: <FontAwesomeIcon icon={faLaptopFile} />, value: "protocolling" },
  ],
};
