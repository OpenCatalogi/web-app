import { PageProps } from "gatsby";
import * as React from "react";
import { ApiDocsTemplate } from "../templates/apiDocs/ApiDocsTemplate";

const IndexPage: React.FC<PageProps> = () => {
  return <ApiDocsTemplate />;
};

export default IndexPage;
