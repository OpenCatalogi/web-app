import * as React from "react";
import { useMarkdown } from "../../hooks/markdown";
import { ParsedHTML } from "../../components/ParsedHTML/ParsedHTML";
import { useMarkdownDirectories } from "../../hooks/useGitHubDirectories";
import { Page, PageContent } from "@utrecht/component-library-react/dist/css-module";

interface MarkdownContentTemplateProps {
  pageSlug: string;
  detailPageSlug: string;
  link: string;
}

export const MarkdownContentTemplate: React.FC<MarkdownContentTemplateProps> = ({ pageSlug, detailPageSlug, link }) => {
  const { getDetailMdLocation } = useMarkdownDirectories();

  const location = getDetailMdLocation(pageSlug, detailPageSlug);

  const getContent = useMarkdown().getContent(link);

  return (
    <Page>
      <PageContent>
        <ParsedHTML contentQuery={getContent} {...{ location }} />
      </PageContent>
    </Page>
  );
};
