import { TGroupedSelectOption } from "@conduction/components/lib/components/formFields/select/select";

import Conduction from "./../../static/configFiles/conduction.json";
import CommonGround from "./../../static/configFiles/common-ground.json";
import Rotterdam from "./../../static/configFiles/rotterdam.json";

export const getConfig = (themeOrDomainName: string): Record<string, any> | undefined => {
  switch (themeOrDomainName) {
    // case "localhost": // development purposes
    case "commonground-theme":
      return CommonGround;
    case "rotterdam-theme":
      return Rotterdam;
    case "conduction-theme":
      return Conduction;

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
    ],
  },
];
