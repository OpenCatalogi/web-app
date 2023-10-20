import * as styles from "./getAlert.module.css";
import { Alert } from "@utrecht/component-library-react/dist/css-module";
import { domToReact } from "html-react-parser";

export const getAlert = (children: any, options: any, type: any) => {
  switch (true) {
    case type.includes("note") || type.includes("info"):
      return (
        <Alert className={styles.info} type="info">
          {domToReact(children, options)}
        </Alert>
      );
    case type.includes("error"):
      return (
        <Alert className={styles.error} type="error">
          {domToReact(children, options)}
        </Alert>
      );
    case type.includes("warning"):
      return (
        <Alert className={styles.warning} type="warning">
          {domToReact(children, options)}
        </Alert>
      );
    case type.includes("succes") || type.includes("ok"):
      return (
        <Alert className={styles.ok} type="ok">
          {domToReact(children, options)}
        </Alert>
      );
    default:
      return <Alert type="info">{domToReact(children, options)}</Alert>;
  }
};
