import * as React from "react";
import { PageProps } from "gatsby";
import { DirectoryDetailTemplate } from "../../../templates/directoryDetail/DirectoryDetailTemplate";

const DirectoriesDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return <DirectoryDetailTemplate directoryId={props.params.directoryId} />;
};
export default DirectoriesDetailPage;
