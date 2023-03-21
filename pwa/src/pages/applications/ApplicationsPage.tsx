import * as React from "react";
import { PageProps } from "gatsby";
import _ from "lodash";
import { ApplicationsTemplate } from "../../templates/applicationsTemplate/ApplicationsTemplate";

const ApplicationsPage: React.FC<PageProps> = (props: PageProps) => {
	return <ApplicationsTemplate />;
};
export default ApplicationsPage;
