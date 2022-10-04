import * as React from "react";
import * as styles from "./AdminDashboardTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading1 } from "@gemeente-denhaag/components-react";
import { AdminTemplate } from "../../templateParts/adminTemplate/AdminTemplate";

export const AdminDashboardTemplate: React.FC = () => {
  return (
    <AdminTemplate>
      <Container>
        <section className={styles.section}>
          <Heading1>Dashboard</Heading1>
        </section>
      </Container>
    </AdminTemplate>
  );
};
