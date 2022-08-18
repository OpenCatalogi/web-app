import * as React from "react";
import * as styles from "./TableResultTemplate.module.css";
import { Tag } from "@conduction/components";
import { Link } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import _ from "lodash";

interface LayersResultTemplateProps {
  components: any[];
  hideTableHead?: boolean;
}

export const TableResultTemplate: React.FC<LayersResultTemplateProps> = ({ components, hideTableHead }) => {
  const { t } = useTranslation();

  return (
    <Table>
      {!hideTableHead && (
        <TableHead>
          <TableRow>
            <TableHeader>{t("Name")}</TableHeader>
            <TableHeader>{t("Status")}</TableHeader>
            <TableHeader>{t("Type")}</TableHeader>
            <TableHeader>{t("Layer")}</TableHeader>
            <TableHeader>{t("Organisation")}</TableHeader>
            <TableHeader>{t("Installations")}</TableHeader>
            <TableHeader />
          </TableRow>
        </TableHead>
      )}

      <TableBody>
        {components.map((component) => (
          <TableRow key={component.id}>
            <TableCell>
              <span className={styles.name}>{component.name}</span>
            </TableCell>

            <TableCell>
              <Tag tag={_.upperFirst(component.developmentStatus)} />
            </TableCell>

            <TableCell>
              <Tag tag={component.softwareType} />
            </TableCell>

            <TableCell>
              <Tag tag={_.upperFirst(component.embedded?.nl.embedded.commonground.layerType)} />
            </TableCell>

            <TableCell>
              <Tag tag={component.embedded?.legal?.embedded?.repoOwner.name ?? "Onbekend"} />
            </TableCell>

            <TableCell>
              <Tag tag={component.usedBy ? component.usedBy.length() : 0} />
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
