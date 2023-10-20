import * as React from "react";
import _ from "lodash";
import { Link } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby";
import { domToReact } from "html-react-parser";
import { TGitHubDirectory } from "../../useGitHubDirectories";

export const getAnchor = (
  props: any,
  children: any,
  options: any,
  directories: TGitHubDirectory[],
  location: string,
) => {
  const conditions = ["://", "tel:", "mailto:"];
  const handleClick = (e: any) => {
    e.preventDefault();

    const targetFile = _.upperFirst(props.href.substring(props.href.lastIndexOf("/") + 1).replace(".md", ""));

    // No link
    if (!props.href) {
      navigate("#");

      return;
    }

    // Anchor Links
    if (props.className === "anchor" || Array.from(props.href)[0] === "#") {
      handleAnchorClick(props); // handles on-page scroll anchors

      return;
    }

    // Internal Links
    if (!conditions.some((substring) => props.href.includes(substring))) {
      handleInternalLinks(props, targetFile, location, directories);

      return;
    }

    // External Links
    if (conditions.some((substring) => props.href.includes(substring))) {
      open(props.href);

      return;
    }
  };

  const attributes = {
    ...props,
    onClick: handleClick,
  };

  return <Link {...attributes}>{domToReact(children, options)}</Link>;
};

const handleInternalLinks = (props: any, targetFile: string, location: string, directories: TGitHubDirectory[]) => {
  // Internal Links: same directory
  if (!props.href.includes("/")) {
    const targetDirectory = _.upperFirst(location.split("/").reverse()[1]);
    navigate(`/pages/${targetDirectory}/${targetFile}`);

    return; // ensure no other flow is triggered
  }

  // Internal Links: homepage
  if (props.href.includes("/") && location === "/") {
    const directoryFound = directories.some((directory) => directory.location === props.href);

    if (directoryFound) navigate(`/pages/${targetFile}`);

    return; // ensure no other flow is triggered
  }

  // Internal Links: different directory
  if (props.href.includes("/")) {
    const targetDirectory = props.href.split("/").reverse()[1];
    const directoryFound = directories.some(
      (directory) => directory.location.substring(directory.location.lastIndexOf("/") + 1) === targetDirectory,
    );

    // Internal Link exists: redirect to page
    if (directoryFound) {
      navigate(`/pages/${_.upperFirst(targetDirectory)}/${targetFile}`);
    }

    // Internal Link does not exist: redirect to online GitHub environment (TODO)
    if (!directoryFound) {
      const hrefWithLeadingSlash = !props.href.startsWith("/") ? `/${props.href}` : props.href;

      open(`${process.env.GATSBY_GITHUB_REPOSITORY_URL}/blob/master${hrefWithLeadingSlash}`);
    }

    return; // ensure no other flow is triggered
  }
};

const handleAnchorClick = (props: any) => {
  const targetId = props.id ?? props.href.replace("#", "user-content-");

  const target = document.getElementById(targetId);
  const headerHeight = document.getElementById("header")?.clientHeight ?? 100;

  if (target) {
    window.scrollTo({ top: target.offsetTop - (headerHeight + 24), behavior: "smooth" }); // +24 simply adds some padding
  }
};
