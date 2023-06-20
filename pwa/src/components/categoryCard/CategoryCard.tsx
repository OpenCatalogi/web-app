import * as React from "react";
import * as styles from "./CategoryCard.module.css";
import { Divider } from "@gemeente-denhaag/components-react";
import { Icon, Paragraph } from "@utrecht/component-library-react/dist/css-module";
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
      <Divider />
      <Paragraph className={domain ?? styles.description}>{description}</Paragraph>
    </div>
  );
};
