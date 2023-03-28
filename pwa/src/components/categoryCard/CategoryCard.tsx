import * as React from "react";
import * as styles from "./CategoryCard.module.css";
import { Divider, Paragraph } from "@gemeente-denhaag/components-react";
import { Icon, Link } from "@utrecht/component-library-react/dist/css-module";
import { Link as GatsbyLink } from "gatsby";

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
        <GatsbyLink to={title.href}>
          <Link>
            <Icon className="utrecht-icon--conduction-start">{icon}</Icon>
            {title.label}
          </Link>
        </GatsbyLink>
      </div>
      <Divider />
      <Paragraph className={domain ?? styles.description}>{description}</Paragraph>
    </div>
  );
};
