import * as React from "react";
import * as styles from "./ContactDocumentationTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading, Paragraph, Icon } from "@utrecht/component-library-react/dist/css-module";
import { IconExternalLink } from "@tabler/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "../../../components";

export const ContactDocumentationTemplate: React.FC = () => {
  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <Heading level={1} className={styles.title}>
          Contact
        </Heading>

        <Paragraph className={styles.description}>
          Wil je meer weten of heb je vragen dan kun je terecht bij de initiatiefnemers van dit project:
          <br />
          <span>
            <Link target="_new" href="https://www.rotterdam.nl">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
              </Icon>
              De Gemeente Rotterdam
            </Link>
          </span>{" "}
          en{" "}
          <span>
            <Link target="_new" href="https://www.conduction.nl">
              <Icon className="utrecht-icon--conduction-start">
                <IconExternalLink />
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
        </Paragraph>
      </section>
    </Container>
  );
};
