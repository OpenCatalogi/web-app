import * as React from "react";
import * as styles from "./ApplicationsTemplate.module.css";
import { Heading, Paragraph, Icon, Link } from "@utrecht/component-library-react/dist/css-module";
import { Container, Pagination } from "@conduction/components";
import { useFiltersContext } from "../../context/filters";
import { useTranslation } from "react-i18next";
import { ApplicationCard } from "../../components/applicationCard/ApplicationCard";
import { QueryClient } from "react-query";
import { useApplications } from "../../hooks/applications";
import Skeleton from "react-loading-skeleton";
import { IconExternalLink } from "@tabler/icons-react";

export const ApplicationsTemplate: React.FC = () => {
  const { filters, setFilters } = useFiltersContext();
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
                <Icon>
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
                  organization: application?.embedded?.owner?.fullName,
                  githubLink: application?.demoUrl,
                }}
              />
            ))}
          </div>
          <Pagination
            layoutClassName={styles.paginationContainer}
            totalPages={getApplications.data.pages}
            currentPage={getApplications.data.page}
            setCurrentPage={(page: any) => setFilters({ ...filters, applicationsCurrentPage: page })}
            ariaLabels={{ nextPage: t("Next page"), previousPage: t("Previous page"), page: t("Page") }}
          />
        </>
      )}

      {!getApplications.data?.results && !getApplications.isLoading && "Geen resultaten gevonden"}

      {getApplications.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
