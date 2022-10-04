import * as React from "react";
import * as styles from "./AdminUserTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading1 } from "@gemeente-denhaag/components-react";
import { AdminTemplate } from "../../templateParts/adminTemplate/AdminTemplate";

export const AdminUserTemplate: React.FC = () => {
  return (
    <AdminTemplate>
      <Container>
        <section className={styles.section}>
          <Heading1>User</Heading1>
        </section>
      </Container>
    </AdminTemplate>
  );
};
