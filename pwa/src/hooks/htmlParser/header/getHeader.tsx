import { Heading1, Heading2, Heading3, Heading4 } from "@utrecht/component-library-react/dist/css-module";
import { domToReact } from "html-react-parser";

export const getHeader = (name: string, props: any, children: any, options: any) => {
  switch (name) {
    case "h1":
      return <Heading1 {...props}>{domToReact(children, options)}</Heading1>;
    case "h2":
      return <Heading2 {...props}>{domToReact(children, options)}</Heading2>;
    case "h3":
      return <Heading3 {...props}>{domToReact(children, options)}</Heading3>;
    case "h4":
      return <Heading4 {...props}>{domToReact(children, options)}</Heading4>;
  }
};
