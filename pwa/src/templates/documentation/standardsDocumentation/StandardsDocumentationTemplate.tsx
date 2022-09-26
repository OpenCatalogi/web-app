import * as React from "react";
import * as styles from "./StandardsDocumentationTemplate.module.css";
import { Container } from "@conduction/components";
import {
  Button,
  Heading1,
  Heading3,
  Heading5,
  LeadParagraph,
  Link,
  List,
  ListItem,
  Paragraph,
} from "@gemeente-denhaag/components-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import clsx from "clsx";
import { TEMPORARY_STANDARDS } from "../../../data/standards";
import { ExternalLinkIcon, ArrowRightIcon } from "@gemeente-denhaag/icons";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";

export const StandardsDocumentationTemplate: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <Heading1>Gebruikte standaarden</Heading1>
        <LeadParagraph>
          Dit zijn de standaarden die gebruikt worden door Open Catalogi. Deze standaarden zijn in lijn met de&nbsp;
          <span onClick={() => open("https://forumstandaardisatie.nl/open-standaarden/verplicht")}>
            <Link icon={<ExternalLinkIcon />} iconAlign="start" >verplichte standaarden</Link>
          </span>{" "}
          die aangewezen zijn door de Nederlandse overheid.
        </LeadParagraph>

        <div className={styles.paragraphButtons}>
          <span onClick={() => open("https://forumstandaardisatie.nl/")}>
            <Button icon={<ExternalLinkIcon />} iconAlign="start">
              Forum Standaardisatie
            </Button>
          </span>
          <span onClick={() => open("https://forumstandaardisatie.nl/open-standaarden/verplicht")}>
            <Button icon={<ExternalLinkIcon />} iconAlign="start" variant="secondary-action">
              Verplichte Standaarden
            </Button>
          </span>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.content}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>{t("Standard")}</TableHeader>
                <TableHeader>{t("Type")}</TableHeader>
                <TableHeader>{t("Version")}</TableHeader>
                <TableHeader>{t("Management organization")}</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {TEMPORARY_STANDARDS.map((standard, idx) => (
                <TableRow key={idx}>
                  <TableCell>{standard.name}</TableCell>
                  <TableCell>{standard.type}</TableCell>
                  <TableCell>{standard.versions.join(", ")}</TableCell>
                  <TableCell>{standard.organization}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </Container>
  );
};
