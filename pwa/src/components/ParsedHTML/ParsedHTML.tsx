import * as React from "react";
import * as styles from "./ParsedHTML.module.css";
import Parser from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import showdown from "showdown";
import { Alert } from "@utrecht/component-library-react/dist/css-module";
import { UseQueryResult } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { useHtmlParser } from "../../hooks/htmlParser/useHtmlParser";
import { isHtml } from "../../services/isHtml";

interface ParsedHTMLProps {
  contentQuery: UseQueryResult<any, Error>;
  location: string;
  layoutClassName?: string;
}

export const ParsedHTML: React.FC<ParsedHTMLProps> = ({ contentQuery, location, layoutClassName }) => {
  const { options } = useHtmlParser(location);
  let htmlContent;

  showdown.setFlavor("github");

  if (!isHtml(contentQuery.data)) {
    const converter = new showdown.Converter();
    htmlContent = `<div><article class="markdown-body entry-content container-lg" itemprop="text">${converter.makeHtml(
      contentQuery.data,
    )}</article></div>`;
  }
  if (isHtml(contentQuery.data)) {
    htmlContent = contentQuery.data;
  }

  if (contentQuery.isLoading)
    return (
      <div className={styles.container}>
        <Skeleton height="200px" />
      </div>
    );

  if (contentQuery.isError)
    return (
      <div className={styles.container}>
        <Alert icon={<FontAwesomeIcon icon={faWarning} />} type="error">
          Oops, something went wrong retrieving the .md file from GitHub.
        </Alert>
      </div>
    );

  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>{Parser(htmlContent, options)}</div>
  );
};
