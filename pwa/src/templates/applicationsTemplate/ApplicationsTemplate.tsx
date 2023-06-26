import * as React from "react";
import * as styles from "./ApplicationsTemplate.module.css";
import { Heading, Paragraph, Icon } from "@utrecht/component-library-react/dist/css-module";
import { Container } from "@conduction/components";
import { FiltersContext } from "../../context/filters";
import { useTranslation } from "react-i18next";
import { ApplicationCard } from "../../components/applicationCard/ApplicationCard";
import { QueryClient } from "react-query";
import { useApplications } from "../../hooks/applications";
import Skeleton from "react-loading-skeleton";
import { IconExternalLink } from "@tabler/icons-react";
import { PaginatedItems } from "../../components/pagination/pagination";
import { Link } from "../../components";

export const ApplicationsTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

  const queryClient = new QueryClient();
  const _useApplications = useApplications(queryClient);
  const getApplications = _useApplications.getAll({
    ...filters,
  });

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading level={2} className={styles.title}>
            {t("Applications")}
          </Heading>
          <Paragraph className={styles.description}>
            Totaal oplossing op basis van een set componenten. Het gaat om werkende software die een oplossing biedt
            voor een bepaalde{" "}
            <span>
              <Link target="_new" href="https://www.gemmaonline.nl/index.php/GEMMA_Bedrijfsfuncties">
                <Icon className="utrecht-icon--conduction-start">
                  <IconExternalLink />
                </Icon>{" "}
                bedrijfsfunctie
              </Link>
            </span>
            .
          </Paragraph>
        </div>
      </div>

      {getApplications.isSuccess && (
        <>
          <div className={styles.ComponentsGrid}>
            {getApplications.data?.results?.map((application: any) => (
              <ApplicationCard
                key={application.id}
                title={{ label: application.name, href: `/applications/${application.id}` }}
                description={application.shortDescription}
                tags={{
                  organization: application?.embedded?.owner.fullName,
                  githubLink: application?.demoUrl,
                }}
              />
            ))}
          </div>
          <PaginatedItems
            pages={getApplications.data.pages}
            currentPage={getApplications.data.page}
            setPage={(page) => setFilters({ ...filters, applicationsCurrentPage: page })}
            pageRangeDisplayed={2}
            containerClassName={styles.paginationContainer}
          />
        </>
      )}

      {!getApplications.data?.results && !getApplications.isLoading && "Geen componenten gevonden"}

      {getApplications.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
