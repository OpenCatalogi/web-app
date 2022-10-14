import * as React from "react";
import _ from "lodash";
import { PageProps } from "gatsby";
import { AdminCatalogiDetailTemplate } from "../../../../templates/admin/adminCatalogiDetailTemplate/AdminCatalogiDetailTemplate";

const CatalogiDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return <AdminCatalogiDetailTemplate catalogiId={props.params.catalogiId} />;
};
export default CatalogiDetailPage;
