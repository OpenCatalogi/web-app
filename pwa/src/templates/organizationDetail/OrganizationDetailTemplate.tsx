import * as React from "react";
import * as styles from "./OrganizationDetailTemplate.module.css";
import { Container, BadgeCounter, Tag } from "@conduction/components";
import {
  Divider,
  Heading1,
  Heading2,
  LeadParagraph,
  Tab,
  TabContext,
  TabPanel,
  Tabs,
} from "@gemeente-denhaag/components-react";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { ComponentCardsAccordionTemplate } from "../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";
import { ToolTip } from "../../components/toolTip/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { GitLabLogo } from "../../assets/svgs/GitLab";
import { navigate } from "gatsby";
import _ from "lodash";
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
              <Heading1>{_getOrganization.data.name}</Heading1>

              {_getOrganization.data.description && <LeadParagraph>{_getOrganization.data.description}</LeadParagraph>}
              {!_getOrganization.data.description && (
                <LeadParagraph>{t("There is no description available")}</LeadParagraph>
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
                      <Tag
                        label={t("GitHub")}
                        icon={<GitHubLogo />}
                        onClick={() => open(_getOrganization.data.github)}
                      />
                    </ToolTip>
                  )}
                  {_getOrganization.data.gitlab && (
                    <ToolTip tooltip="GitLab">
                      <Tag
                        label={t("GitLab")}
                        icon={<GitLabLogo />}
                        onClick={() => open(_getOrganization.data.gitlab)}
                      />
                    </ToolTip>
                  )}
                  {_getOrganization.data.website && (
                    <ToolTip tooltip={"Website"}>
                      <Tag
                        label={_getOrganization.data.website}
                        icon={<FontAwesomeIcon icon={faGlobe} />}
                        onClick={() => open(_getOrganization.data.website)}
                      />
                    </ToolTip>
                  )}
                  {_getOrganization.data.phone && (
                    <ToolTip tooltip={"Telefoonnummer"}>
                      <Tag
                        label={_getOrganization.data.phone}
                        icon={<FontAwesomeIcon icon={faPhone} />}
                        onClick={() => navigate(`tel:${_getOrganization.data.phone}`)}
                      />
                    </ToolTip>
                  )}
                  {_getOrganization.data.email && (
                    <ToolTip tooltip={"EmailAddress"}>
                      <Tag
                        label={_getOrganization.data.email}
                        icon={<FontAwesomeIcon icon={faEnvelope} />}
                        onClick={() => navigate(`mailto:${_getOrganization.data.email}`)}
                      />
                    </ToolTip>
                  )}
                </div>
              </div>

              <Divider />

              {_getOrganization.data.certificate && (
                <div className={styles.tagsContainer}>
                  {_getOrganization.data.certificate.map((certificate: any) => (
                    <ToolTip tooltip={certificate.name}>
                      <Tag
                        label={certificate.name}
                        icon={<FontAwesomeIcon icon={faCertificate} />}
                        onClick={() => open(certificate.href)}
                      />
                    </ToolTip>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Divider />

          <div className={styles.section}>
            <Heading2>Componenten</Heading2>
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
                    <BadgeCounter
                      layoutClassName={styles.tabAmountBadge}
                      number={_.toString(_getOrganization.data.owns.length ?? 0)}
                    >
                      Eigen componenten
                    </BadgeCounter>
                  }
                  value={0}
                />
                <Tab
                  className={styles.tab}
                  label={
                    <BadgeCounter
                      layoutClassName={styles.tabAmountBadge}
                      number={_.toString(_getOrganization.data.supports.length ?? 0)}
                    >
                      Ondersteunde componenten
                    </BadgeCounter>
                  }
                  value={1}
                />
                <Tab
                  className={styles.tab}
                  label={
                    <BadgeCounter
                      layoutClassName={styles.tabAmountBadge}
                      number={_.toString(_getOrganization.data.uses.length ?? 0)}
                    >
                      Gebruikte componenten
                    </BadgeCounter>
                  }
                  value={2}
                />
              </Tabs>

              <TabPanel className={styles.tabPanel} value="0">
                <div className={styles.components}>
                  <ComponentCardsAccordionTemplate components={_getOrganization.data.owns} />
                </div>
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="1">
                <div className={styles.components}>
                  <ComponentCardsAccordionTemplate components={_getOrganization.data.supports} />
                </div>
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="2">
                <div className={styles.components}>
                  <ComponentCardsAccordionTemplate components={_getOrganization.data.uses} />
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
