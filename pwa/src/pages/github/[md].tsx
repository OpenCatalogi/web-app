import * as React from "react";
import qs from "qs";
import { PageProps } from "gatsby";
import { MarkdownContentTemplate } from "../../templates/markdown/MarkdownContentTemplate";
import { GatsbyContext } from "../../context/gatsby";
import { useTranslation } from "react-i18next";
import { Page, PageContent } from "@utrecht/component-library-react/dist/css-module";

const MarkdownPage: React.FC<PageProps> = (props: PageProps) => {
  const { t } = useTranslation();
  const { location } = React.useContext(GatsbyContext);

  const url = location.search;
  const [, params] = url.split("?");
  const parsedParams = qs.parse(params);
  const link = parsedParams.link?.toString();

  const detailPageSlug = props.params.detailPageSlug;
  const pageSlug = props.params.pageSlug;

  if (!link) {
    return <span>{t("No markdown file found, make sure that the query param link is filled")}</span>;
  }

  return (
    <Page>
      <PageContent>
        <MarkdownContentTemplate {...{ pageSlug, detailPageSlug, link }} />
      </PageContent>
    </Page>
  );
};

export default MarkdownPage;
