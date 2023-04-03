import clsx from "clsx";
import type { GatsbyLinkProps } from "gatsby";
import { Link as GatsbyLink } from "gatsby";
import React from "react";
import type { ButtonLinkProps as DesignSystemButtonLinkProps } from "@utrecht/component-library-react/dist/ButtonLink";
import { ButtonLink as DesignSystemButtonLink } from "@utrecht/component-library-react/dist/css-module";

type GatsbyLinkSubset<T> = Pick<GatsbyLinkProps<T>, "onClick" | "state" | "to">;

export interface ButtonLinkProps<T> extends Partial<GatsbyLinkSubset<T>>, DesignSystemButtonLinkProps {
  href?: string;
}

export const ButtonLink = <T,>({
  className,
  external,
  href,
  onClick,
  placeholder,
  state,
  to,
  ...restProps
}: ButtonLinkProps<T>): JSX.Element => {
  // TODO: `placeholder` is not supported for `GatsbyLink`.
  return typeof to === "string" ? (
    <GatsbyLink
      {...restProps}
      to={to}
      state={state}
      onClick={onClick}
      className={clsx("utrecht-button-link", "utrecht-button-link--html-a", className)}
      rel={external ? "external noopener noreferrer" : undefined}
    />
  ) : (
    <DesignSystemButtonLink
      external={external}
      href={href}
      onClick={onClick}
      placeholder={placeholder}
      {...restProps}
    />
  );
};
