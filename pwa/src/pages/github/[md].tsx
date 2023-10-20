import * as React from "react";
import qs from "qs";
import { PageProps } from "gatsby";
import { MarkdownContentTemplate } from "../../templates/markdown/MarkdownContentTemplate";
import { GatsbyContext } from "../../context/gatsby";
import { useTranslation } from "react-i18next";

const MarkdownPage: React.FC<PageProps> = (props: PageProps) => {
  const { t } = useTranslation();
  const { location } = React.useContext(GatsbyContext);

  const url = location.search;
  const [, params] = url.split("?");
  const parsedParams = qs.parse(params);
  const link = parsedParams.link?.toString();

  const detailPageSlug = props.params.detailPageSlug;
  const pageSlug = props.params.pageSlug;

  return (
    <>
      {link && <MarkdownContentTemplate {...{ pageSlug, detailPageSlug, link }} />}
      {!link && <span>{t("No markdown file found, make sure that the query param link is filled")}</span>}
    </>
  );
};

export default MarkdownPage;
