import * as React from "react";
import * as styles from "./CardsResultTemplate.module.css";
import _ from "lodash";
import { RichContentCard } from "@conduction/components";
import { useTranslation } from "react-i18next";
import { HamburgerIcon, HouseIcon, SettingsIcon } from "@gemeente-denhaag/icons";

interface CardsResultTemplateProps {
  components: any[];
}

export const CardsResultTemplate: React.FC<CardsResultTemplateProps> = ({ components }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.ComponentsGrid}>
      {components.map((component) => (
        <RichContentCard
          key={component.id}
          link={{ label: component.name, href: `/components/${component.id}` }}
          labelsWithIcon={[
            { label: t("Layer"), icon: <HamburgerIcon /> },
            { label: t("Organisation"), icon: <HouseIcon /> },
            { label: t("Installations"), icon: <SettingsIcon /> },
          ]}
          tags={[component.developmentStatus, component.softwareType , component.usedBy ? component.usedBy.length : 0]}
          contentLinks={[
            {
              title: t("Repository"),
              subTitle: t("Check out the repository on GitHub"),
              href: component.isBasedOn,
            },
          ]}
        />
      ))}
    </div>
  );
};
