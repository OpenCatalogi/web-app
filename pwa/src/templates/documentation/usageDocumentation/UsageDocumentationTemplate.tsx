import * as React from "react";
import * as styles from "./UsageDocumentationTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading1, Heading2, LeadParagraph, Link, Paragraph } from "@gemeente-denhaag/components-react";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";
import { navigate } from "gatsby";

export const UsageDocumentationTemplate: React.FC = () => {
  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <Heading1>Gebruikmaken van OpenCatalogi</Heading1>

        <LeadParagraph>Teksten voor op OpenCatalogi.nl</LeadParagraph>
      </section>

      <section className={styles.section}>
        <Heading2>Componenten op OpenCatalogi plaatsen</Heading2>

        <LeadParagraph>Er zijn vier manieren om een component zichtbaar te maken op open catalogi.</LeadParagraph>
        <Paragraph>
          <ol>
            <li>
              <p>
                <b>Een publiccode.yaml opnemen in je repository</b>
                <br></br>Open Catalogi is gebouwd op het europese publiccode framework. Uitgangspunt hierbij is dat
                opensource betekent dat de sourcecode in een git repository staat (bijvoorbeeld github, gitlab of source
                tree) die openbaar toegankelijk is.<br></br>
                <br></br>Vanuit de gedachte zelf documenterende code hoef je in dit geval alleen een publiccode.yaml op
                te nemen in de root van je repository. In deze yaml beschrijv je het project op een voor machines
                leesbare manier. Meer uitleg over publiccode.yaml vind je{" "}
                <span
                  onClick={() => {
                    navigate("#");
                  }}
                >
                  <Link icon={<ExternalLinkIcon />} iconAlign="start">
                    hier
                  </Link>
                </span>{" "}
                en een online editor kan je{" "}
                <span
                  onClick={() => {
                    navigate("#");
                  }}
                >
                  <Link>hier</Link>
                </span>{" "}
                terug vinden.
              </p>
            </li>
            <li>
              <p>
                <b>Start een eigen OpenCatalogi installatie</b>
                <br></br>OpenCatalogi is een federatief ecosysteem dat betekent dat iedere organisatie zijn eigen
                componenten catalogus kan starten vanuit de eigen catalogus kunnen zowel componenten worden geïmporteerd
                als beschikbaar gesteld voor andere catalogussen.
                <br></br>
                <br></br>Meer informatie over het zelf inrichten van een OpenCatalogi vind je{" "}
                <span
                  onClick={() => {
                    navigate("#");
                  }}
                >
                  <Link>hier</Link>
                </span>
                .
              </p>
            </li>
            <li>
              <p>
                <b>Via andere catalogusen</b>
                <br></br>OpenCatalogi synchonsyeerd onder andere met{" "}
                <span
                  onClick={() => {
                    navigate("https://componentencatalogus.commonground.nl/");
                  }}
                >
                  <Link>https://componentencatalogus.commonground.nl/</Link>
                </span>
                ,
                <span
                  onClick={() => {
                    navigate("https://developer.overheid.nl/");
                  }}
                >
                  <Link>https://developer.overheid.nl/</Link>
                </span>{" "}
                en&nbsp;
                <span
                  onClick={() => {
                    navigate("https://www.softwarecatalogus.nl/");
                  }}
                >
                  <Link>https://www.softwarecatalogus.nl/</Link>
                </span>{" "}
                het daar vermelden van software zorgt ervoor dat deze wordt overgenomen in OpenCatalogi.
              </p>
            </li>
            <li>
              <p>
                <b>Via het aanmaken van een account</b>
                <br></br>U kunt via{" "}
                <span
                  onClick={() => {
                    navigate("#");
                  }}
                >
                  <Link>dit formulier</Link>
                </span>{" "}
                een account aanvragen. Via een account kunt u de gegevens van uw component en organisatie aanpassen en
                nieuwe componenten aanmelden.
              </p>
            </li>
          </ol>
        </Paragraph>
      </section>
    </Container>
  );
};
