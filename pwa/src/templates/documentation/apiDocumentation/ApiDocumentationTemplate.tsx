import * as React from "react";
import * as styles from "./ApiDocumentationTemplate.module.css";
import { Container } from "@conduction/components";
import { navigate } from "gatsby";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";
import { Document, Heading1, Link, PageContent, Paragraph } from "@utrecht/component-library-react";

export const ApiDocumentationTemplate: React.FC = () => {
  return (
    <Document layoutClassName={styles.container}>
      <PageContent>
        <section className={styles.section}>
          <Heading1>API Documentatie</Heading1>

          <Paragraph lead>
            Quisque id mi. Vivamus in erat ut urna cursus vestibulum. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae Sed aliquam.{" "}
            <span
              onClick={() => {
                navigate("#");
              }}
            >
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                Lees meer.
              </Link>
            </span>{" "}
            Nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci.
          </Paragraph>
        </section>
      </PageContent>
    </Document>
  );
};
