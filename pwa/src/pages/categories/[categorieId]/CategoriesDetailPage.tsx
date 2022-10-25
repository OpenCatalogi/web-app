import * as React from "react";
import { PageProps } from "gatsby";
import { CategoriesDetailTemplate } from "../../../templates/categoriesDetailTemplate/CategoriesDetailTemplate";

const CategoriesDetailPage: React.FC<PageProps> = (props: PageProps) => {
  return <CategoriesDetailTemplate categorieId={props.params.categorieId} />;
};
export default CategoriesDetailPage;
