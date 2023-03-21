import { PageProps } from "gatsby";
import * as React from "react";
import { AboutTemplate } from "../../templates/about/AboutTemplate";

const IndexPage: React.FC<PageProps> = () => {
	return <AboutTemplate />;
};

export default IndexPage;
