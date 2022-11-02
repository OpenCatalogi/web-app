import * as React from "react";
import * as styles from "./CategoryCard.module.css";
import { Divider, Link, Paragraph } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import _ from "lodash";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.titleLink} onClick={() => navigate(title.href)}>
        <Link icon={icon} iconAlign="start">
          {title.label}
        </Link>
      </div>
      <Divider />
      <Paragraph className={domain ?? styles.description}>{description}</Paragraph>
    </div>
  );
};
