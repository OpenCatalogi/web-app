import * as React from "react";
import * as styles from "./AdminUserTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading1 } from "@gemeente-denhaag/components-react";
import { AdminTemplate } from "../../templateParts/adminTemplate/AdminTemplate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { t } from "i18next";
import { navigate } from "gatsby";
import clsx from "clsx";
import _ from "lodash";
import { ToolTip } from "../../../components/toolTip/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "../../../components/tag/Tag";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { TEMPORARY_USERS } from "../../../data/users";

export const AdminUserTemplate: React.FC = () => {
  const users = TEMPORARY_USERS;

  return (
    <AdminTemplate>
      <Container>
        <section className={styles.section}>
          <Heading1>Users</Heading1>
        </section>
        <section className={styles.section}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>{t("Name")}</TableHeader>
                <TableHeader>{t("Lastname")}</TableHeader>
                <TableHeader>{t("Telephone number")}</TableHeader>
                <TableHeader>{t("Email")}</TableHeader>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow className={styles.tableRow} key={user.id} onClick={() => navigate(`/admin/users/${user.id}`)}>
                  <TableCell>
                    <span>{user.name}</span>
                  </TableCell>

                  <TableCell>
                    <span>{user.lastname}</span>
                  </TableCell>

                  <TableCell>
                    <span>{user.telephone}</span>
                  </TableCell>

                  <TableCell>
                    <span>{user.email}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </Container>
    </AdminTemplate>
  );
};
