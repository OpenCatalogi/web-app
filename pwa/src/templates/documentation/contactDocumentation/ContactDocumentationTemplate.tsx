import * as React from "react";
import * as styles from "./ContactDocumentationTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading1, LeadParagraph } from "@gemeente-denhaag/components-react";
import { Icon } from "@utrecht/component-library-react/dist/css-module";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "../../../components";

export const ContactDocumentationTemplate: React.FC = () => {
  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <Heading1 className={styles.title}>Contact</Heading1>

        <LeadParagraph className={styles.description}>
          Wil je meer weten of heb je vragen dan kun je terecht bij de initiatiefnemers van dit project:
          <br />
          <span>
            <Link target="_new" href="https://www.rotterdam.nl">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              De Gemeente Rotterdam
            </Link>
          </span>{" "}
          en{" "}
          <span>
            <Link target="_new" href="https://www.conduction.nl">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              Conduction
            </Link>
          </span>
          . Dit kan je doen door te mailen naar{" "}
          <span>
            <Link to={`mailto:info@conduction.nl`}>
              <Icon className="utrecht-icon--conduction-start">
                <FontAwesomeIcon icon={faEnvelope} />
              </Icon>
              Conduction
            </Link>
          </span>{" "}
          of te bellen naar{" "}
          <span>
            <Link to={`tel:14010`}>
              <Icon className="utrecht-icon--conduction-start">
                <FontAwesomeIcon icon={faPhone} />
              </Icon>
              De Gemeente Rotterdam
            </Link>
          </span>{" "}
          of naar{" "}
          <span>
            <Link to={`tel:+31853036840`}>
              <Icon className="utrecht-icon--conduction-start">
                <FontAwesomeIcon icon={faPhone} />
              </Icon>
              Conduction
            </Link>
          </span>
        </LeadParagraph>
      </section>
    </Container>
  );
};
