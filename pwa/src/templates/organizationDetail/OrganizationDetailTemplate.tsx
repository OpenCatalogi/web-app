import { Container, QuoteWrapper } from "@conduction/components";
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
import * as React from "react";
import * as styles from "./OrganizationDetailTemplate.module.css";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import organizationLogo from "./../../assets/svgs/LogoRotterdam.svg";
import { TableResultTemplate } from "../templateParts/resultsTemplates/table/TableResultTemplate";
import { TEMPORARY_COMPONENTS } from "../../data/components";
import { ToolTip } from "../../components/toolTip/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Tag } from "../../components/tag/Tag";
import { useTranslation } from "react-i18next";
import { GitLabLogo } from "../../assets/svgs/GitLab";
import { navigate } from "gatsby";
import { TEMPORARY_ORGANIZATIONS } from "../../data/organizations";

interface OrganizationDetailTemplateProps {
  organizationId: string;
}

export const OrganizationDetailTemplate: React.FC<OrganizationDetailTemplateProps> = ({ organizationId }) => {
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const { t } = useTranslation();

  const tempOrganization = TEMPORARY_ORGANIZATIONS.find((organization) => {
    return organization.id === organizationId;
  });

  return (
    <Container layoutClassName={styles.container}>
      {tempOrganization && (
        <>
          <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
              <Heading1>{tempOrganization.name}</Heading1>

              <LeadParagraph>{tempOrganization.description}</LeadParagraph>
            </div>

            <div className={styles.headerOrganizationData}>
              <div className={styles.logoContainer}>
                <img className={styles.logo} src={tempOrganization.logo} alt="Organization logo" />
              </div>
              <div className={styles.test}>
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
                <Tab className={styles.tab} label="Eigen componenten" value={0} />
                <Tab className={styles.tab} label="Ondersteunde componenten" value={1} />
                <Tab className={styles.tab} label="Gebruikte componenten" value={2} />
              </Tabs>

              <TabPanel className={styles.tabPanel} value="0">
                <TableResultTemplate components={TEMPORARY_COMPONENTS.slice(0, 6)} hideTableHead />
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="1">
                <TableResultTemplate components={TEMPORARY_COMPONENTS.slice(3, 6)} hideTableHead />
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="2">
                <TableResultTemplate components={TEMPORARY_COMPONENTS} hideTableHead />
              </TabPanel>
            </TabContext>
          </div>

          <Divider />
        </>
      )}
      {!tempOrganization && (
        <>
          <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
              <Heading1>Gemeente Rotterdam</Heading1>

              <LeadParagraph>
                <QuoteWrapper>
                  Een stad waar je ruimte ervaart. <br />
                  Bij een organisatie die je vrijheid en verantwoordelijkheid biedt. <br />
                  Voor werk waar je uitdaging voelt. <br />
                  Zodat jij en de stad blijven groeien. <br />
                  Voor en met alle Rotterdammers.
                </QuoteWrapper>
                <br />
                Bij een stad die je elke dag uitdaagt en het beste in jou naar boven haalt, hoort een eigentijdse
                overheid die meebeweegt met de energie van de stad. Zo’n organisatie wil de gemeente Rotterdam zijn.
                Daarom bieden we je ruimte en kansen om Rotterdam en daarmee jezelf vooruit te blijven helpen.
                <br />
                <br />
                Wij creëren de voorwaarden zodat jij de ruimte ervaart om te groeien: in de stad en binnen de eigen
                organisatie. In een omgeving met collega’s die veilig en vertrouwd voelt. Waar we samen beslissen en
                samen aanpakken.
              </LeadParagraph>
            </div>

            <div className={styles.headerLogo}>
              <img className={styles.oldLogo} src={organizationLogo} alt="Organization logo" />
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
                <Tab className={styles.tab} label="Eigen componenten" value={0} />
                <Tab className={styles.tab} label="Ondersteunde componenten" value={1} />
                <Tab className={styles.tab} label="Gebruikte componenten" value={2} />
              </Tabs>

              <TabPanel className={styles.tabPanel} value="0">
                <TableResultTemplate components={TEMPORARY_COMPONENTS.slice(0, 6)} hideTableHead />
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="1">
                <TableResultTemplate components={TEMPORARY_COMPONENTS.slice(3, 6)} hideTableHead />
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="2">
                <TableResultTemplate components={TEMPORARY_COMPONENTS} hideTableHead />
              </TabPanel>
            </TabContext>
          </div>

          <Divider />
        </>
      )}
    </Container>
  );
};
