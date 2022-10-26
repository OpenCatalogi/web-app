import * as React from "react";
import * as styles from "./CategoryCard.module.css";
import { Divider, Link, Paragraph } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { Tag } from "@conduction/components";
import { TEMPORARY_DOMAINS } from "../../data/domains";

export interface CategoryCardProps {
  title: {
    label: string;
    href: string;
  };
  description: string;
  icon: JSX.Element;
  domain: {
    label: string;
    icon: JSX.Element;
  };
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, icon, domain }) => {
  const { t } = useTranslation();

  const domainIcon = TEMPORARY_DOMAINS.find((_domain) => {
    return _domain.title === domain.label;
  });

  return (
    <div className={styles.container}>
      <div className={styles.titleLink} onClick={() => navigate(title.href)}>
        <Link icon={icon} iconAlign="start">
          {title.label}
        </Link>
      </div>
      {domainIcon && <Tag label={t(domain.label)} icon={domainIcon?.icon} />}
      <Divider />
      <Paragraph className={styles.description}>{description}</Paragraph>
    </div>
  );
};
