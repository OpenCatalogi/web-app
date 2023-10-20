import { OrderedListItem, UnorderedListItem } from "@utrecht/component-library-react/dist/css-module";
import { domToReact } from "html-react-parser";

export const getListItem = (props: any, parent: any, children: any, options: any) => {
  switch (parent.name) {
    case "ol":
      return <OrderedListItem {...props}>{domToReact(children, options)}</OrderedListItem>;
    case "ul":
      return <UnorderedListItem {...props}>{domToReact(children, options)}</UnorderedListItem>;
  }

  return;
};
