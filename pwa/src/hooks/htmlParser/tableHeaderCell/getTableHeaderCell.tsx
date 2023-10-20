import { TableHeaderCell } from "@utrecht/component-library-react/dist/css-module";
import { domToReact } from "html-react-parser";

export const getTableHeaderCell = (props: any, children: any, options: any) => {
  return <TableHeaderCell {...props}>{domToReact(children, options)}</TableHeaderCell>;
};
