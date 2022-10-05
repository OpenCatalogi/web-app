import * as React from "react";
import * as styles from "./AdminComponentsTemplate.module.css";
import { Container } from "@conduction/components";
import { Button, Heading1 } from "@gemeente-denhaag/components-react";
import { AdminTemplate } from "../../templateParts/adminTemplate/AdminTemplate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { t } from "i18next";
import _ from "lodash";
import { navigate } from "gatsby";

export const AdminComponentsTemplate: React.FC = () => {
  return (
    <AdminTemplate>
      <Container layoutClassName={styles.container}>
        <section className={styles.section}>
          <Heading1>{t("Components")}</Heading1>
        </section>
        <section className={styles.section}>
          <div className={styles.tableButtons}>
            <Button
              onClick={() => {
                navigate("#");
              }}
            >
              {t("Edit")}
            </Button>
            <Button
              onClick={() => {
                navigate("#");
              }}
            >
              {t("Add")}
            </Button>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>{t("Name")}</TableHeader>
                <TableHeader>{t("Source")}</TableHeader>
                <TableHeader>{t("Last synced")}</TableHeader>
                <TableHeader>{t("Owner")}</TableHeader>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>#</TableCell>
                <TableCell>#</TableCell>
                <TableCell>#</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>#</TableCell>
                <TableCell>#</TableCell>
                <TableCell>#</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </Container>
    </AdminTemplate>
  );
};
