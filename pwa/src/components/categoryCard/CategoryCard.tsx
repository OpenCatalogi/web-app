import * as React from "react";
import * as styles from "./CategoryCard.module.css";
import clsx from "clsx";
import { Icon, Link, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { CardHeader, CardHeaderTitle, CardWrapper } from "@conduction/components";
import { navigate } from "gatsby-link";

export interface CategoryCardProps {
  title: {
    label: string;
    href: string;
  };
  description?: string;
  customContent?: JSX.Element;
  icon: JSX.Element;
  domain?: boolean;
  titleHrefOnly?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  domain,
  titleHrefOnly,
  customContent,
}) => {
  return (
    <CardWrapper className={styles.container} onClick={() => !titleHrefOnly && navigate(title.href)}>
      <CardHeader>
        <CardHeaderTitle>
          <Link className={styles.titleLink} onClick={() => navigate(title.href)}>
            <Icon>{icon}</Icon>
            {title.label}
          </Link>
        </CardHeaderTitle>
      </CardHeader>
      {description && <Paragraph className={clsx(domain ?? styles.description)}>{description}</Paragraph>}
      {customContent && <div className={clsx(domain ?? styles.description, "utrecht-paragraph")}>{customContent}</div>}
    </CardWrapper>
  );
};
