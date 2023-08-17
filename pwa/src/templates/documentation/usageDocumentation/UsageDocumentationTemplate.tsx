import * as React from "react";
import * as styles from "./UsageDocumentationTemplate.module.css";
import { Container } from "@conduction/components";
import { CodeBlock, Heading, Paragraph, Icon, Code } from "@utrecht/component-library-react/dist/css-module";
import { IconExternalLink, IconArrowRight } from "@tabler/icons-react";
import dedent from "dedent";
import { Link } from "../../../components";
import { SubmitUrlTemplate } from "../../templateParts/submitUrl/SubmitUrlTemplate";
import { useTranslation } from "react-i18next";

export const UsageDocumentationTemplate: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <Heading level={1}>Componenten op OpenCatalogi plaatsen en Componenten installeren</Heading>

        <Paragraph lead className={styles.description}>
          Er zijn vier manieren om een component zichtbaar te maken op OpenCatalogi.
        </Paragraph>
      </section>

      <section className={styles.section}>
        <SubmitUrlTemplate
          title={t("Already have a repository URL? Then register it immediately.")}
          placeholder={t("Repository url of your component or organization")}
          buttonLabel={t("Submit component or organization")}
        />
      </section>

      <section className={styles.section}>
        <Heading level={2}>1. Een publiccode.yaml opnemen in je repository</Heading>
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
                <IconExternalLink />
              </Icon>{" "}
              hier
            </Link>
          </span>{" "}
          en een online-editor kun je{" "}
          <span>
            <Link target="_new" href="https://publiccode-editor.developers.italia.it/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
              </Icon>
              hier
            </Link>
          </span>{" "}
          terug vinden.
        </Paragraph>
        <Heading level={2}>2. Start een eigen OpenCatalogi installatie</Heading>
        <Paragraph className={styles.description}>
          OpenCatalogi is een federatief ecosysteem dat betekent dat iedere organisatie zijn eigen componenten catalogus
          kan starten. Vanuit de eigen catalogus kunnen zowel componenten worden geïmporteerd als beschikbaar gesteld
          voor andere catalogussen.
          <br />
          <br />
          Meer informatie over het zelf inrichten van een OpenCatalogi vind je hier onder.
        </Paragraph>
        <Heading level={2}>3. Via andere catalogussen</Heading>
        <Paragraph className={styles.description}>
          OpenCatalogi synchroniseert onder andere met{" "}
          <span>
            <Link target="_new" href="https://componentencatalogus.commonground.nl/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
              </Icon>
              Common Ground Componenten­catalogus
            </Link>
          </span>
          ,{" "}
          <span>
            <Link target="_new" href="https://developer.overheid.nl/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
              </Icon>
              Developer Overheid
            </Link>
          </span>{" "}
          en <br />
          <span>
            <Link target="_new" href="https://www.softwarecatalogus.nl/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
              </Icon>
              GEMMA Softwarecatalogus
            </Link>
          </span>
          , het daar vermelden van software zorgt ervoor dat deze wordt overgenomen in OpenCatalogi.
        </Paragraph>
        <Heading level={2}>4. Via het aanmaken van een account</Heading>
        <Paragraph className={styles.description}>
          U kunt via{" "}
          <span>
            <Link to="/documentation/contact">
              <Icon className="utrecht-icon--conduction-start">
                <IconArrowRight />
              </Icon>
              dit formulier
            </Link>
          </span>{" "}
          een account aanvragen. Via een account kunt u de gegevens van uw component en organisatie aanpassen en nieuwe
          componenten aanmelden.
        </Paragraph>
      </section>
      <section className={styles.section}>
        <Heading level={1} id="intsallation">
          Installeren met de skeleton application
        </Heading>
        <Paragraph className={styles.description}>
          De skeleton application is een makkelijke manier om de componenten te installeren en te gebruiken. De skeleton
          application is namelijk ontworpen voor snelle applicatietesten en prototypeontwikkeling op het NL Design
          System.
        </Paragraph>
      </section>
      <section className={styles.section}>
        <Heading level={2}>Aan de slag </Heading>
        <Paragraph className={styles.description}>
          Om een eigen project op te zetten heb je een GitHub-account nodig en daar mee ingelogd zijn. Klik op de groene
          "Use this template" knop op de <br />
          <span>
            <Link target="_new" href="https://github.com/ConductionNL/skeleton-app">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
              </Icon>
              GitHub-pagina
            </Link>
          </span>
          . Vertel GitHub waar je je prototype wilt hebben draaien en klik op "reate a repository from template"
          <br />
          <br />
        </Paragraph>
        <Heading level={3}>Lokaal je omgeving laten draaien</Heading>
        <Paragraph className={styles.description}>
          Om lokaal te ontwikkelen, moet je de nieuwe repository klonen naar je eigen lokale machine. Open een terminal,
          navigeer naar de folder die de repository bevat, en maak een keuze tussen Node.js/npm of Docker om de app te
          laten draaien.
        </Paragraph>
        <Heading level={4}>Node.js / NPM</Heading>
        <Paragraph className={styles.description}>
          Je hebt een Git client nodig(optioneel), en je moet Node.js en NPM geïnstalleerd hebben. Dit zal de front-end
          op poort:9000 laten draaien, dus zorg er voor dat de poort niet al in gebruik is.
        </Paragraph>
        <CodeBlock className={styles.codeBlock}>
          {dedent`
          $ cd /pwa
          $ npm run build
          $ npm run serve`}
        </CodeBlock>
        <Heading level={4}>Docker</Heading>
        <Paragraph className={styles.description}>
          Je moet Docker geïnstalleerd hebben. Dit zal de front-end op poort:81 laten draaien, dus zorg er voor dat de
          poort niet al in gebruik is.
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
                <IconExternalLink />
              </Icon>
              http://localhost:81/
            </Link>
          </span>{" "}
          om de app in de browser te bekijken.
        </Paragraph>

        <Heading level={4}>Back-endverbinding configureren</Heading>
        <Paragraph className={styles.description}>
          Om verbinding te maken tussen de front-end en de lokale back-end moet je eerst de back-end opstarten, je kunt
          de installatiehandleiding{" "}
          <span>
            <Link target="_new" href="https://github.com/OpenCatalogi/OpenCatalogiBundle#opencatalogibundle-">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
              </Icon>
              hier
            </Link>
          </span>{" "}
          volgen.
        </Paragraph>
        <Paragraph>
          Om de front-end met de lokale gateway te laten praten moet je de omgevingsvariabelen in het{" "}
          <Code className={styles.code}>env.js</Code> bestand veranderen. Vervang de inhoud van het bestand met het
          volgende:
        </Paragraph>
        <CodeBlock className={styles.codeBlock}>
          {dedent`
          window.sessionStorage.setItem("GATSBY_ME_URL", "http://localhost/api/users/me");
          window.sessionStorage.setItem("GATSBY_API_URL", "http://localhost/api");
          window.sessionStorage.setItem("GATSBY_ADMIN_URL", "http://localhost/admin");
          window.sessionStorage.setItem("GATSBY_BASE_URL", "http://localhost");
          window.sessionStorage.setItem("GATSBY_FRONTEND_URL", "http://localhost");
          window.sessionStorage.setItem("GATSBY_ORGANIZATION", "");
          window.sessionStorage.setItem("GATSBY_LOGIN_REDIRECT", "vault");
          window.sessionStorage.setItem("ADMIN_DASHBOARD_URL", "http://localhost:8000");`}
        </CodeBlock>
        <Paragraph>Herstart de front-end na het aanpassen van dit bestand.</Paragraph>
        <Heading level={5}>Node.js / NPM</Heading>
        <Paragraph className={styles.description}>
          Stop de server door op <Code className={styles.code}>CTRL + C</Code> te drukken en bouw de front-end opnieuw
          op:
        </Paragraph>
        <CodeBlock className={styles.codeBlock}>
          {dedent`
          $ npm run build
          $ npm run serve`}
        </CodeBlock>
        <Heading level={5}>Docker</Heading>
        <Paragraph className={styles.description}>
          Stop de server door op <Code className={styles.code}>CTRL + C</Code> te drukken en herstart front-end:
        </Paragraph>
        <CodeBlock className={styles.codeBlock}>
          {dedent`
          $ docker-compose down
          $ docker-compose up`}
        </CodeBlock>
        <br />
        <br />
        <Paragraph>
          Om de werking van de common-gateway die samen met de applicatie gaat draaien, te veranderen verwijzen we
          vriendelijk naar de technische documentatie van de{" "}
          <span>
            <Link target="_new" href="https://docs.conductor-gateway.app/en/latest/installation/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
              </Icon>
              common-gateway
            </Link>
          </span>
          .
        </Paragraph>
        <Heading level={2}>Installeren op Kubernetes omgevingen</Heading>
        <Paragraph className={styles.description}>
          Om de applicatie te installeren op je eigen cloud omgeving ondersteunen we installaties in{" "}
          <span>
            <Link target="_new" href="https://kubernetes.io/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
              </Icon>
              kubernetes
            </Link>
          </span>{" "}
          met het gebruik van de bijgeleverde{" "}
          <span>
            <Link target="_new" href="https://helm.sh/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
              </Icon>
              Helm
            </Link>
          </span>{" "}
          grafiek. Kubernetes is een Container Orkestratie dat een standaard is geworden voor Nederlandse gemeenten
          onder de{" "}
          <span>
            <Link target="_new" href="https://haven.commonground.nl/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
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
                <IconExternalLink />
              </Icon>
              Dashkube
            </Link>
          </span>{" "}
          of{" "}
          <span>
            <Link target="_new" href="https://rancher.com/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
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
                <IconExternalLink />
              </Icon>
              helm.sh
            </Link>
          </span>
          , hiervoor is het vereist om{" "}
          <span>
            <Link target="_new" href="https://kubernetes.io/docs/tasks/tools/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
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
                <IconExternalLink />
              </Icon>
              hier
            </Link>
          </span>
          .
        </Paragraph>
        <Heading level={2}>Technische Documentatie</Heading>
        <Paragraph className={styles.description}>
          De volledige technische documentatie is te vinden op{" "}
          <span>
            <Link target="_new" href="https://skeleton-app.readthedocs.io/en/latest/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
              </Icon>
              Read the Docs
            </Link>
          </span>{" "}
          en is gebaseerd op{" "}
          <span>
            <Link target="_new" href="https://www.mkdocs.org/">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
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
                <IconExternalLink />
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
