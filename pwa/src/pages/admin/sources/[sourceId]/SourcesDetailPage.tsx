import * as React from "react";
import _ from "lodash";
import { PageProps } from "gatsby";
import { AdminSourcesDetailTemplate } from "../../../../templates/admin/adminSourcesDetailTemplate/AdminSourcesDetailTemplate";

const SourcesDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return <AdminSourcesDetailTemplate sourcesId={props.params.sourceId} />;
};
export default SourcesDetailPage;
