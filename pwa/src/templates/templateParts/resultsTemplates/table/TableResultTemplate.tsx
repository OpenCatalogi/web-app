import * as React from "react";
import * as styles from "./TableResultTemplate.module.css";
import { Tag } from "@conduction/components";
import { Link } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";

interface LayersResultTemplateProps {
  components: any[];
}

export const TableResultTemplate: React.FC<LayersResultTemplateProps> = ({ components }) => {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>{t("Name")}</TableHeader>
          <TableHeader>{t("Status")}</TableHeader>
          <TableHeader>{t("Type")}</TableHeader>
          <TableHeader>{t("Layer")}</TableHeader>
          <TableHeader>{t("Installations")}</TableHeader>
          <TableHeader />
        </TableRow>
      </TableHead>

      <TableBody>
        {components.map((component) => (
          <TableRow key={component.id}>
            <TableCell>{component.name}</TableCell>

            <TableCell>
              <Tag tag={component.developmentStatus} />
            </TableCell>

            <TableCell>
              <Tag tag={component.softwareType} />
            </TableCell>

            <TableCell>
              <Tag tag={t("Layer")} />
            </TableCell>

            <TableCell>
              <Tag tag={component.usedBy ? component.usedBy.length : 0} />
            </TableCell>

            <TableCell className={styles.details} onClick={() => navigate(`/components/${component.id}`)}>
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                {t("Details")}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
