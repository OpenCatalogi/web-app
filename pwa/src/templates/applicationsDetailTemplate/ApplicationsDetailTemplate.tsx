import * as React from "react";
import * as styles from "./ApplicationsDetailTemplate.module.css";
import { Container, ToolTip } from "@conduction/components";
import {
  Heading,
  Icon,
  Button,
  ButtonGroup,
  DataBadge,
  Separator,
} from "@utrecht/component-library-react/dist/css-module";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { faCircleNodes, faHouse, faLaptopCode, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient } from "react-query";
import { useApplications } from "../../hooks/applications";
import { DependenciesTemplate } from "../templateParts/dependenciesTemplates/ComponentDependenciesTemplate";
import { Link } from "../../components";
import { ExpandableLeadParagraph } from "../../components/expandableLeadParagraph/ExpandableLeadParagraph";

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
      <div className={styles.backButton}>
        <Link to="/applications">
          <Icon className="utrecht-icon--conduction-start">
            <IconArrowLeft />
          </Icon>
          {t("Back to applications")}
        </Link>
      </div>

      {getApplications.isSuccess && (
        <>
          <div className={styles.header}>
            <div className={styles.description}>
              <Heading level={1} className={styles.title}>
                {getApplications.data.name}
              </Heading>

              <ExpandableLeadParagraph
                description={getApplications.data.description ?? t("There is no description available")}
              />

              <div className={styles.layerAndCategoryContainer}>
                {getApplications.data.embedded?.owner && (
                  <ToolTip tooltip="Organisatie">
                    <DataBadge>
                      <FontAwesomeIcon icon={faHouse} />
                      {getApplications.data.embedded?.owner.fullName}
                    </DataBadge>
                  </ToolTip>
                )}

                {getApplications.data.demoUrl && (
                  <ToolTip tooltip="Demo">
                    <DataBadge onClick={() => open(getApplications.data.demoUrl)}>
                      <FontAwesomeIcon icon={faLaptopCode} />
                      {t("Demo")}
                    </DataBadge>
                  </ToolTip>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Heading level={2} className={styles.title}>
              Screenshot
            </Heading>
            <div className={styles.screenshotContainer}>
              <img src={getApplications.data.detailPageImageUrl} className={styles.screenshot} />
            </div>
          </div>

          <Separator />

          {getApplications.data?.embedded?.components && (
            <div className={styles.components}>
              <ButtonGroup className={styles.dependenciesDisplaySwitchButtons}>
                <Button
                  className={styles.buttonIcon}
                  pressed={layerType === "layer"}
                  appearance={layerType === "layer" ? "secondary-action-button" : "subtle-button"}
                  onClick={() => setlayerType("layer")}
                >
                  <Icon>
                    <FontAwesomeIcon icon={faLayerGroup} />
                  </Icon>{" "}
                  {t("Layers")}
                </Button>
                <Button
                  className={styles.buttonIcon}
                  pressed={layerType === "relations"}
                  appearance={layerType === "relations" ? "secondary-action-button" : "subtle-button"}
                  onClick={() => setlayerType("relations")}
                >
                  <Icon>
                    <FontAwesomeIcon icon={faCircleNodes} />
                  </Icon>{" "}
                  {t("Relations")}
                </Button>
              </ButtonGroup>

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
          )}

          {!getApplications.data?.embedded?.components && (
            <span className={styles.noComponentsFound}>Deze applicatie heeft (nog) geen gekoppelde componenten.</span>
          )}
        </>
      )}

      {getApplications.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
