import * as React from "react";
import _ from "lodash";
import { PageProps } from "gatsby";
import { AdminMyCatalogiDetailTemplate } from "../../../../templates/admin/adminMyCatalogiDetailTemplate/AdminMyCatalogiDetailTemplate";

const MyCatalogiDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return <AdminMyCatalogiDetailTemplate myCatalogiId={props.params.myCatalogiId} />;
};
export default MyCatalogiDetailPage;
