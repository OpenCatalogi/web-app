import * as React from "react";
import * as styles from "./AdminSourcesTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading1 } from "@gemeente-denhaag/components-react";
import { AdminTemplate } from "../../templateParts/adminTemplate/AdminTemplate";

export const AdminSourcesTemplate: React.FC = () => {
  return (
    <AdminTemplate>
      <Container layoutClassName={styles.container}>
        <section className={styles.section}>
          <Heading1>Admin Sources</Heading1>
        </section>
      </Container>
    </AdminTemplate>
  );
};
