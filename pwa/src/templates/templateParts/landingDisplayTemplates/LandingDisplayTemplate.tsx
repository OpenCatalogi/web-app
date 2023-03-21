import * as React from "react";
import * as _ from "lodash";
import { TLandingDisplayLayout } from "../../../context/filters";
import { LayersLandingDisplayTemplate } from "./layer/LayersLandingDisplayTemplate";
import { CategoriesLandingDisplayTemplate } from "./categories/CategoriesLandingDisplayTemplate";

interface LandingDisplayTemplateProps {
  type: TLandingDisplayLayout;
}

export const LandingDisplayTemplate: React.FC<LandingDisplayTemplateProps> = ({ type }) => {
	switch (type) {
	case "cards":
		return <CategoriesLandingDisplayTemplate />;

	case "layer":
		return <LayersLandingDisplayTemplate />;
	}
};
