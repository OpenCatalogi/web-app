import * as React from "react";
import * as styles from "./CardsResultTemplate.module.css";
import _ from "lodash";
import { ComponentCard } from "../../../../components/componentCard/ComponentCard";
import { OrganizationCard } from "../../../../components/organizationCard/OrganizationCard";
import { ApplicationCard } from "../../../../components/applicationCard/ApplicationCard";
import { Alert, LeadParagraph } from "@gemeente-denhaag/components-react";

interface CardsResultTemplateProps {
  components: any[];
}

export const CardsResultTemplate: React.FC<CardsResultTemplateProps> = ({ components }) => {
  const _components = components.filter((component) => {
    return component._self;
  });

  const { length } = _components;
  const id = length + 1;
  const _com = _components.every((el) => el._self.schema.ref !== "https://opencatalogi.nl/component.schema.json");
  if (_com) {
    const _org = _components.every((el) => el._self.schema.ref !== "https://opencatalogi.nl/organisation.schema.json");
    if (_org) {
      const _app = _components.every((el) => el._self.schema.ref !== "https://opencatalogi.nl/application.schema.json");
      if (_app) {
        return <LeadParagraph>Geen Organisaties, Componenten of Applicaties gevonden.</LeadParagraph>;
      }
    }
  }

  return (
    <>
      <Alert
        title="Let op!"
        text="Op deze pagina staan alleen Applicaties, Organisaties en Componenten."
        variant="info"
      />

      <div className={styles.ComponentsGrid}>
        {_components.map((component) => (
          <>
            {component._self.schema.ref === "https://opencatalogi.nl/organisation.schema.json" && (
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
            {component._self.schema.ref === "https://opencatalogi.nl/component.schema.json" && (
              <ComponentCard
                key={component.id}
                title={{ label: component.name, href: `/components/${component.id}` }}
                description={component.description?.shortDescription}
                layer={component.nl?.commonground.layerType ?? "Onbekend"}
                categories={component.categories}
                tags={{
                  status: component.developmentStatus,
                  installations: component.usedBy?.length.toString() ?? "0",
                  organization: {
                    name: component.url?.organisation?.name,
                    website: component.url?.organisation?.website,
                  },
                  licence: component.legal?.license,
                  githubLink: component.url?.url,
                }}
              />
            )}
            {component._self.schema.ref === "https://opencatalogi.nl/application.schema.json" && (
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
    </>
  );
};
