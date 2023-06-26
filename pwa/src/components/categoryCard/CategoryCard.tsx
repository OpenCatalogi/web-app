import * as React from "react";
import * as styles from "./CategoryCard.module.css";
import { Divider } from "@gemeente-denhaag/components-react";
import { Icon } from "@utrecht/component-library-react/dist/css-module";
import { Link } from "../link/Link";
import { Paragraph, UnorderedList } from "@utrecht/component-library-react";
import { ListItem } from "@material-ui/core";
import { navigate } from "gatsby";

type TCategoryItem = {
  title: string;
  href: string;
};

export interface CategoryCardProps {
  title: {
    label: string;
    href: string;
  };
  content: string | TCategoryItem[];
  icon: JSX.Element;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, content, icon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleLink}>
        <Link to={title.href}>
          <Icon className="utrecht-icon--conduction-start">{icon}</Icon>
          {title.label}
        </Link>
      </div>

      <Divider />

      {!Array.isArray(content) && <Paragraph>{content}</Paragraph>}

      {Array.isArray(content) && (
        <UnorderedList className={styles.categoriesList}>
          {content.map((item, idx) => (
            <ListItem key={idx}>
              <Link onClick={() => navigate(item.href)}>{item.title}</Link>
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </div>
  );
};
