import { domToReact } from "html-react-parser";

export const getSvg = (props: any, children: any, options: any) => {
  if (props.className.includes("octicon octicon-link")) {
    return <></>;
  }

  return <svg {...props}>{domToReact(children, options)}</svg>;
};
