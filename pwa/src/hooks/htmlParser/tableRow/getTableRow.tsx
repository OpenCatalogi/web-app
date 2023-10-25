import * as styles from "./getTableRow.module.css";
import { TableRow } from "@utrecht/component-library-react/dist/css-module";
import { domToReact } from "html-react-parser";

export const getTableRow = (props: any, children: any, options: any) => {
  return (
    <TableRow className={styles.tableRow} {...props}>
      {domToReact(children, options)}
    </TableRow>
  );
};
