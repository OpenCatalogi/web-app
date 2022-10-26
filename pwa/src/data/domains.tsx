import {
  faBellConcierge,
  faBuilding,
  faBuildingShield,
  faCircleInfo,
  faCity,
  faIcons,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TEMPORARY_DOMAINS = [
  {
    id: "04eb9307-5bc5-4c49-8c51-401809b8af57",
    title: "Governance",
    icon: <FontAwesomeIcon icon={faCity} />,
  },
  {
    id: "b93e7b92-b821-41c5-8984-aed055e18375",
    title: "Social",
    icon: <FontAwesomeIcon icon={faIcons} />,
  },
  {
    id: "0dc26e0e-8de6-46b1-af2f-b42635a40b6b",
    title: "Space",
    icon: <FontAwesomeIcon icon={faBuilding} />,
  },
  {
    id: "0edc475e-106b-4a69-8577-eeaf5b85350",
    title: "Public services",
    icon: <FontAwesomeIcon icon={faBellConcierge} />,
  },
  {
    id: "638849e8-16c2-4944-9dd0-aaaf3aeb1d2a",
    title: "Public order and safety",
    icon: <FontAwesomeIcon icon={faBuildingShield} />,
  },
  {
    id: "08db196a-14ae-468b-bdd2-d87041e91cfb",
    title: "Support",
    icon: <FontAwesomeIcon icon={faCircleInfo} />,
  },
];

// bestuur: richt zich op bestuurlijke taken (o.a. besturing, strategie, verantwoording)
// sociaal: richt zich op de sociale kant van de maatschappij (o.a. werk, inkomen, zorg, jeugd)
// ruimte: richt zich op de fysieke omgeving (o.a. beheer openbare ruimte, afvalinzameling)
// publieksdiensten: richt zich op het verstrekken van, veelal door inwoners of bedrijven aangevraagde, gemeentelijke producten (o.a. reisdocumenten, sportstimulering)
// openbare orde en veiligheid: richt zich op bestuurlijke handhaving onder verantwoordelijkheid van de veiligheidsdomeinketen (o.a. preventiecampagnes, rampenoefeningen).
// ondersteuning: richt zich op het ondersteunen van bestuurlijke en primaire taken (o.a. huisvesting, personeelsmanagement).
