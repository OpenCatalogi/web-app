import * as React from "react";
import * as styles from "./OrganizationDetailTemplate.module.css";
import { Container, Tag } from "@conduction/components";
import { Divider, Tab, TabContext, TabPanel, Tabs } from "@gemeente-denhaag/components-react";
import { BadgeCounter, Paragraph, Heading, DataBadge } from "@utrecht/component-library-react/dist/css-module";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { ComponentCardsAccordionTemplate } from "../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";
import { ToolTip } from "../../components/toolTip/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { GitLabLogo } from "../../assets/svgs/GitLab";
import { navigate } from "gatsby";
import { QueryClient } from "react-query";
import { useOrganization } from "../../hooks/organization";
import Skeleton from "react-loading-skeleton";
import organizationPlaceholderImage from "../../assets/images/grey.png";

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
      {_getOrganization.isSuccess && (
        <>
          <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
              <Heading level={1} className={styles.title}>
                {_getOrganization.data.name}
              </Heading>

              {_getOrganization.data.description && (
                <Paragraph lead className={styles.description}>
                  {_getOrganization.data.description}
                </Paragraph>
              )}
              {!_getOrganization.data.description && (
                <Paragraph lead className={styles.description}>
                  {t("There is no description available")}
                </Paragraph>
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
                    <ToolTip tooltip="GitHub">
                      <DataBadge onClick={() => open(_getOrganization.data.github)}>{t("GitHub")} </DataBadge>
                    </ToolTip>
                  )}
                  {_getOrganization.data.gitlab && (
                    <ToolTip tooltip="GitLab">
                      <DataBadge onClick={() => open(_getOrganization.data.gitlab)}>{t("GitLab")}</DataBadge>
                    </ToolTip>
                  )}
                  {_getOrganization.data.website && (
                    <ToolTip tooltip={"Website"}>
                      <DataBadge onClick={() => open(_getOrganization.data.website)}>
                        {_getOrganization.data.website}
                      </DataBadge>
                    </ToolTip>
                  )}
                  {_getOrganization.data.phone && (
                    <ToolTip tooltip={"Telefoonnummer"}>
                      <DataBadge onClick={() => navigate(`tel:${_getOrganization.data.phone}`)}>
                        {_getOrganization.data.phone}
                      </DataBadge>
                    </ToolTip>
                  )}
                  {_getOrganization.data.email && (
                    <ToolTip tooltip={"EmailAddress"}>
                      <DataBadge onClick={() => navigate(`mailto:${_getOrganization.data.email}`)}>
                        {_getOrganization.data.email}
                      </DataBadge>
                    </ToolTip>
                  )}
                </div>
              </div>

              {_getOrganization.data.certificate && (
                <>
                  <Divider />

                  <div className={styles.tagsContainer}>
                    {_getOrganization.data.certificate.map((certificate: any) => (
                      <ToolTip tooltip={certificate.name}>
                        <DataBadge onClick={() => open(certificate.href)}>{certificate.name}</DataBadge>
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
