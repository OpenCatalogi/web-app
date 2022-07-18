import * as React from "react";
import * as styles from "./TableResultTemplate.module.css";
import _ from "lodash";
import { Tag } from "@conduction/components";
import { Link } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";

interface LayersResultTemplateProps {
  components: any[];
}

export const TableResultTemplate: React.FC<LayersResultTemplateProps> = ({ components }) => {

  const { t } = useTranslation();

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHeader>{t("Name")}</TableHeader>
          <TableHeader>{t("Status")}</TableHeader>
          <TableHeader>{t("Type")}</TableHeader>
          <TableHeader>{t("Layer")}</TableHeader>
          <TableHeader>{t("Organisation")}</TableHeader>
          <TableHeader>{t( "Installations")}</TableHeader>
          <TableHeader />
        </TableRow>
        {components.map((component) => (
          <TableRow className={styles.ContentRow} key={component.id}>
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
              <Tag tag={t("Organisation")} />
            </TableCell>

            <TableCell>
              <Tag tag={component.usedBy ? component.usedBy.length : 0}  />
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
