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
          <TableHeader>{t("Organisation")}</TableHeader>
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
              <Tag tag="Laag" />
            </TableCell>

            <TableCell>
              <Tag tag="Organisatie" />
            </TableCell>
            <TableCell onClick={() => navigate(`/components/${component.id}`)}>
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
