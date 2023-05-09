import * as React from "react";
import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgArrowright = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="CurrentColor"
    width="1em"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m18.858 9.732 1.414-1.414 6.29 6.29.034-.032 1.414 1.414-1.412 1.412.033.032-6.293 6.294-1.414-1.415L24.237 17H4v-2h20.125l-5.267-5.268Z" />
  </svg>
);
export default SvgArrowright;
