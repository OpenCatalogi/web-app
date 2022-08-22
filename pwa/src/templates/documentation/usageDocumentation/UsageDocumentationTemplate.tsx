import * as React from "react";
import * as styles from "./UsageDocumentationTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading1, Heading2, LeadParagraph, Link, Paragraph } from "@gemeente-denhaag/components-react";
import { ExternalLinkIcon, ArrowRightIcon } from "@gemeente-denhaag/icons";
import { navigate } from "gatsby";

export const UsageDocumentationTemplate: React.FC = () => {
  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <Heading1>Componenten op Open Catalogi plaatsen</Heading1>

        <LeadParagraph>Er zijn vier manieren om een component zichtbaar te maken op Open Catalogi.</LeadParagraph>
      </section>

      <section className={styles.section}>
        <Heading2>1. Een publiccode.yaml opnemen in je repository</Heading2>
        <Paragraph>
          Open Catalogi is gebouwd op het Europese public code framework. Uitgangspunt hierbij is dat open source,
          betekent dat de source code in een git repository staat (bijvoorbeeld Github, Gitlab of SourceTree) die
          openbaar toegankelijk is.
          <br />
          <br />
          Vanuit de gedachte zelf documenterende code hoef je in dit geval alleen een publiccode.yaml op te nemen in de
          root van je repository. In deze yaml beschrijf je het project op een voor machines leesbare manier. Meer
          uitleg over publiccode.yaml vind je{" "}
          <span
            onClick={() => {
              navigate("#");
            }}
          >
            <Link icon={<ExternalLinkIcon />} iconAlign="start">
              hier
            </Link>
          </span>{" "}
          en een online-editor kan je{" "}
          <span
            onClick={() => {
              navigate("#");
            }}
          >
            <Link icon={<ExternalLinkIcon />} iconAlign="start">
              hier
            </Link>
          </span>{" "}
          terug vinden.
        </Paragraph>
        <Heading2>2. Start een eigen Open Catalogi installatie</Heading2>
        <Paragraph>
          Open Catalogi is een federatief ecosysteem dat betekent dat iedere organisatie zijn eigen componenten
          catalogus kan starten. Vanuit de eigen catalogus kunnen zowel componenten worden geïmporteerd als beschikbaar
          gesteld voor andere catalogussen.
          <br />
          <br />
          Meer informatie over het zelf inrichten van een Open Catalogi vind je{" "}
          <span
            onClick={() => {
              navigate("#");
            }}
          >
            <Link icon={<ExternalLinkIcon />} iconAlign="start">
              hier
            </Link>
          </span>
          .
        </Paragraph>
        <Heading2>3. Via andere catalogussen</Heading2>
        <Paragraph>
          Open Catalogi synchroniseert onder andere met{" "}
          <a href="https://componentencatalogus.commonground.nl/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                Common Ground Componenten­catalogus
              </Link>
            </span>
          </a>
          ,{" "}
          <a href="https://developer.overheid.nl/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                Developer Overheid
              </Link>
            </span>
          </a>{" "}
          en <br />
          <a href=" https://www.softwarecatalogus.nl/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                GEMMA Softwarecatalogus
              </Link>
            </span>
          </a>{" "}
          het daar vermelden van software zorgt ervoor dat deze wordt overgenomen in Open Catalogi.
        </Paragraph>
        <Heading2>4. Via het aanmaken van een account</Heading2>
        <Paragraph>
          U kunt via{" "}
          <span
            onClick={() => {
              navigate("#");
            }}
          >
            <Link icon={<ArrowRightIcon />} iconAlign="start">
              dit formulier
            </Link>
          </span>{" "}
          een account aanvragen. Via een account kunt u de gegevens van uw component en organisatie aanpassen en nieuwe
          componenten aanmelden.
        </Paragraph>
      </section>
    </Container>
  );
};
