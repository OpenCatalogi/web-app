import { PageProps } from "gatsby";
import * as React from "react";
import { OrganizationDetailTemplate } from "../../../templates/organizationDetail/OrganizationDetailTemplate";

const OrganizationDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return <OrganizationDetailTemplate organizationId={props.params.organizationId} />;
};
export default OrganizationDetailPage;
