import * as React from "react";
import * as styles from "./CategoryCard.module.css";
import { Icon, Link, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { CardHeader, CardHeaderTitle, CardWrapper } from "@conduction/components";
import { navigate } from "gatsby-link";

export interface CategoryCardProps {
  title: {
    label: string;
    href: string;
  };
  description: string | JSX.Element;
  icon: JSX.Element;
  domain?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, icon, domain }) => {
  return (
    <CardWrapper className={styles.container}>
      <CardHeader>
        <CardHeaderTitle>
          <Link className={styles.titleLink} onClick={() => navigate(title.href)}>
            <Icon className={styles.icon}>{icon}</Icon>
            {title.label}
          </Link>
        </CardHeaderTitle>
      </CardHeader>
      <Paragraph className={domain ?? styles.description}>{description}</Paragraph>
    </CardWrapper>
  );
};
