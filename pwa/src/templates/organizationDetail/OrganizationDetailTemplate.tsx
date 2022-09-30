import * as React from "react";
import * as styles from "./OrganizationDetailTemplate.module.css";
import { Container } from "@conduction/components";
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
import { BadgeCounter } from "../../components/badgeCounter/BadgeCounter";
import { TEMPORARY_COMPONENTS } from "../../data/components";
import { ToolTip } from "../../components/toolTip/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Tag } from "../../components/tag/Tag";
import { useTranslation } from "react-i18next";
import { GitLabLogo } from "../../assets/svgs/GitLab";
import { navigate } from "gatsby";
import { TEMPORARY_ORGANIZATIONS } from "../../data/organizations";
import _ from "lodash";

interface OrganizationDetailTemplateProps {
  organizationId: string;
}

export const OrganizationDetailTemplate: React.FC<OrganizationDetailTemplateProps> = ({ organizationId }) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const TempComponentsOwned = TEMPORARY_COMPONENTS.slice(0, 7);
  const TempComponentsSupported = TEMPORARY_COMPONENTS.slice(8, 13);
  const TempComponentsUsed = TEMPORARY_COMPONENTS;

  const tempOrganization =
    TEMPORARY_ORGANIZATIONS.find((organization) => organization.id === organizationId) ?? TEMPORARY_ORGANIZATIONS[1];

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Heading1>{tempOrganization.name}</Heading1>

          <LeadParagraph>{tempOrganization.description}</LeadParagraph>
        </div>

        <div className={styles.headerOrganizationData}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={tempOrganization.logo} alt="Organization logo" />
          </div>
          <div>
            <div className={styles.tagsContainer}>
              {tempOrganization.github && (
                <ToolTip tooltip="GitHub">
                  <Tag label={t("GitHub")} icon={<GitHubLogo />} onClick={() => open(tempOrganization.github)} />
                </ToolTip>
              )}
              {tempOrganization.gitlab && (
                <ToolTip tooltip="GitLab">
                  <Tag label={t("GitLab")} icon={<GitLabLogo />} onClick={() => open(tempOrganization.gitlab)} />
                </ToolTip>
              )}
              {tempOrganization.website && (
                <ToolTip tooltip={"Website"}>
                  <Tag
                    label={tempOrganization.website}
                    icon={<FontAwesomeIcon icon={faGlobe} />}
                    onClick={() => open(tempOrganization.website)}
                  />
                </ToolTip>
              )}
              {tempOrganization.phone && (
                <ToolTip tooltip={"Telefoonnummer"}>
                  <Tag
                    label={tempOrganization.phone}
                    icon={<FontAwesomeIcon icon={faPhone} />}
                    onClick={() => navigate(`tel:${tempOrganization.phone}`)}
                  />
                </ToolTip>
              )}
              {tempOrganization.email && (
                <ToolTip tooltip={"EmailAddress"}>
                  <Tag
                    label={tempOrganization.email}
                    icon={<FontAwesomeIcon icon={faEnvelope} />}
                    onClick={() => navigate(`mailto:${tempOrganization.email}`)}
                  />
                </ToolTip>
              )}
            </div>
          </div>

          <Divider />

          <div className={styles.tagsContainer}>
            <ToolTip tooltip={"ISO-9001"}>
              <Tag
                label={"ISO-9001"}
                icon={<FontAwesomeIcon icon={faCertificate} />}
                onClick={() => open("https://www.iso.org/iso-9001-quality-management.html")}
              />
            </ToolTip>
            <ToolTip tooltip={"ISO-27001"}>
              <Tag
                label={"ISO-27001"}
                icon={<FontAwesomeIcon icon={faCertificate} />}
                onClick={() => open("https://www.iso.org/isoiec-27001-information-security.html")}
              />
            </ToolTip>
          </div>
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
                  number={_.toString(TempComponentsOwned.length ?? 0)}
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
                  number={_.toString(TempComponentsSupported.length ?? 0)}
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
                  number={_.toString(TempComponentsUsed.length ?? 0)}
                >
                  Gebruikte componenten
                </BadgeCounter>
              }
              value={2}
            />
          </Tabs>

          <TabPanel className={styles.tabPanel} value="0">
            <div className={styles.components}>
              <ComponentCardsAccordionTemplate components={TempComponentsOwned} />
            </div>
          </TabPanel>

          <TabPanel className={styles.tabPanel} value="1">
            <div className={styles.components}>
              <ComponentCardsAccordionTemplate components={TempComponentsSupported} />
            </div>
          </TabPanel>

          <TabPanel className={styles.tabPanel} value="2">
            <div className={styles.components}>
              <ComponentCardsAccordionTemplate components={TempComponentsUsed} />
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </Container>
  );
};
