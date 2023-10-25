import * as styles from "./getList.module.css";
import { OrderedList, UnorderedList } from "@utrecht/component-library-react/dist/css-module";
import { domToReact } from "html-react-parser";

export const getList = (name: string, props: any, children: any, options: any) => {
  switch (name) {
    case "ol":
      return (
        <OrderedList className={styles.list} {...props}>
          {domToReact(children, options)}
        </OrderedList>
      );
    case "ul":
      return (
        <UnorderedList className={styles.list} {...props}>
          {domToReact(children, options)}
        </UnorderedList>
      );
  }
};
