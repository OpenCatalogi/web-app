import * as React from "react";
import { PageProps } from "gatsby";
import { ApplicationsDetailTemplate } from "../../../templates/applicationsDetailTemplate/ApplicationsDetailTemplate";

const ApplicationsDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return <ApplicationsDetailTemplate applicationId={props.params.applicationId} />;
};
export default ApplicationsDetailPage;
