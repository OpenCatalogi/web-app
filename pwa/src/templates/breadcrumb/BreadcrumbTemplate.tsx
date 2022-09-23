import * as React from "react";
import * as styles from './BreadcrumbTemplate.module.css'
import { GatsbyContext } from "../../context/gatsby";
import { Breadcrumbs } from "@conduction/components";
import _ from "lodash";
import { useTranslation } from "react-i18next";

export const BreadcrumbTemplate: React.FC = () => {
  const { t } = useTranslation();

  const {
    pageContext: {
      breadcrumb: { crumbs },
    },
  } = React.useContext(GatsbyContext);

  const uppercaseCrumbs = crumbs.map((crumb: any) => ({
    ...crumb, crumbLabel: _.upperFirst(crumb.crumbLabel)
  }))

  const translatedBreadcrumbs = uppercaseCrumbs.map((crumb: any) => ({
    ...crumb, crumbLabel: t(crumb.crumbLabel)
  }))

  return (
    <div className={styles.container}><Breadcrumbs crumbs={translatedBreadcrumbs}/></div>
  );
};