import * as React from "react";
import * as styles from "./OrganizationDetailTemplate.module.css";
import { Container, QuoteWrapper } from "@conduction/components";
import { Divider, Heading1, Heading2, Heading3, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import organizationLogo from "./../../assets/svgs/LogoRotterdam.svg";
import { ExternalLinkIcon, CallIcon, EmailIcon } from "@gemeente-denhaag/icons";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { TEMPORARY_COMPONENTS } from "../../data/components";
import { CardsSearchTemplate } from "../templateParts/CardsSearch/CardsSearchTemplate";

interface OrganizationDetailTemplateProps {
  organizationId: string;
}

export const OrganizationDetailTemplate: React.FC<OrganizationDetailTemplateProps> = ({ organizationId }) => {
  return (
    <Container layoutClassName={styles.container}>
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

      <Divider />

      <div className={styles.section}>
        <Heading2>Componenten</Heading2>
        <div className={styles.layersContainer}>
          <div className={styles.components}>
            <Heading3>Eigen componenten</Heading3>
            <CardsSearchTemplate components={TEMPORARY_COMPONENTS.slice(0, 6)} />
          </div>
          <div className={styles.components}>
            <Heading3>Ondersteunde componenten</Heading3>
            <CardsSearchTemplate components={TEMPORARY_COMPONENTS.slice(7, 13)} />
          </div>
          <div className={styles.components}>
            <Heading3>Gebruikte componenten</Heading3>
            <CardsSearchTemplate components={TEMPORARY_COMPONENTS} />
          </div>
        </div>
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
