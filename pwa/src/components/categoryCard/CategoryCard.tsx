import * as React from "react";
import * as styles from "./CategoryCard.module.css";
import { Icon, Paragraph, Separator } from "@utrecht/component-library-react/dist/css-module";
import { Link } from "../link/Link";

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
    <div className={styles.container}>
      <div className={styles.titleLink}>
        <Link to={title.href}>
          <Icon className="utrecht-icon--conduction-start">{icon}</Icon>
          {title.label}
        </Link>
      </div>
      <Separator />
      <Paragraph className={domain ?? styles.description}>{description}</Paragraph>
    </div>
  );
};
