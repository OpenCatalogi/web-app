import * as React from "react";
import * as styles from "./ApplicationsTemplate.module.css";
import { Heading2, LeadParagraph } from "@gemeente-denhaag/components-react";
import { Icon, Link } from "@utrecht/component-library-react/dist/css-module";
import { Container } from "@conduction/components";
import { FiltersContext } from "../../context/filters";
import { useTranslation } from "react-i18next";
import { ApplicationCard } from "../../components/applicationCard/ApplicationCard";
import { QueryClient } from "react-query";
import { useApplications } from "../../hooks/applications";
import Skeleton from "react-loading-skeleton";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";
import { PaginatedItems } from "../../components/pagination/pagination";
import { GatsbyContext } from "../../context/gatsby";

export const ApplicationsTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const [marginPagesDisplayed, setMarginPageDisplayed] = React.useState<number>(3);
  const { screenSize } = React.useContext(GatsbyContext);
  const { t } = useTranslation();

  const queryClient = new QueryClient();
  const _useApplications = useApplications(queryClient);
  const getApplications = _useApplications.getAll({
    ...filters,
  });

  React.useEffect(() => {
    if (getApplications.isSuccess && screenSize === "mobile") {
      setMarginPageDisplayed(2);
    }
    if (getApplications.isSuccess && screenSize === "mobile" && getApplications.data.pages > 100) {
      setMarginPageDisplayed(1);
    }
    if (getApplications.isSuccess && screenSize !== "mobile") {
      setMarginPageDisplayed(3);
    }
  }, [getApplications]);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading2 className={styles.title}>{t("Applications")}</Heading2>
          <LeadParagraph className={styles.description}>
            Totaal oplossing op basis van een set componenten. Het gaat om werkende software die een oplossing biedt
            voor een bepaalde{" "}
            <span>
              <Link target="_new" href="https://www.gemmaonline.nl/index.php/GEMMA_Bedrijfsfuncties">
                <Icon className="utrecht-icon--conduction-start">
                  <ExternalLinkIcon />
                </Icon>{" "}
                bedrijfsfunctie
              </Link>
            </span>
            .
          </LeadParagraph>
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
            marginPagesDisplayed={marginPagesDisplayed}
            containerClassName={styles.paginationContainer}
            pageClassName={getApplications.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink}
            previousClassName={getApplications.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink}
            nextClassName={getApplications.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink}
            activeClassName={
              getApplications.data.pages > 1000 ? styles.paginationActivePageSmall : styles.paginationActivePage
            }
            disabledClassName={styles.paginationDisabled}
            breakClassName={styles.breakLink}
          />
        </>
      )}

      {!getApplications.data?.results && !getApplications.isLoading && "Geen componenten gevonden"}

      {getApplications.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
