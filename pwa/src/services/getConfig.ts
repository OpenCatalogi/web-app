import { TGroupedSelectOption } from "@conduction/components/lib/components/formFields/select/select";

import Conduction from "./../../static/configFiles/conduction.json";
import CommonGround from "./../../static/configFiles/common-ground.json";
import Rotterdam from "./../../static/configFiles/rotterdam.json";
import Epe from "./../../static/configFiles/epe.json";
import Noordwijk from "./../../static/configFiles/noordwijk.json";
import Leiden from "./../../static/configFiles/leiden.json";
import Dimpact from "./../../static/configFiles/dimpact.json";
import OpenWebconcept from "./../../static/configFiles/open-webconcept.json";
import OpenCatalogi from "./../../static/configFiles/opencatalogi.json";

export const getConfig = (themeOrDomainName: string): Record<string, any> | undefined => {
  switch (themeOrDomainName) {
    // case "localhost": // development purposes
    case "commonground-theme":
      return CommonGround;
    case "rotterdam-theme":
      return Rotterdam;
    case "conduction-theme":
      return Conduction;
    case "epe-theme":
      return Epe;
    case "noordwijk-theme":
      return Noordwijk;
    case "leiden-theme":
      return Leiden;
    case "dimpact-theme":
      return Dimpact;
    case "open-webconcept-theme":
      return OpenWebconcept;
    case "opencatalogi.nl":
    case "dev.opencatalogi.nl":
      return OpenCatalogi;

    default:
      return CommonGround;
  }
};

export const availableThemes: TGroupedSelectOption[] = [
  {
    label: "Alle overheidsorganisaties",
    options: [
      { label: "Common Ground", value: "commonground-theme" },
      { label: "Conduction", value: "conduction-theme" },
      { label: "Rotterdam", value: "rotterdam-theme" },
      { label: "Epe", value: "epe-theme" },
      { label: "Noordwijk", value: "noordwijk-theme" },
      { label: "Leiden", value: "leiden-theme" },
      { label: "Dimpact", value: "dimpact-theme" },
      { label: "OpenWebconcept", value: "open-webconcept-theme" },
    ],
  },
];
