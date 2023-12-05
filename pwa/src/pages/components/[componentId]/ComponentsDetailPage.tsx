import * as React from "react";
import { PageProps } from "gatsby";
import { ComponentsDetailTemplate } from "../../../templates/componentDetail/ComponentsDetailTemplate";

const ComponentsDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <ComponentsDetailTemplate
      componentId={props.params.componentId}
    />
  );
};
export default ComponentsDetailPage;
