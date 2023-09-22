import * as React from "react";
import * as styles from "./CategoryCard.module.css";
import { Icon, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { Link } from "../link/Link";
import { CardHeader, CardHeaderTitle, CardWrapper } from "@conduction/components";

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
          <div className={styles.titleLink}>
            <Link to={title.href}>
              <Icon className="utrecht-icon--conduction-start">{icon}</Icon>
              {title.label}
            </Link>
          </div>
        </CardHeaderTitle>
      </CardHeader>
      <Paragraph className={domain ?? styles.description}>{description}</Paragraph>
    </CardWrapper>
  );
};
