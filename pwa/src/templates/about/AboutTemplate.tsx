import * as React from "react";
import * as styles from "./AboutTemplate.module.css";
import { Container, QuoteWrapper } from "@conduction/components";
import {
  Button,
  Heading1,
  Heading2,
  Heading3,
  LeadParagraph,
  Link,
  Paragraph,
} from "@gemeente-denhaag/components-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";
import layersVisual from "./../../assets/images/5-lagen-visualisatie.png";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";

export const AboutTemplate: React.FC = () => {
  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <Heading1>Over OpenCatalogi</Heading1>

        <LeadParagraph>
          OpenCatalogi is een weergave van Componenten verdeeld over de 5 lagen zoals gedefinieerd door VNG in het
          Gegevenslandschap.
        </LeadParagraph>

        <div className={styles.buttonsContainer}>
          <Button
            onClick={() => open("https://www.gemmaonline.nl/index.php/Gegevenslandschap")}
            icon={<ExternalLinkIcon />}
          >
            Gegevenslandschap
          </Button>

          <Button
            onClick={() => open("https://componentencatalogus.commonground.nl/5-lagen-model")}
            icon={<ExternalLinkIcon />}
          >
            5 lagen model
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <Heading2>Component</Heading2>

        <LeadParagraph>
          Voor OpenCatalogi hanteren we de archimate definitie met de aanscherpingen die vanuit de VNG worden meegegeven
          in hoofdstuk 2.1 van{" "}
          <span
            onClick={() =>
              open(
                "https://www.gemmaonline.nl/images/gemmaonline/0/09/GEMMA_Gegevenslandschap_-_Informatiearchitectuurprincipes_v1_0.pdf",
              )
            }
          >
            <Link icon={<ExternalLinkIcon />} iconAlign="start">
              GEMMA gegevenslandschap informatiearchitectuurprincipes
            </Link>
          </span>
          .
        </LeadParagraph>

        <Paragraph>
          De archimate definitie zoals vertaald door VNG: Een modulair, zelfstandig inzetbaar, herbruikbaar en
          vervangbaar deel van een systeem, dat zijn functionaliteit aanbiedt via goed gedefinieerde interfaces.
          Applicatiecomponenten stellen functionaliteit beschikbaar, die gebruikt wordt om de applicatiediensten mee te
          leveren.
        </Paragraph>

        <div className={styles.quoteWrapperContainer}>
          <QuoteWrapper>
            <LeadParagraph>
              We werken met componenten die afgebakende functionaliteit kennen, zoveel mogelijk ontkoppeld zijn en met
              elkaar communiceren via gestandaardiseerde interfaces.
              <span className={styles.author}>
                — <i>Aanscherping vanuit de VNG</i>
              </span>
            </LeadParagraph>
          </QuoteWrapper>
        </div>
      </section>

      <section className={styles.section} id="score-calculation">
        <Heading3>Ingevuld met (voor zover van toepassing) voor OpenCatalogi</Heading3>

        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>Autonomie</TableHeader>
              <TableCell>Componenten zijn zelfstandig inzetbaar, schaalbaar en vervangbaar</TableCell>
            </TableRow>

            <TableRow>
              <TableHeader>Losse koppeling</TableHeader>
              <TableCell>
                Componenten zijn onderling onafhankelijk en zelfstandig door te ontwikkelen en gebruiken
              </TableCell>
            </TableRow>

            <TableRow>
              <TableHeader>Herbruikbaar</TableHeader>
              <TableCell>
                Componenten zijn vaker in te zetten door ze in verschillende omgevingen te gebruiken of door een
                component vaker te instantiëren binnen één omgeving
              </TableCell>
            </TableRow>

            <TableRow>
              <TableHeader>Samenstelbaar</TableHeader>
              <TableCell>Componenten kunnen worden gecombineerd tot nieuwe componenten</TableCell>
            </TableRow>

            <TableRow>
              <TableHeader>Abstractie</TableHeader>
              <TableCell>
                Afnemers hoeven alleen de functionaliteit van een component te kennen en niet de interne werking ervan.
                Service-contract - Een component kent duidelijke voorwaarden en leveringsafspraken over de kwaliteit en
                het volume van mogelijk gebruik door afnemers
              </TableCell>
            </TableRow>

            <TableRow>
              <TableHeader>Vindbaar</TableHeader>
              <TableCell>Services zijn voorzien van metadata en zijn goed vindbaar</TableCell>
            </TableRow>

            <TableRow>
              <TableHeader>Toestandsloos</TableHeader>
              <TableCell>
                Componenten die diensten leveren bewaren geen statusinformatie (maar laten dit over aan afnemers of
                gespecialiseerde componenten)
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className={styles.section}>
        <Heading3>Componenten conformeren zich aan het vijf-lagenmodel</Heading3>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Componenten beperken zich tot functionaliteit binnen de laag waartoe ze behoren</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                Componenten voor interactie- en procesfunctionaliteit vragen gegevens op bij de bron via
                gestandaardiseerde interfaces
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Componenten bewerken geen brongegevens anders dan bij de bron</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className={styles.section}>
        <Paragraph>
          De verschijningsvorm van een component is afhankelijk van de laag. In navolgende figuur is dit weergegeven:
        </Paragraph>

        <img src={layersVisual} className={styles.layersVisual} />
      </section>

      <section className={styles.section}>
        <Heading2>Applicatie</Heading2>

        <LeadParagraph>
          Samenstelling (toepassing) van componenten met minimaal één component op laag 5 ten behoeve van eindgebruik in
          een gemeentelijk bedrijfsproces/dienstverleningsproces.
        </LeadParagraph>

        <Paragraph>
          In Opencatalogi kan vanuit een applicatie naar de samenstellende componenten worden doorgeklikt, waarbij ook
          een component kan zijn samengesteld uit meerdere (sub)componenten.
        </Paragraph>
      </section>
    </Container>
  );
};
