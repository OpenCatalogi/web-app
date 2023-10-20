import * as styles from "./getTableBody.module.css";
import { TableBody } from "@utrecht/component-library-react/dist/css-module";
import { domToReact } from "html-react-parser";

export const getTableBody = (props: any, children: any, options: any) => {
  return (
    <TableBody className={styles.tableBody} {...props}>
      {domToReact(children, options)}
    </TableBody>
  );
};
