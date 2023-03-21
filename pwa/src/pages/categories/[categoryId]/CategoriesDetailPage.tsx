import * as React from "react";
import { PageProps } from "gatsby";
import { CategoryDetailTemplate } from "../../../templates/categoryDetailTemplate/CategoryDetailTemplate";

const CategoriesDetailPage: React.FC<PageProps> = (props: PageProps) => {
	return <CategoryDetailTemplate categoryId={props.params.categoryId} />;
};
export default CategoriesDetailPage;
