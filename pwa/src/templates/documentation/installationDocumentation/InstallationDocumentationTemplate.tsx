import * as React from "react";
import * as styles from "./InstallationDocumentationTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading1, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";

export const InstallationDocumentationTemplate: React.FC = () => {
  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <Heading1>Installatie Documentatie</Heading1>

        <LeadParagraph>
          Praesent blandit laoreet nibh. Nullam accumsan lorem in dui. Praesent turpis. Nulla sit amet est. Nullam
          accumsan lorem in dui. Ut varius tincidunt libero.{" "}
          <span
            onClick={() => {
              navigate("#");
            }}
          >
            <Link icon={<ExternalLinkIcon />} iconAlign="start">
              Lees meer.
            </Link>
          </span>{" "}
          Aenean commodo ligula eget dolor.
        </LeadParagraph>
      </section>
    </Container>
  );
};
