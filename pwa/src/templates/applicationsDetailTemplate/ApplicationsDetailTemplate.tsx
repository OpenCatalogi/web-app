import * as React from "react";
import * as styles from "./ApplicationsDetailTemplate.module.css";
import { Divider, Heading1, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { Container, Tag, ToolTip } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { categories as _categories } from "../../data/filters";
import Skeleton from "react-loading-skeleton";
import { TEMPORARY_APPLICATIONS } from "../../data/applications";
import grey from "../../assets/images/grey.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div className={styles.backButton} onClick={() => navigate("/applications")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to applications")}
        </Link>
      </div>

      {tempApplications && (
        <>
          <div className={styles.header}>
            <div className={styles.description}>
              <Heading1>{tempApplications.name}</Heading1>
              <LeadParagraph className={styles.description}>{tempApplications.description}</LeadParagraph>

              <div className={styles.layerAndCategoryContainer}>
                <ToolTip tooltip="Organisatie">
                  <Tag label={tempApplications.owner.fullName} icon={<FontAwesomeIcon icon={faHouse} />} />
                </ToolTip>

                {tempApplications.demoUrl && (
                  <ToolTip tooltip="GitHub">
                    <Tag label={t("Repository")} icon={<GitHubLogo />} onClick={() => open(tempApplications.demoUrl)} />
                  </ToolTip>
                )}
              </div>
            </div>

            <div className={styles.applicationImageContainer}>
              <img src={tempApplications.detailPageImageUrl ?? grey} className={styles.applicationImage} />
            </div>
          </div>

          <Divider />
        </>
      )}

      {!tempApplications && <Skeleton height="200px" />}
    </Container>
  );
};
