import * as React from "react";
import * as styles from "./CardsResultTemplate.module.css";
import _ from "lodash";
import { ComponentCard } from "../../../../components/componentCard/ComponentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { TEMPORARY_ORGANIZATIONS } from "../../../../data/organizations";
import { OrganizationCard } from "../../../../components/organizationCard/OrganizationCard";

interface CardsResultTemplateProps {
  components: any[];
}

export const CardsResultTemplate: React.FC<CardsResultTemplateProps> = ({
  components,
}) => {
  const fullData = components.concat(TEMPORARY_ORGANIZATIONS);

  return (
    <div className={styles.ComponentsGrid}>
      {fullData.map((organization: any) => (
        <OrganizationCard
          title={{
            label: organization.name,
            href: `/organizations/${organization.id}`,
          }}
          description={organization.description}
          website={organization.website}
          logo={organization.logo}
          components={{
            owned: organization.owns?.length.toString() ?? "0",
            supported: organization.supports?.length.toString() ?? "0",
            used: organization.uses?.length.toString() ?? "0",
          }}
          github={organization.github}
          gitlab={organization.gitlab}
          type={organization.type}
        />
      ))}
      {/* {components.map((component) => (
        <ComponentCard
          key={component.id}
          title={{ label: component.name, href: `/components/${component.id}` }}
          description={component.embedded?.description.shortDescription}
          layer={component.embedded?.nl.embedded?.commonground.layerType}
          category={{ label: "functie autorisatie", icon: <FontAwesomeIcon icon={faLock} /> }}
          tags={{
            status: component.developmentStatus,
            installations: component.usedBy?.length.toString() ?? "0",
            organization: component.embedded?.legal.embedded?.repoOwner.name,
            licence: component.embedded?.legal.license,
            githubLink: component.embedded?.url?.url,
          }}
        />
      ))} */}
    </div>
  );
};
