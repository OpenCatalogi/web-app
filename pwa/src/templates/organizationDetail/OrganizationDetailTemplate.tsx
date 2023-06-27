import * as React from "react";
import * as styles from "./OrganizationDetailTemplate.module.css";
import { Container } from "@conduction/components";
import { Divider, Tab, TabContext, TabPanel, Tabs } from "@gemeente-denhaag/components-react";
import {
  BadgeCounter,
  Paragraph,
  Heading,
  DataBadge,
  Icon,
  Button,
} from "@utrecht/component-library-react/dist/css-module";
import { ComponentCardsAccordionTemplate } from "../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";
import { ToolTip } from "../../components/toolTip/ToolTip";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { QueryClient } from "react-query";
import { useOrganization } from "../../hooks/organization";
import Skeleton from "react-loading-skeleton";
import organizationPlaceholderImage from "../../assets/images/grey.png";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { GitLabLogo } from "../../assets/svgs/GitLab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "../../components";
import { IconArrowLeft } from "@tabler/icons-react";

interface OrganizationDetailTemplateProps {
  organizationId: string;
}

export const OrganizationDetailTemplate: React.FC<OrganizationDetailTemplateProps> = ({ organizationId }) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const queryClient = new QueryClient();
  const _useOrganization = useOrganization(queryClient);
  const _getOrganization = _useOrganization.getOne(organizationId);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton}>
        <Link to="/organizations">
          <Icon className="utrecht-icon--conduction-start">
            <IconArrowLeft />
          </Icon>
          {t("Back to organizations")}
        </Link>
      </div>

      {_getOrganization.isSuccess && (
        <>
          <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
              <Heading level={1} className={styles.title}>
                {_getOrganization.data.name}
              </Heading>

              {_getOrganization.data.description && (
                <Paragraph className={styles.description}>{_getOrganization.data.description}</Paragraph>
              )}
              {!_getOrganization.data.description && (
                <Paragraph className={styles.description}>{t("There is no description available")}</Paragraph>
              )}
            </div>

            <div className={styles.headerOrganizationData}>
              <div className={styles.logoContainer}>
                <img
                  className={styles.logo}
                  src={_getOrganization.data.logo ?? organizationPlaceholderImage}
                  alt="Organization logo"
                />
              </div>
              <div>
                <div className={styles.tagsContainer}>
                  {_getOrganization.data.github && (
                    <Button appearance="secondary-action-button" onClick={() => open(_getOrganization.data.github)}>
                      <GitHubLogo />
                      {t("GitHub")}
                    </Button>
                  )}
                  {_getOrganization.data.gitlab && (
                    <Button appearance="secondary-action-button" onClick={() => open(_getOrganization.data.gitlab)}>
                      <GitLabLogo />
                      {t("GitLab")}
                    </Button>
                  )}
                  {_getOrganization.data.website && (
                    <Button appearance="secondary-action-button" onClick={() => open(_getOrganization.data.website)}>
                      <FontAwesomeIcon icon={faGlobe} />
                      {_getOrganization.data.website}
                    </Button>
                  )}
                  {_getOrganization.data.phone && (
                    <Button
                      appearance="secondary-action-button"
                      onClick={() => navigate(`tel:${_getOrganization.data.phone}`)}
                    >
                      <FontAwesomeIcon icon={faPhone} />
                      {_getOrganization.data.phone}
                    </Button>
                  )}
                  {_getOrganization.data.email && (
                    <Button
                      appearance="secondary-action-button"
                      onClick={() => navigate(`mailto:${_getOrganization.data.email}`)}
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                      {_getOrganization.data.email}
                    </Button>
                  )}
                </div>
              </div>

              {_getOrganization.data.certificate && (
                <>
                  <Divider />

                  <div className={styles.tagsContainer}>
                    {_getOrganization.data.certificate.map((certificate: any, idx: number) => (
                      <ToolTip key={idx} tooltip={certificate.name}>
                        <DataBadge onClick={() => open(certificate.href)}>
                          <FontAwesomeIcon icon={faCertificate} />
                          {certificate.name}
                        </DataBadge>
                      </ToolTip>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <Divider />

          <div className={styles.section}>
            <Heading level={2} className={styles.title}>
              Componenten
            </Heading>
            <TabContext value={currentTab.toString()}>
              <Tabs
                value={currentTab}
                onChange={(_, newValue: number) => {
                  setCurrentTab(newValue);
                }}
                variant="scrollable"
              >
                <Tab
                  className={styles.tab}
                  label={
                    <>
                      <div>
                        <span>Eigen componenten</span>
                        <BadgeCounter className={styles.tabAmountBadge}>
                          {_getOrganization.data?.owns?.length ?? 0}
                        </BadgeCounter>
                      </div>
                    </>
                  }
                  value={0}
                />
                <Tab
                  className={styles.tab}
                  label={
                    <>
                      <div>
                        <span>Ondersteunde componenten</span>
                        <BadgeCounter className={styles.tabAmountBadge}>
                          {_getOrganization.data?.supports?.length ?? 0}
                        </BadgeCounter>
                      </div>
                    </>
                  }
                  value={1}
                />
                <Tab
                  className={styles.tab}
                  label={
                    <>
                      <div>
                        <span>Gebruikte componenten</span>
                        <BadgeCounter className={styles.tabAmountBadge}>
                          {_getOrganization.data?.uses?.length ?? 0}
                        </BadgeCounter>
                      </div>
                    </>
                  }
                  value={2}
                />
              </Tabs>

              <TabPanel className={styles.tabPanel} value="0">
                <div className={styles.components}>
                  <ComponentCardsAccordionTemplate components={_getOrganization.data?.embedded?.owns ?? []} />
                </div>
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="1">
                <div className={styles.components}>
                  <ComponentCardsAccordionTemplate components={_getOrganization.data?.embedded?.supports ?? []} />
                </div>
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="2">
                <div className={styles.components}>
                  <ComponentCardsAccordionTemplate components={_getOrganization.data?.embedded?.uses ?? []} />
                </div>
              </TabPanel>
            </TabContext>
          </div>
        </>
      )}
      {_getOrganization.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
