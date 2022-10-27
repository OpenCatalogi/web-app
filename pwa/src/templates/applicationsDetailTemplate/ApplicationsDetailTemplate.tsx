import * as React from "react";
import * as styles from "./ApplicationsDetailTemplate.module.css";
import { Divider, Heading1, Heading2, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { Container, Tag, ToolTip } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { faHouse, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { categories as _categories } from "../../data/filters";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient } from "react-query";
import { useApplications } from "../../hooks/applications";

interface ApplicationsDetailTemplateProps {
  applicationId: string;
}

export const ApplicationsDetailTemplate: React.FC<ApplicationsDetailTemplateProps> = ({ applicationId }) => {
  const { t } = useTranslation();

  const queryClient = new QueryClient();
  const _useApplications = useApplications(queryClient);
  const getApplications = _useApplications.getOne(applicationId);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/applications")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to applications")}
        </Link>
      </div>

      {getApplications.isSuccess && (
        <>
          <div className={styles.header}>
            <div className={styles.description}>
              <Heading1>{getApplications.data.name}</Heading1>
              <LeadParagraph className={styles.description}>{getApplications.data.description}</LeadParagraph>

              <div className={styles.layerAndCategoryContainer}>
                {getApplications.data.embedded && (
                  <ToolTip tooltip="Organisatie">
                    <Tag
                      label={getApplications.data.embedded?.owner.fullName}
                      icon={<FontAwesomeIcon icon={faHouse} />}
                    />
                  </ToolTip>
                )}

                {getApplications.data.demoUrl && (
                  <ToolTip tooltip="Demo">
                    <Tag
                      label={t("Demo")}
                      icon={<FontAwesomeIcon icon={faLaptopCode} />}
                      onClick={() => open(getApplications.data.demoUrl)}
                    />
                  </ToolTip>
                )}
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <Heading2>Screenshot</Heading2>
            <div className={styles.screenshotContainer}>
              <img src={getApplications.data.detailPageImageUrl} className={styles.screenshot} />
            </div>
          </div>
        </>
      )}

      {getApplications.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
