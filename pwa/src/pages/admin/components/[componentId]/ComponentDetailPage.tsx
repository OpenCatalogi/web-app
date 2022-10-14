import * as React from "react";
import _ from "lodash";
import { PageProps } from "gatsby";
import { AdminComponentDetailTemplate } from "../../../../templates/admin/adminComponentDetailTemplate/AdminComponentiDetailTemplate";

const ComponentDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return <AdminComponentDetailTemplate componentId={props.params.componentId} />;
};
export default ComponentDetailPage;
