import { PageProps } from "gatsby";
import _ from "lodash";
import * as React from "react";
import { TEMPORARY_ORGANIZATIONS } from "../../../data/organizations";
import { ComponentsDetailTemplate } from "../../../templates/componentDetail/ComponentsDetailTemplate";

const ComponentsDetailPage: React.FC<PageProps> = (props: PageProps) => {
  let TempOrganization = [];

  const sample = _.sample(TEMPORARY_ORGANIZATIONS);
  
  TempOrganization.push(sample);
  

  return (
    <>
      {TempOrganization && (
        <ComponentsDetailTemplate componentId={props.params.componentId} TempOrganization={TempOrganization} />
      )}
    </>
  );
};
export default ComponentsDetailPage;
