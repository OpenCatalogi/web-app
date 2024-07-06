import * as React from "react";
import { PageProps } from "gatsby";
import { PublicationsDetailTemplate } from "../../../templates/publicationDetail/PublicationsDetailTemplate";

const PublicationsDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return <PublicationsDetailTemplate publicationId={props.params.publicationId} />;
};
export default PublicationsDetailPage;
