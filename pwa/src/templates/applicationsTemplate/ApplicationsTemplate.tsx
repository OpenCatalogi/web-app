import * as React from "react";
import * as styles from "./ApplicationsTemplate.module.css";
import * as _ from "lodash";
import { Heading2, LeadParagraph } from "@gemeente-denhaag/components-react";
import { Container } from "@conduction/components";
import { FiltersContext } from "../../context/filters";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";
import { ComponentCard } from "../../components/componentCard/ComponentCard";

export const ApplicationsTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

  const queryClient = new QueryClient();
  const _useComponent = useComponent(queryClient);
  const getComponents = _useComponent.getAll({
    ...filters,
    "nl.commonground.layerType": ["interface"],
  });

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading2>{t("Applications")}</Heading2>
          <LeadParagraph>
            Deeloplossing op basis van een set componenten. Het gaat om werkende software die een oplossing biedt voor
            een bepaald onderdeel.
          </LeadParagraph>
        </div>
      </div>

      {getComponents.data?.results && getComponents.data?.results?.length > 0 && (
        <div className={styles.ComponentsGrid}>
          {getComponents.data?.results.map((component: any) => (
            <ComponentCard
              key={component.id}
              title={{ label: component.name, href: `/components/${component.id}` }}
              description={component.embedded?.description?.shortDescription}
              layer={component.embedded?.nl.embedded?.commonground.layerType}
              category={{ label: "functie autorisatie", icon: <FontAwesomeIcon icon={faLock} /> }}
              tags={{
                status: component.developmentStatus,
                installations: component.usedBy?.length.toString() ?? "0",
                organization: component.embedded?.url?.embedded?.organisation?.name,
                licence: component.embedded?.legal?.license,
                githubLink: component.embedded?.url?.url,
              }}
            />
          ))}
        </div>
      )}

      {!getComponents.data?.results && !getComponents.isLoading && "Geen componenten gevonden"}

      {getComponents.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
