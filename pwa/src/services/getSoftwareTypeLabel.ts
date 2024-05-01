import _ from "lodash";
import { softwareTypes } from "../data/filters";

export const getSoftwareTypeLabel = (softwareType: string) => {
  const _softwareType = softwareTypes.find((type) => type.value === softwareType);

  if (_softwareType) return _softwareType.label;
  return _.upperFirst(softwareType ?? "unknown");
};
