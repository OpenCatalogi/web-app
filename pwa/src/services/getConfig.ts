import { TGroupedSelectOption } from "@conduction/components/lib/components/formFields/select/select";

import Conduction from "./../../static/configFiles/conduction.json";
import CommonGround from "./../../static/configFiles/common-ground.json";

export const getConfig = (themeOrDomainName: string): Record<string, any> | undefined => {
  switch (themeOrDomainName) {
    case "localhost": // development purposes
    case "commonground-theme":
      return CommonGround;

    default:
      return Conduction;
  }
};

export const availableThemes: TGroupedSelectOption[] = [
  {
    label: "Alle overheidsorganisaties",
    options: [
      { label: "Common Ground", value: "commonground-theme" },
      { label: "Conduction", value: "conduction-theme" },
    ],
  },
];
