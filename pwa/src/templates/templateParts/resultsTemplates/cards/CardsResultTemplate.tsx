import * as React from "react";
import * as styles from "./CardsResultTemplate.module.css";
import _ from "lodash";
import { ComponentCard } from "../../../../components/componentCard/ComponentCard";
import { OrganizationCard } from "../../../../components/organizationCard/OrganizationCard";
import { ApplicationCard } from "../../../../components/applicationCard/ApplicationCard";

interface CardsResultTemplateProps {
  components: any[];
}

export const CardsResultTemplate: React.FC<CardsResultTemplateProps> = ({ components }) => {
  return (
    <div className={styles.ComponentsGrid}>
      {components.map((component) => (
        <>
          {component.objectType === "organization" && (
            <OrganizationCard
              title={{
                label: component.name,
                href: `/organizations/${component.id}`,
              }}
              description={component.description}
              website={component.website}
              logo={component.logo}
              components={{
                owned: component.owns?.length.toString() ?? "0",
                supported: component.supports?.length.toString() ?? "0",
                used: component.uses?.length.toString() ?? "0",
              }}
              gitHub={component.github}
              gitLab={component.gitlab}
              type={component.type}
              layoutClassName={styles.organizationCardContainer}
            />
          )}
          {component.objectType === "component" && (
            <ComponentCard
              key={component.id}
              title={{ label: component.name, href: `/components/${component.id}` }}
              description={component.embedded?.description?.shortDescription}
              layer={component.embedded?.nl?.embedded?.commonground.layerType ?? "Onbekend"}
              categories={component.categories}
              tags={{
                status: component.developmentStatus,
                installations: component.usedBy?.length.toString() ?? "0",
                organization: component.organisation?.name,
                licence: component.embedded?.legal?.license,
                githubLink: component.embedded?.url?.url,
              }}
            />
          )}
          {component.objectType === "application" && (
            <ApplicationCard
              key={component.id}
              title={{ label: component.name, href: `/applications/${component.id}` }}
              description={component.shortDescription}
              tags={{
                organization: component?.embedded?.owner.fullName,
                githubLink: component?.demoUrl,
              }}
            />
          )}
        </>
      ))}
    </div>
  );
};
