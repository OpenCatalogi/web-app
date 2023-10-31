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
import { usePaginationContext } from "../../context/pagination";
import { PaginationLimitSelectComponent } from "../../components/paginationLimitSelect/PaginationLimitSelect";
import { useQueryLimitContext } from "../../context/queryLimit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

export const ApplicationsTemplate: React.FC = () => {
  const { t } = useTranslation();
  const { filters } = useFiltersContext();
  const { queryLimit } = useQueryLimitContext();
  const { pagination, setPagination } = usePaginationContext();

  const queryClient = new QueryClient();
  const _useApplications = useApplications(queryClient);
  const getApplications = _useApplications.getAll(
    {
      ...filters,
    },
    pagination.applicationCurrentPage,
    queryLimit.applicationsQueryLimit,
  );

  const applicationsCount = _useApplications.getCount();

  React.useEffect(() => {
    setPagination({ ...pagination, applicationCurrentPage: 1 });
  }, [queryLimit.applicationsQueryLimit]);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading level={2} className={styles.title}>
            {t("Applications")} {applicationsCount.data >= 0 && `(${applicationsCount.data})`}
          </Heading>
          <Paragraph className={styles.description}>
            Totaal oplossing op basis van een set componenten. Het gaat om werkende software die een oplossing biedt
            voor een bepaalde{" "}
            <span>
              <Link
                className={styles.inlineTextLink}
                target="_new"
                href="https://www.gemmaonline.nl/index.php/GEMMA_Bedrijfsfuncties"
              >
                <Icon>
                  <FontAwesomeIcon icon={faExternalLink} />
                </Icon>
                {t("Business function")}
              </Link>
            </span>
            .
          </Paragraph>
        </div>
      </div>

      {getApplications.isSuccess && getApplications.data.total !== 0 && (
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
          <div className={styles.pagination}>
            <Pagination
              layoutClassName={styles.paginationContainer}
              totalPages={getApplications.data.pages}
              currentPage={getApplications.data.page}
              setCurrentPage={(page: any) => setPagination({ ...pagination, applicationCurrentPage: page })}
              ariaLabels={{ nextPage: t("Next page"), previousPage: t("Previous page"), page: t("Page") }}
            />
            <PaginationLimitSelectComponent queryLimitName={"applicationsQueryLimit"} />
          </div>
        </>
      )}

      {!getApplications.data?.results && !getApplications.isLoading && t("No results found")}
      {getApplications.isSuccess && getApplications.data.total === 0 && t("No results available")}

      {getApplications.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
