import * as React from "react";
import _ from "lodash";
import { PageProps } from "gatsby";
import { ComponentsDetailTemplate } from "../../../templates/componentDetail/ComponentsDetailTemplate";

const ComponentsDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <ComponentsDetailTemplate
      componentId={props.params.componentId}
      sizeKb={_.toString(Math.floor(Math.random() * 204800) + 103598)}
    />
  );
};
export default ComponentsDetailPage;
