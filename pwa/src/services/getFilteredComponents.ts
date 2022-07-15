import { IFilters } from "../context/filters";
import * as _ from "lodash";

export const getFilteredComponents = (components: any[], f: IFilters): any[] => {
  let filteredComponents = components;

  if (f.name) {
    filteredComponents = filteredComponents.filter((c) => _.toLower(c.name).includes(_.toLower(f.name)));
  }

  if (f.layerType?.length) {
    filteredComponents = filteredComponents.filter((c) => f.layerType?.includes(c.layerType));
  }

  return filteredComponents;
};
