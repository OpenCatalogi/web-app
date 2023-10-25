import * as React from "react";
import { LandingTemplate } from "../templates/landing/LandingTemplate";
import { PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = (props: PageProps) => {
  return <LandingTemplate params={props.params} />;
};

export default IndexPage;
