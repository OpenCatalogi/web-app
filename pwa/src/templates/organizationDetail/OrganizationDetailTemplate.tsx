import { Container } from "@conduction/components";
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
            Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas faucibus mollis interdum. Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </LeadParagraph>
        </div>

        <div className={styles.headerLogo}>
          <img className={styles.logo} src={organizationLogo} alt="Organization logo" />
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
            <TableResultTemplate components={TEMPORARY_COMPONENTS.slice(3, 9)} hideTableHead />
          </TabPanel>

          <TabPanel className={styles.tabPanel} value="2">
            <TableResultTemplate components={TEMPORARY_COMPONENTS.slice(2, 8)} hideTableHead />
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

const TEMPORARY_COMPONENTS = [
  {
    id: "1fd22041-9aaa-404d-b69f-e8d249f8dc02",
    applicationId: null,
    applicationSuite: null,
    categories: ["Acounting"],
    dependsOn: null,
    description: null,
    developmentStatus: "beta",
    inputTypes: ["string"],
    intendedAudience: null,
    isBasedOn: "https://github.com/ConductionNL/adresservice",
    landingURL: "https://github.com/ConductionNL/adresservice",
    legal: null,
    localisation: null,
    logo: "https://avatars0.githubusercontent.com/u/34739001?s=280&v=4",
    maintenance: null,
    name: "Venenatis Lorem Cras",
    nl: null,
    outputTypes: ["string"],
    platforms: ["web", "ios", "mac", "linux"],
    releaseDate: "2020-02-18",
    roadmap: "https://vng.nl/agenda",
    softwareType: "standalone/desktop",
    softwareVersion: "1.0",
    url: null,
    usedBy: null,
  },
  {
    id: "2dca1536-9d83-4ddf-90cb-eb50c96bb4d8",
    applicationId: null,
    applicationSuite: null,
    categories: ["Acounting"],
    dependsOn: null,
    description: null,
    developmentStatus: "uitgefasseerd",
    inputTypes: ["string"],
    intendedAudience: null,
    isBasedOn: "https://github.com/ConductionNL/adresservice",
    landingURL: "https://github.com/ConductionNL/adresservice",
    legal: null,
    localisation: null,
    logo: "https://avatars0.githubusercontent.com/u/34739001?s=280&v=4",
    maintenance: null,
    name: "Nunc Sed Turpis",
    nl: null,
    outputTypes: ["string"],
    platforms: ["web"],
    releaseDate: "2020-02-18",
    roadmap: "https://vng.nl/agenda",
    softwareType: "library",
    softwareVersion: "1.0",
    url: null,
    usedBy: null,
  },
  {
    id: "3d251988-4216-4ac8-82ce-f918b08dc985",
    applicationId: null,
    applicationSuite: null,
    categories: ["Acounting"],
    dependsOn: null,
    description: null,
    developmentStatus: "beta",
    inputTypes: ["string"],
    intendedAudience: null,
    isBasedOn: "https://github.com/ConductionNL/adresservice",
    landingURL: "https://github.com/ConductionNL/adresservice",
    legal: null,
    localisation: null,
    logo: "https://avatars0.githubusercontent.com/u/34739001?s=280&v=4",
    maintenance: null,
    name: "Metus",
    nl: null,
    outputTypes: ["string"],
    platforms: ["web", "linux"],
    releaseDate: "2020-02-18",
    roadmap: "https://vng.nl/agenda",
    softwareType: "standalone/desktop",
    softwareVersion: "1.0",
    url: null,
    usedBy: null,
  },
  {
    id: "43d49943-afd9-4ad4-a7f7-a6bd847c88ff",
    applicationId: null,
    applicationSuite: null,
    categories: ["Acounting"],
    dependsOn: null,
    description: null,
    developmentStatus: "bruikbaar",
    inputTypes: ["string"],
    intendedAudience: null,
    isBasedOn: "https://github.com/ConductionNL/adresservice",
    landingURL: "https://github.com/ConductionNL/adresservice",
    legal: null,
    localisation: null,
    logo: "https://avatars0.githubusercontent.com/u/34739001?s=280&v=4",
    maintenance: null,
    name: "Lacus Ante Convallis Tellus Vitae Iaculis Lacus Elit Id Tortor",
    nl: null,
    outputTypes: ["string"],
    platforms: ["android"],
    releaseDate: "2020-02-18",
    roadmap: "https://vng.nl/agenda",
    softwareType: "standalone/backend",
    softwareVersion: "1.0",
    url: null,
    usedBy: null,
  },
  {
    id: "68667e84-ebc0-47b7-a24f-9c1a6b207805",
    applicationId: null,
    applicationSuite: null,
    categories: ["Acounting"],
    dependsOn: null,
    description: null,
    developmentStatus: "beta",
    inputTypes: ["string"],
    intendedAudience: null,
    isBasedOn: "https://github.com/ConductionNL/adresservice",
    landingURL: "https://github.com/ConductionNL/adresservice",
    legal: null,
    localisation: null,
    logo: "https://avatars0.githubusercontent.com/u/34739001?s=280&v=4",
    maintenance: null,
    name: "Ultricies Nec",
    nl: null,
    outputTypes: ["string"],
    platforms: ["android", "linux"],
    releaseDate: "2020-02-18",
    roadmap: "https://vng.nl/agenda",
    softwareType: "standalone/desktop",
    softwareVersion: "1.0",
    url: null,
    usedBy: null,
  },
  {
    id: "6af3eab7-b9da-46cf-a4ee-d9848eb4a3d5",
    applicationId: null,
    applicationSuite: null,
    categories: ["Acounting"],
    dependsOn: null,
    description: null,
    developmentStatus: "uitgefasseerd",
    inputTypes: ["string"],
    intendedAudience: null,
    isBasedOn: "https://github.com/ConductionNL/adresservice",
    landingURL: "https://github.com/ConductionNL/adresservice",
    legal: null,
    localisation: null,
    logo: "https://avatars0.githubusercontent.com/u/34739001?s=280&v=4",
    maintenance: null,
    name: "Convallis Metus Id",
    nl: null,
    outputTypes: ["string"],
    platforms: ["windows"],
    releaseDate: "2020-02-18",
    roadmap: "https://vng.nl/agenda",
    softwareType: "configurationFiles",
    softwareVersion: "1.0",
    url: null,
    usedBy: null,
  },
  {
    id: "71e0ea26-e25d-47a8-a78a-d226a5ebe48e",
    applicationId: null,
    applicationSuite: null,
    categories: ["Acounting"],
    dependsOn: null,
    description: null,
    developmentStatus: "uitgefaseerd",
    inputTypes: ["string"],
    intendedAudience: null,
    isBasedOn: "https://github.com/ConductionNL/adresservice",
    landingURL: "https://github.com/ConductionNL/adresservice",
    legal: null,
    localisation: null,
    logo: "https://avatars0.githubusercontent.com/u/34739001?s=280&v=4",
    maintenance: null,
    name: "Venenatis Lorem Cras",
    nl: null,
    outputTypes: ["string"],
    platforms: ["web", "android", "windows"],
    releaseDate: "2020-02-18",
    roadmap: "https://vng.nl/agenda",
    softwareType: "standalone/mobile",
    softwareVersion: "1.0",
    url: null,
    usedBy: null,
  },
  {
    id: "7ebd259d-1260-4bb9-ad4f-20108d68b396",
    applicationId: null,
    applicationSuite: null,
    categories: ["Acounting"],
    dependsOn: null,
    description: null,
    developmentStatus: "gepland",
    inputTypes: ["string"],
    intendedAudience: null,
    isBasedOn: "https://github.com/ConductionNL/adresservice",
    landingURL: "https://github.com/ConductionNL/adresservice",
    legal: null,
    localisation: null,
    logo: "https://avatars0.githubusercontent.com/u/34739001?s=280&v=4",
    maintenance: null,
    name: "Volutpat Molestie",
    nl: null,
    outputTypes: ["string"],
    platforms: ["web", "ios"],
    releaseDate: "2020-02-18",
    roadmap: "https://vng.nl/agenda",
    softwareType: "library",
    softwareVersion: "1.0",
    url: null,
    usedBy: null,
  },
  {
    id: "7f48a278-7bb4-42a6-a190-6021663aadb3",
    applicationId: null,
    applicationSuite: null,
    categories: ["Acounting"],
    dependsOn: null,
    description: null,
    developmentStatus: "beta",
    inputTypes: ["string"],
    intendedAudience: null,
    isBasedOn: "https://github.com/ConductionNL/adresservice",
    landingURL: "https://github.com/ConductionNL/adresservice",
    legal: null,
    localisation: null,
    logo: "https://avatars0.githubusercontent.com/u/34739001?s=280&v=4",
    maintenance: null,
    name: "OpenCatalogi",
    nl: null,
    outputTypes: ["string"],
    platforms: ["linux", "windows"],
    releaseDate: "2020-02-18",
    roadmap: "https://vng.nl/agenda",
    softwareType: "softwareAddon",
    softwareVersion: "1.0",
    url: null,
    usedBy: null,
  },
  {
    id: "82e924b9-8c59-4403-bed9-434a459d3839",
    applicationId: null,
    applicationSuite: null,
    categories: ["Acounting"],
    dependsOn: null,
    description: null,
    developmentStatus: "beta",
    inputTypes: ["string"],
    intendedAudience: null,
    isBasedOn: "https://github.com/ConductionNL/adresservice",
    landingURL: "https://github.com/ConductionNL/adresservice",
    legal: null,
    localisation: null,
    logo: "https://avatars0.githubusercontent.com/u/34739001?s=280&v=4",
    maintenance: null,
    name: "Vivamus Aliquet Elit Ac Nisl",
    nl: null,
    outputTypes: ["string"],
    platforms: ["windows", "linux", "android", "ios"],
    releaseDate: "2020-02-18",
    roadmap: "https://vng.nl/agenda",
    softwareType: "standalone/iot",
    softwareVersion: "1.0",
    url: null,
    usedBy: null,
  },
];
