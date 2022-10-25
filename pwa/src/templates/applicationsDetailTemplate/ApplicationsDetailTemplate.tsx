import * as React from "react";
import * as styles from "./ApplicationsDetailTemplate.module.css";
import { Heading1, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { Container } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { categories as _categories } from "../../data/filters";
import Skeleton from "react-loading-skeleton";
import { TEMPORARY_APPLICATIONS } from "../../data/applications";

interface ApplicationsDetailTemplateProps {
  applicationId: string;
}

export const ApplicationsDetailTemplate: React.FC<ApplicationsDetailTemplateProps> = ({ applicationId }) => {
  const { t } = useTranslation();

  const tempApplications = TEMPORARY_APPLICATIONS.find((application) => {
    return application.id === applicationId;
  });

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/categories")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to categories")}
        </Link>
      </div>

      {tempApplications && (
        <div className={styles.header}>
          <Heading1>{tempApplications.name}</Heading1>
          <LeadParagraph className={styles.description}>{tempApplications.description}</LeadParagraph>

          <img src={detailPageImageUrl ?? } alt="" />
        </div>
      )}

      {!tempApplications && <Skeleton height="200px" />}
    </Container>
  );
};
