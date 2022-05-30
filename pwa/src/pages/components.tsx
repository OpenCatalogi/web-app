import * as React from "react";
import { ComponentsTemplate } from "../templates/components/ComponentsTemplate";

const IndexPage = (props: any) => {
  const type: string = props.location.state.type ?? "";

  return <ComponentsTemplate defaultTypeFilter={type} />;
};

export default IndexPage;
