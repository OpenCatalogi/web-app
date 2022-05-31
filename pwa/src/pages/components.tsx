import * as React from "react";
import { ComponentsTemplate } from "../templates/components/ComponentsTemplate";

const IndexPage = (props: any) => {
  const state = props.location?.state;
  let type = state ? state.type : "";

  return <ComponentsTemplate defaultTypeFilter={type} />;
};

export default IndexPage;
