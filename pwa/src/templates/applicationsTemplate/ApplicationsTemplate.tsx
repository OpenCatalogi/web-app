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
import Skeleton from "react-loading-skeleton";
import { ApplicationCard } from "../../components/applicationCard/ApplicationCard";
import { useApplications } from "../../hooks/applications";
import { TEMPORARY_APPLICATIONS } from "../../data/applications";

export const ApplicationsTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

  // const queryClient = new QueryClient();
  // const _useApplications = useApplications(queryClient);
  // const getApplications = _useApplications.getAll({
  //   ...filters,
  //   "nl.commonground.layerType": ["interface"],
  // });

  const tempApplications = TEMPORARY_APPLICATIONS

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

      {/* {getApplications.data?.results && getApplications.data?.results?.length > 0 && ( */}
        <div className={styles.ComponentsGrid}>
          {tempApplications.map((application: any) => (
            <ApplicationCard
              key={application.id}
              title={{ label: application.name, href: `/applications/${application.id}` }}
              description={application.shortDescription}
              layer={application.layerType}
              category={{ label: "functie autorisatie", icon: <FontAwesomeIcon icon={faLock} /> }}
              tags={{
                status: application.developmentStatus,
                installations: application.usedBy?.length.toString() ?? "0",
                organization: application.embedded?.url?.embedded?.organisation?.name,
                licence: application.embedded?.legal?.license,
                githubLink: application.embedded?.url?.url,
              }}
            />
          ))}
        </div>
      {/* )} */}

      {/* {!getApplications.data?.results && !getApplications.isLoading && "Geen componenten gevonden"} */}

      {/* {getApplications.isLoading && <Skeleton height="200px" />} */}
    </Container>
  );
};
