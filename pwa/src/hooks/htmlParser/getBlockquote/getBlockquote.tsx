import { Alert } from "@utrecht/component-library-react/dist/css-module";
import { domToReact } from "html-react-parser";

export const getBlockquote = (children: any, options: any) => {
  return <Alert>{domToReact(children, options)}</Alert>;
};
