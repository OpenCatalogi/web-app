import * as React from "react";
import { TOrganizationsResultDisplayLayout } from "../../../context/resultDisplayLayout";
import { CardsOrganizationDisplayTemplate } from "./cards/CardsOrganizationDisplayTemplate";
import { TableOrganizationDisplayTemplate } from "./table/TableOrganizationDisplayTemplate";

interface OrganizationDisplayTemplateProps {
  type: TOrganizationsResultDisplayLayout;
  organizations: any[];

}

export const OrganizationDisplayTemplate: React.FC<OrganizationDisplayTemplateProps> = ({ organizations, type }) => {
  switch (type) {
    case "table":
      return <TableOrganizationDisplayTemplate  {...{ organizations }}/>;

    case "cards":
      return <CardsOrganizationDisplayTemplate  {...{ organizations }}/>;
  }
};
