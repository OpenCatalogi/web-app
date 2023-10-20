import * as styles from "./getTable.module.css";
import { Table } from "@utrecht/component-library-react/dist/css-module";
import { domToReact } from "html-react-parser";

export const getTable = (props: any, children: any, options: any) => {
  return (
    <Table className={styles.table} {...props}>
      {domToReact(children, options)}
    </Table>
  );
};
