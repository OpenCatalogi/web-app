import * as React from "react";
import * as styles from "./CardsResultTemplate.module.css";
import _ from "lodash";
import { RichContentCard } from "@conduction/components";
import { useTranslation } from "react-i18next";
import { HamburgerIcon, HouseIcon } from "@gemeente-denhaag/icons";

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
            { label: _.upperFirst(component.layer), icon: <HamburgerIcon /> },
            { label: component.organisation, icon: <HouseIcon /> },
          ]}
          tags={[component.status, component.softwareType]}
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
