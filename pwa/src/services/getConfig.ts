import { TGroupedSelectOption } from "@conduction/components/lib/components/formFields/select/select";

import Conduction from "./../../static/configFiles/conduction.json";

export const getConfig = (themeOrDomainName: string): Record<string, any> | undefined => {
  switch (themeOrDomainName) {
    case "localhost": // development purposes
      return Conduction;
    

    default:
      return Conduction;
  }
};

export const availableThemes: TGroupedSelectOption[] = [
  {
    label: "Alle overheidsorganisaties",
    options: [
      { label: "Conduction", value: "conduction-theme" },
    ],
  },
];
