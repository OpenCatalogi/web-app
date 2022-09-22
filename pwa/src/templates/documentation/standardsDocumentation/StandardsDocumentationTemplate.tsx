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
        <LeadParagraph>De standaarden die gebruikt worden door Open Catalogi</LeadParagraph>
      </section>
      <section className={styles.section}>
        <div className={styles.content}>
          <Table className={styles.standardsTable}>
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
                  <TableCell>{standard.version.join(", ")}</TableCell>
                  <TableCell>{standard.organisation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={styles.filters}>
            <div>
              <Heading3>Filters</Heading3>
              <Paragraph>En expoteer:</Paragraph>
              <div className={styles.buttonContainer}>
                <Button>
                  <b>Expoteer naar XML</b>
                </Button>
                <Button>In PDF formaat</Button>
              </div>
            </div>
            <div>
              <Heading5>Domein</Heading5>
              <ul>
                <li>
                  <span
                    onClick={() => {
                      open("https://forumstandaardisatie.nl/open-standaarden/verplicht");
                    }}
                  >
                    <Link icon={<ExternalLinkIcon />} iconAlign={"start"}>
                      - Any -
                    </Link>
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => {
                      open("https://forumstandaardisatie.nl/open-standaarden/verplicht?domein=130");
                    }}
                  >
                    <Link icon={<ExternalLinkIcon />} iconAlign={"start"}>
                      Bouw
                    </Link>
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => {
                      open("https://forumstandaardisatie.nl/open-standaarden/verplicht?domein=128");
                    }}
                  >
                    <Link icon={<ExternalLinkIcon />} iconAlign={"start"}>
                      Document en (web)content
                    </Link>
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => {
                      open("https://forumstandaardisatie.nl/open-standaarden/verplicht?domein=127");
                    }}
                  >
                    <Link icon={<ExternalLinkIcon />} iconAlign={"start"}>
                      E-facturatie en administratie
                    </Link>
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => {
                      navigate("/documentation/usage");
                    }}
                  >
                    <Link icon={<ArrowRightIcon />} iconAlign={"start"}>
                      meer lezen.
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};
