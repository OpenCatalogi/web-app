import * as React from "react";
import * as styles from "./OrganizationDetailTemplate.module.css";
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
import { GitHubLogo } from "../../assets/svgs/GitHub";
import organizationLogo from "./../../assets/svgs/LogoRotterdam.svg";
import { ComponentCardsAccordionTemplate } from "../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";
import { BadgeCounter } from "../../components/badgeCounter/BadgeCounter";
import { TEMPORARY_COMPONENTS } from "../../data/components";
import { ToolTip } from "../../components/toolTip/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Tag } from "../../components/tag/Tag";
import { useTranslation } from "react-i18next";
import { GitLabLogo } from "../../assets/svgs/GitLab";
import { navigate } from "gatsby";

interface OrganizationDetailTemplateProps {
  organizationId: string;
}

export const OrganizationDetailTemplate: React.FC<OrganizationDetailTemplateProps> = ({ organizationId }) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const TempComponentsOwned = TEMPORARY_COMPONENTS.slice(0, 7);
  const TempComponentsSupported = TEMPORARY_COMPONENTS.slice(8, 13);
  const TempComponentsUsed = TEMPORARY_COMPONENTS;

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.headerOrganizationDescription}>
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
            <br />
            Bij een stad die je elke dag uitdaagt en het beste in jou naar boven haalt, hoort een eigentijdse overheid
            die meebeweegt met de energie van de stad. Zo’n organisatie wil de gemeente Rotterdam zijn. Daarom bieden we
            je ruimte en kansen om Rotterdam en daarmee jezelf vooruit te blijven helpen.
            <br />
            <br />
            Wij creëren de voorwaarden zodat jij de ruimte ervaart om te groeien: in de stad en binnen de eigen
            organisatie. In een omgeving met collega’s die veilig en vertrouwd voelt. Waar we samen beslissen en samen
            aanpakken.
          </LeadParagraph>
        </div>

        <div className={styles.headerOrganizationData}>
          <img className={styles.logo} src={organizationLogo} alt="Organization logo" />
          <div className={styles.tagsContainer}>
            <ToolTip tooltip="GitHub">
              <Tag label={t("GitHub")} icon={<GitHubLogo />} onClick={() => open("github")} />
            </ToolTip>
            <ToolTip tooltip="GitLab">
              <Tag label={t("GitLab")} icon={<GitLabLogo />} onClick={() => open("gitlab")} />
            </ToolTip>
            <ToolTip tooltip="Website">
              <Tag
                label="www.rotterdam.nl"
                icon={<FontAwesomeIcon icon={faGlobe} />}
                onClick={() => open("https://rotterdam.nl")}
              />
            </ToolTip>
            <ToolTip tooltip="Telefoonnummer">
              <Tag
                label="+31 - 102 - 671 - 625"
                icon={<FontAwesomeIcon icon={faPhone} />}
                onClick={() => navigate("tel:+31102671625")}
              />
            </ToolTip>
            <ToolTip tooltip="EmailAddress">
              <Tag
                label="componenten-support@rotterdam.nl"
                icon={<FontAwesomeIcon icon={faEnvelope} />}
                onClick={() => navigate("mailto:componenten-support@rotterdam.nl")}
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
                <BadgeCounter layoutClassName={styles.badgeLayout} number={TempComponentsOwned.length}>
                  Eigen componenten
                </BadgeCounter>
              }
              value={0}
            />
            <Tab
              className={styles.tab}
              label={
                <BadgeCounter layoutClassName={styles.badgeLayout} number={TempComponentsSupported.length}>
                  Ondersteunde componenten
                </BadgeCounter>
              }
              value={1}
            />
            <Tab
              className={styles.tab}
              label={
                <BadgeCounter layoutClassName={styles.badgeLayout} number={TempComponentsUsed.length}>
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
