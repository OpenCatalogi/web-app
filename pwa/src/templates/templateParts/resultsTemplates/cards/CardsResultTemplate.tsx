import * as React from "react";
import * as styles from "./CardsResultTemplate.module.css";
import _ from "lodash";
import { ComponentCard } from "../../../../components/componentCard/ComponentCard";
import { OrganizationCard } from "../../../../components/organizationCard/OrganizationCard";
import { ApplicationCard } from "../../../../components/applicationCard/ApplicationCard";
import { Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";

interface CardsResultTemplateProps {
  components: any[];
}

export const CardsResultTemplate: React.FC<CardsResultTemplateProps> = ({ components }) => {
  const { t } = useTranslation();

  const _components = components.filter((component) => {
    return component._self;
  });

  const noResultFound = _components.every((component) => {
    return (
      !component._self.schema.ref.includes("component.schema.json") &&
      !component._self.schema.ref.includes("organisation.schema.json") &&
      !component._self.schema.ref.includes("application.schema.json")
    );
  });

  if (noResultFound) return <Paragraph>Geen Organisaties, Componenten of Applicaties gevonden.</Paragraph>;

  return (
    <div className={styles.ComponentsGrid}>
      {_components.map((component) => (
        <>
          {component._self.schema.ref.includes("organisation.schema.json") && (
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
            />
          )}
          {component._self.schema.ref.includes("component.schema.json") && (
            <ComponentCard
              key={component.id}
              title={{ label: component.name, href: `/components/${component.id}` }}
              description={component.embedded.description?.shortDescription}
              layer={component.embedded.nl?.embedded?.commonground?.layerType ?? "Unknown"}
              categories={component.categories}
              tags={{
                status: component.developmentStatus,
                installations: component.usedBy?.length.toString() ?? "0",
                organization: {
                  name: component.embedded?.url?.embedded?.organisation?.name,
                  website: component.embedded?.url?.embedded?.organisation?.website,
                },
                licence: component.embedded?.legal?.license,
                githubLink: component.embedded?.url?.url,
              }}
            />
          )}
          {component._self.schema.ref.includes("application.schema.json") && (
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
