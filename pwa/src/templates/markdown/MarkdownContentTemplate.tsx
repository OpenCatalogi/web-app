import * as React from "react";
import { useMarkdown } from "../../hooks/markdown";
import { ParsedHTML } from "../../components/ParsedHTML/ParsedHTML";
import { useMarkdownDirectories } from "../../hooks/useMarkdownDirectories";
import { Page, PageContent } from "@utrecht/component-library-react/dist/css-module";

interface MarkdownContentTemplateProps {
  pageSlug: string;
  detailPageSlug: string;
  link: string;
}

export const MarkdownContentTemplate: React.FC<MarkdownContentTemplateProps> = ({ pageSlug, detailPageSlug, link }) => {
  const { getDetailMdLocation } = useMarkdownDirectories();

  const location = getDetailMdLocation(pageSlug, detailPageSlug);

  let content: any;

  if (link.includes("https://github.com/")) {
    let linkHttps = "";
    let linkContents = "";
    linkHttps = link.replace("https://github.com/", "https://api.github.com/repos/");

    if (linkHttps.includes("/blob/main/")) linkContents = linkHttps.replace("/blob/main/", "/contents/");
    if (linkHttps.includes("/blob/master/")) linkContents = linkHttps.replace("/blob/master/", "/contents/");

    content = useMarkdown().getContent(linkContents);
  }

  if (link.includes("https://api.github.com/repos/")) {
    content = useMarkdown().getContent(link);
  }

  if (!link.includes("https://api.github.com/repos/") && !link.includes("https://github.com/")) {
    content = useMarkdown().getContent(link);
  }

  return (
    <Page>
      <PageContent>
        <ParsedHTML contentQuery={content} {...{ location }} />
      </PageContent>
    </Page>
  );
};
