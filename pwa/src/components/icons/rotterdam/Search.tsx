import * as React from "react";
import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSearch = ({
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
    <path d="M26 13c0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7 7-3.1 7-7Zm-16 0c0-5 4-9 9-9s9 4 9 9-4 9-9 9a8.981 8.981 0 0 1-5.629-1.958l-7.695 7.695-1.414-1.414 7.695-7.695A8.982 8.982 0 0 1 10 13Z" />
  </svg>
);
export default SvgSearch;
