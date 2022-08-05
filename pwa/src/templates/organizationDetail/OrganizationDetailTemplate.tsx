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
import { TEMPORARY_COMPONENTS } from "../../data/components";

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

