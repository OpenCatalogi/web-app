import * as React from "react";
import * as styles from "./CardsOrganizationDisplayTemplate.module.css";
import { OrganizationCard } from "../../../../components/organizationCard/OrganizationCard";

interface CardsOrganizationDisplayTemplateProps {
  organizations: any[];
}

export const CardsOrganizationDisplayTemplate: React.FC<CardsOrganizationDisplayTemplateProps> = ({
  organizations,
}) => {
  return (
    <div className={styles.ComponentsGrid}>
      {organizations.map((organization) => (
        <>
          {organization._self.schema.ref.includes("organisation.schema.json") && (
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
              gitHub={organization.github}
              gitLab={organization.gitlab}
              type={organization.type}
            />
          )}
        </>
      ))}
    </div>
  );
};
