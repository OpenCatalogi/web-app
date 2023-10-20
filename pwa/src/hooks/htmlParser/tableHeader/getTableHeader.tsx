import * as styles from "./getTableHeader.module.css";
import { TableHeader } from "@utrecht/component-library-react/dist/css-module";
import { domToReact } from "html-react-parser";

export const getTableHeader = (props: any, children: any, options: any) => {
  return (
    <TableHeader className={styles.tableHeader} {...props}>
      {domToReact(children, options)}
    </TableHeader>
  );
};
