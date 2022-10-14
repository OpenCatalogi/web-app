import * as React from "react";
import * as styles from "./AdminUserDetailTemplate.module.css";
import { Heading1, Link } from "@gemeente-denhaag/components-react";
import { Container } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import _ from "lodash";
import { categories as _categories } from "../../../data/filters";
import { TEMPORARY_USERS } from "../../../data/users";
import { AdminTemplate } from "../../templateParts/adminTemplate/AdminTemplate";

interface AdminUsersDetailTemplateProps {
  userId: string;
}

export const AdminUsersDetailTemplate: React.FC<AdminUsersDetailTemplateProps> = ({ userId }) => {
  const { t } = useTranslation();

  const tempComponent = TEMPORARY_USERS.find((user: any) => user.id === userId) ?? TEMPORARY_USERS[1];

  return (
    <AdminTemplate>
      <Container>
        <div className={styles.backButton} onClick={() => navigate("/admin/users")}>
          <Link icon={<ArrowLeftIcon />} iconAlign="start">
            {t("Back to Users")}
          </Link>
        </div>

        <section>
          <Heading1>{`${tempComponent.name} ${tempComponent.lastname}`}</Heading1>
        </section>
        <section>
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
              <TableRow>
                <TableCell>
                  <span>{tempComponent.name}</span>
                </TableCell>

                <TableCell>
                  <span>{tempComponent.lastname}</span>
                </TableCell>

                <TableCell>
                  <span>{tempComponent.telephone}</span>
                </TableCell>

                <TableCell>
                  <span>{tempComponent.email}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </Container>
    </AdminTemplate>
  );
};
