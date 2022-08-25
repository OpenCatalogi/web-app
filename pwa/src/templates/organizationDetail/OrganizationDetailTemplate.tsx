import { Container, InfoCard } from "@conduction/components";
import {
  Divider,
  Heading1,
  Heading2,
  LeadParagraph,
  Link,
  Tab,
  TabContext,
  TabPanel,
  Tabs,
} from "@gemeente-denhaag/components-react";
import * as React from "react";
import * as styles from "./OrganizationDetailTemplate.module.css";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import organizationLogo from "./../../assets/svgs/LogoRotterdam.svg";
import { ExternalLinkIcon, CallIcon, EmailIcon } from "@gemeente-denhaag/icons";
import { TableResultTemplate } from "../templateParts/resultsTemplates/table/TableResultTemplate";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { TEMPORARY_COMPONENTS } from "../../data/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRepeat, faScroll } from "@fortawesome/free-solid-svg-icons";
import { Tag } from "../../components/tag/Tag";

interface OrganizationDetailTemplateProps {
  organizationId: string;
}

export const OrganizationDetailTemplate: React.FC<OrganizationDetailTemplateProps> = ({ organizationId }) => {
  const [currentTab, setCurrentTab] = React.useState<number>(0);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Heading1>Gemeente Rotterdam</Heading1>

          <LeadParagraph>
            <div className={styles.quote}>
              Een stad waar je ruimte ervaart. <br />
              Bij een organisatie die je vrijheid en verantwoordelijkheid biedt. <br />
              Voor werk waar je uitdaging voelt. <br />
              Zodat jij en de stad blijven groeien. <br />
              Voor en met alle Rotterdammers.
            </div>
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

        <div className={styles.headerLogo}>
          <img className={styles.logo} src={organizationLogo} alt="Organization logo" />
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <InfoCard
          title="ISO"
          content={
            <>
              <div className={styles.iso}>
                <FontAwesomeIcon icon={faCheck} />
                <span>9001</span>
              </div>
              <div className={styles.iso}>
                <FontAwesomeIcon icon={faCheck} />
                <span>27010</span>
              </div>
            </>
          }
        />
        <InfoCard
          title="Componenten"
          content={
            <div>
              Gemeente Rotterdam heeft{" "}
              <Tag
                content={{
                  icon: <FontAwesomeIcon icon={faRepeat} />,
                  tag: "24",
                }}
              />{" "}
              componenten.
            </div>
          }
        />
        <InfoCard
          title="Gebruik"
          content={
            <div>
              Gemeente Rotterdam heeft: <br />
              <Tag
                content={{
                  icon: <FontAwesomeIcon icon={faRepeat} />,
                  tag: "215",
                }}
              />{" "}
              componenten in gebruik.
            </div>
          }
        />
        <InfoCard
          title="Ondersteuning"
          content={
            <div>
              Gemeente Rotterdam ondersteund{" "}
              <Tag
                content={{
                  icon: <FontAwesomeIcon icon={faRepeat} />,
                  tag: "137",
                }}
              />{" "}
              componenten.
            </div>
          }
        />
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

      <div className={styles.section}>
        <Heading2>Organisatie gegevens</Heading2>

        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>Naam</TableHeader>
              <TableCell>Gemeente Rotterdam</TableCell>
            </TableRow>

            <TableRow>
              <TableHeader>GitHub</TableHeader>
              <TableCell>
                <Link icon={<GitHubLogo />} iconAlign="start">
                  Gemeente Rotterdam componenten GitHub
                </Link>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableHeader>Website</TableHeader>
              <TableCell>
                <Link icon={<ExternalLinkIcon />} iconAlign="start">
                  rotterdam.nl
                </Link>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableHeader>Telefoonnummer</TableHeader>
              <TableCell>
                <Link icon={<CallIcon />} iconAlign="start">
                  010 - 123 456 7
                </Link>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableHeader>E-mailadres</TableHeader>
              <TableCell>
                <Link icon={<EmailIcon />} iconAlign="start">
                  componenten-support@rotterdam.nl
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Container>
  );
};
