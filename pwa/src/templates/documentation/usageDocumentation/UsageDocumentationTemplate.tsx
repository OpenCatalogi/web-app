import * as React from "react";
import * as styles from "./UsageDocumentationTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading1, Heading2, LeadParagraph, Paragraph } from "@gemeente-denhaag/components-react";
import { CodeBlock, Icon } from "@utrecht/component-library-react/dist/css-module";
import { ExternalLinkIcon, ArrowRightIcon } from "@gemeente-denhaag/icons";
import dedent from "dedent";
import { Link } from "../../../components";

export const UsageDocumentationTemplate: React.FC = () => {
  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <Heading1>Componenten op OpenCatalogi plaatsen en Componenten installeren</Heading1>

        <LeadParagraph className={styles.description}>
          Er zijn vier manieren om een component zichtbaar te maken op OpenCatalogi.
        </LeadParagraph>
      </section>

      <section className={styles.section}>
        <Heading2>1. Een publiccode.yaml opnemen in je repository</Heading2>
        <Paragraph className={styles.description}>
          OpenCatalogi is gebouwd op het Europese public code framework. Uitgangspunt hierbij is dat open source,
          betekent dat de source code in een git repository staat (bijvoorbeeld Github, Gitlab of SourceTree) die
          openbaar toegankelijk is.
          <br />
          <br />
          Vanuit de gedachte zelf documenterende code hoef je in dit geval alleen een publiccode.yaml op te nemen in de
          root van je repository. In deze yaml beschrijf je het project op een voor machines leesbare manier. Meer
          uitleg over publiccode.yaml vind je{" "}
          <span>
            <Link target="_new" href="https://yml.publiccode.tools/schema.core.html#top-level-keys-and-sections">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>{" "}
              hier
            </Link>
          </span>{" "}
          en een online-editor kun je{" "}
          <span>
            <Link target="_new" href="https://publiccode-editor.developers.italia.it/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              hier
            </Link>
          </span>{" "}
          terug vinden.
        </Paragraph>
        <Heading2>2. Start een eigen OpenCatalogi installatie</Heading2>
        <Paragraph className={styles.description}>
          OpenCatalogi is een federatief ecosysteem dat betekent dat iedere organisatie zijn eigen componenten catalogus
          kan starten. Vanuit de eigen catalogus kunnen zowel componenten worden geïmporteerd als beschikbaar gesteld
          voor andere catalogussen.
          <br />
          <br />
          Meer informatie over het zelf inrichten van een OpenCatalogi vind je hier onder.
        </Paragraph>
        <Heading2>3. Via andere catalogussen</Heading2>
        <Paragraph className={styles.description}>
          OpenCatalogi synchroniseert onder andere met{" "}
          <span>
            <Link target="_new" href="https://componentencatalogus.commonground.nl/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              Common Ground Componenten­catalogus
            </Link>
          </span>
          ,{" "}
          <span>
            <Link target="_new" href="https://developer.overheid.nl/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              Developer Overheid
            </Link>
          </span>{" "}
          en <br />
          <span>
            <Link target="_new" href="https://www.softwarecatalogus.nl/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              GEMMA Softwarecatalogus
            </Link>
          </span>
          , het daar vermelden van software zorgt ervoor dat deze wordt overgenomen in OpenCatalogi.
        </Paragraph>
        <Heading2>4. Via het aanmaken van een account</Heading2>
        <Paragraph className={styles.description}>
          U kunt via{" "}
          <span>
            <Link to="/documentation/contact">
              <Icon className="utrecht-icon--conduction-start">
                <ArrowRightIcon />
              </Icon>
              dit formulier
            </Link>
          </span>{" "}
          een account aanvragen. Via een account kunt u de gegevens van uw component en organisatie aanpassen en nieuwe
          componenten aanmelden.
        </Paragraph>
      </section>
      <section className={styles.section}>
        <Heading1 id="intsallation">Installeren met de skeleton application</Heading1>
        <Paragraph className={styles.description}>
          De skeleton application is een makkelijke manier om de componenten te installeren en te gebruiken. De skeleton
          application is namelijk ontworpen voor snelle applicatietesten en prototypeontwikkeling op het NL Design
          System.
        </Paragraph>
      </section>
      <section className={styles.section}>
        <Heading2>Aan de slag </Heading2>
        <Paragraph className={styles.description}>
          Om een eigen project op te zetten heb je een GitHub-account nodig en daar mee ingelogd zijn. Klik op de groene
          "Use this template" knop op de <br />
          <span>
            <Link target="_new" href="https://github.com/ConductionNL/skeleton-app">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              GitHub-pagina
            </Link>
          </span>
          . Vertel GitHub waar je je prototype wilt hebben draaien en klik op "reate a repository from template"
          <br />
          <br />
        </Paragraph>
        <Heading2>Lokaal je omgeving laten draaien</Heading2>
        <Paragraph className={styles.description}>
          Om lokaal te ontwikkelen, moet je de nieuwe repository klonen naar je eigen lokale machine. Open een terminal,
          navigeer naar de folder die de repository bevat, en maak een keuze tussen Node.js/npm of Docker om de app te
          laten draaien.
        </Paragraph>
        <Heading2>Node.js / NPM</Heading2>
        <Paragraph className={styles.description}>
          Je hebt een Git client nodig(optioneel), en je moet Node.js en NPM geïnstalleerd hebben. Dit gaat poort:8000
          gebruiken, dus zorg er voor dit poort niet al in gebruik is.
        </Paragraph>
        <CodeBlock className={styles.codeBlock}>
          {dedent`
          $ cd /pwa
          $ npm install
          $ npm run develop`}
        </CodeBlock>
        <Heading2>Docker</Heading2>
        <Paragraph className={styles.description}>
          Je moet Docker geïnstalleerd hebben. Docker laat de gateway van Conduction op poort:80 draaien en ook de app
          zelf op poort:8000, dus zorg er voor dat deze poorten niet in gebruik zijn.
        </Paragraph>
        <CodeBlock className={styles.codeBlock}>{`$ docker-compose pull`}</CodeBlock>
        <Paragraph>
          De eerste keer dat je Docker containers of wanneer je grote veranderingen hebt gemaakt aan de werking van de
          applicatie, voert je het volgende commando uit:
        </Paragraph>
        <CodeBlock className={styles.codeBlock}>{`$ docker-compose up --build`}</CodeBlock>
        <Paragraph>
          Als je dit niet doet dan draai je de containers zonder de applicatie container te herbouwen.
        </Paragraph>
        <CodeBlock className={styles.codeBlock}>{`$ docker-compose up`}</CodeBlock>
        <Paragraph>
          Na het succesvol instellen van de ontwikkelomgeving, navigeer naar{" "}
          <span>
            <Link target="_new" href="http://localhost:81/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              http://localhost:81/
            </Link>
          </span>{" "}
          om de app in de browser te bekijken.
          <br /> <br />
          Om de werking van de common-gateway die samen met de applicatie gaat draaien, te veranderen verwijzen we
          vriendelijk naar de technische documentatie van de{" "}
          <span>
            <Link target="_new" href="https://docs.conductor-gateway.app/en/latest/installation/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              common-gateway
            </Link>
          </span>
          .
        </Paragraph>
        <Heading2>Installeren op Kubernetes omgevingen</Heading2>
        <Paragraph className={styles.description}>
          Om de applicatie te installeren op je eigen cloud omgeving ondersteunen we installaties in{" "}
          <span>
            <Link target="_new" href="https://kubernetes.io/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              kubernetes
            </Link>
          </span>{" "}
          met het gebruik van de bijgeleverde{" "}
          <span>
            <Link target="_new" href="https://helm.sh/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              Helm
            </Link>
          </span>{" "}
          grafiek. Kubernetes is een Container Orkestratie dat een standaard is geworden voor Nederlandse gemeenten
          onder de{" "}
          <span>
            <Link target="_new" href="https://haven.commonground.nl/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              Haven
            </Link>
          </span>{" "}
          standaard, en waar Helm de standaard installatie methode voor componenten is.
          <br />
          <br />
          De Helm grafiek kan geïnstalleerd worden met de hulp van Kubernetes beheertools zoals{" "}
          <span>
            <Link target="_new" href="https://dashkube.com/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              Dashkube
            </Link>
          </span>{" "}
          of{" "}
          <span>
            <Link target="_new" href="https://rancher.com/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              Rancher
            </Link>
          </span>
          .
          <br />
          <br />
          De Helm grafiek kan ook geïnstalleerd worden door Helm te draaien van je lokale machine (zie de instructies
          over hoe je Helm installeert op <br />
          <span>
            <Link target="_new" href="https://helm.sh/docs/intro/install/#through-package-managers/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              helm.sh
            </Link>
          </span>
          , hiervoor is het vereist om{" "}
          <span>
            <Link target="_new" href="https://kubernetes.io/docs/tasks/tools/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              kubectl
            </Link>
          </span>{" "}
          te hebben geïnstalleerd).
        </Paragraph>
        <CodeBlock className={styles.codeBlock}>
          {dedent`
          $ helm repo add opencatalogi https://raw.githubusercontent.com/opencatalogi/web-app/development/helm/
          $ helm install my-opencatalogi opencatalogi/opencatalogi`}
        </CodeBlock>
        <Paragraph>
          Voor overige configuratie verwijzen we vriendelijk naar de documentatie van de helm grafiek die vind je{" "}
          <span>
            <Link
              target="_new"
              href="https://github.com/OpenCatalogi/web-app/blob/e3fdf396cd5fb39266fd77a2af404cb59a881cb7/helm/README.md/"
            >
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              hier
            </Link>
          </span>
          .
        </Paragraph>
        <Heading2>Technische Documentatie</Heading2>
        <Paragraph className={styles.description}>
          De volledige technische documentatie is te vinden op{" "}
          <span>
            <Link target="_new" href="https://skeleton-app.readthedocs.io/en/latest/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              Read the Docs
            </Link>
          </span>{" "}
          en is gebaseerd op{" "}
          <span>
            <Link target="_new" href="https://www.mkdocs.org/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              MKDocs
            </Link>
          </span>
          .
          <br /> <br />
          Als je de technische documentatie lokaal wilt draaien, kan je dit doen door middel van de MKDocs server en het
          "erve" commando.
        </Paragraph>
        <CodeBlock className={styles.codeBlock}>{`$ mkdocs serve`}</CodeBlock>
        <Paragraph>
          Ga naar de repository en voer het commando uit om de documentatie beschikbaar te stellen op poort:8000. <br />
          Zorg er voor dat je eerst{" "}
          <span>
            <Link target="_new" href="https://www.mkdocs.org/user-guide/installation/">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              MKDocs installeert
            </Link>
          </span>
          .
        </Paragraph>
      </section>
    </Container>
  );
};
