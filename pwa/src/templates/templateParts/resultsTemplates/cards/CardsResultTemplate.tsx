import * as React from "react";
import * as styles from "./CardsResultTemplate.module.css";
import _ from "lodash";
import { ComponentCard } from "../../../../components/componentCard/ComponentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

interface CardsResultTemplateProps {
  components: any[];
}

export const CardsResultTemplate: React.FC<CardsResultTemplateProps> = ({ components }) => {
  return (
    <div className={styles.ComponentsGrid}>
      {components.map((component) => (
        <ComponentCard
          key={component.id}
          title={{ label: component.name, href: `/components/${component.id}` }}
          description={component.embedded?.description.shortDescription}
          layer={component.embedded?.nl.embedded?.commonground.layerType}
          category={{ label: "functie autorisatie", icon: <FontAwesomeIcon icon={faLock} /> }}
          tags={{
            status: component.developmentStatus,
            installations: component.usedBy?.length,
            organisation: component.embedded?.legal.embedded?.repoOwner.name,
            licence: component.embedded?.legal.license,
            githubLink: component.embedded?.url?.url,
          }}
        />
      ))}
    </div>
  );
};
