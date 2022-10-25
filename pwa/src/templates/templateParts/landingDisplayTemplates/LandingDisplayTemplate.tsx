import * as React from "react";
import * as _ from "lodash";
import { TLandingDisplayLayout } from "../../../context/filters";
import { CardsLandingDisplayTemplate } from "./cards/CardsLandingDisplayTemplate";
import { LayersLandingDisplayTemplate } from "./layer/LayersLandingDisplayTemplate";

interface LandingDisplayTemplateProps {
  type: TLandingDisplayLayout;
}

export const LandingDisplayTemplate: React.FC<LandingDisplayTemplateProps> = ({ type }) => {
  switch (type) {
    case "cards":
      return <CardsLandingDisplayTemplate />;

    case "layer":
      return <LayersLandingDisplayTemplate />;
  }
};
