import * as React from "react";
import * as styles from "./ApiDocumentationTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading1, LeadParagraph } from "@gemeente-denhaag/components-react";
import { Icon } from "@utrecht/component-library-react/dist/css-module";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";
import { Link } from "../../../components";

export const ApiDocumentationTemplate: React.FC = () => {
  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <Heading1>API Documentatie</Heading1>

        <LeadParagraph>
          Quisque id mi. Vivamus in erat ut urna cursus vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus
          et ultrices posuere cubilia Curae Sed aliquam.{" "}
          <span>
            <Link to="#">
              <Icon className="utrecht-icon--conduction-start">
                <ExternalLinkIcon />
              </Icon>
              Lees meer.
            </Link>
          </span>{" "}
          Nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci.
        </LeadParagraph>
      </section>
    </Container>
  );
};
