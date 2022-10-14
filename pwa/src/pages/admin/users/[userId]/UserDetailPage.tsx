import * as React from "react";
import _ from "lodash";
import { PageProps } from "gatsby";
import { AdminUsersDetailTemplate } from "../../../../templates/admin/adminUserDetailTemplate/AdminUserDetailTemplate";

const UserDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return <AdminUsersDetailTemplate userId={props.params.userId} />;
};
export default UserDetailPage;
