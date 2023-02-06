import * as React from "react";
import * as styles from "./ApplicationsDetailTemplate.module.css";
import { Button, Divider, Heading1, Heading2, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { Container, Tag, ToolTip } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { faCircleNodes, faHouse, faLaptopCode, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { categories as _categories } from "../../data/filters";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient } from "react-query";
import { useApplications } from "../../hooks/applications";
import { DependenciesTemplate } from "../templateParts/dependenciesTemplates/ComponentDependenciesTemplate";

interface ApplicationsDetailTemplateProps {
  applicationId: string;
}

export const ApplicationsDetailTemplate: React.FC<ApplicationsDetailTemplateProps> = ({ applicationId }) => {
  const { t } = useTranslation();
  const [layerType, setlayerType] = React.useState<"layer" | "relations">("layer");

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
              <Heading1 className={styles.title}>{getApplications.data.name}</Heading1>
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
            <Heading2 className={styles.title}>Screenshot</Heading2>
            <div className={styles.screenshotContainer}>
              <img src={getApplications.data.detailPageImageUrl} className={styles.screenshot} />
            </div>
          </div>

          <Divider />

          <div className={styles.components}>
            <div className={styles.dependenciesDisplaySwitchButtons}>
              <Button
                className={styles.buttonIcon}
                variant={layerType === "layer" ? "primary-action" : "secondary-action"}
                onClick={() => setlayerType("layer")}
              >
                <FontAwesomeIcon icon={faLayerGroup} />
                {t("Layers")}
              </Button>
              <Button
                className={styles.buttonIcon}
                variant={layerType === "relations" ? "primary-action" : "secondary-action"}
                onClick={() => setlayerType("relations")}
              >
                <FontAwesomeIcon icon={faCircleNodes} />
                {t("Relations")}
              </Button>
            </div>

            <DependenciesTemplate
              type={layerType}
              components={getApplications.data?.embedded?.components ?? []}
              mainComponent={{
                id: getApplications.data.id,
                name: getApplications.data.name,
                layer: getApplications.data.embedded?.nl?.embedded?.commonground.layerType || null,
              }}
            />
          </div>
        </>
      )}

      {getApplications.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
