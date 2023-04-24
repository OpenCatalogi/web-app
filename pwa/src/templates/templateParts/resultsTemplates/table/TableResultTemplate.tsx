import * as React from "react";
import * as styles from "./TableResultTemplate.module.css";
import _ from "lodash";
import { Icon, DataBadge } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { ToolTip } from "../../../../components/toolTip/ToolTip";
import clsx from "clsx";
import { getResultsUrl } from "../../../../services/getResultsUrl";
import TableWrapper from "../../../../components/tableWrapper/TableWrapper";
import { getTypeFromSchemaRef } from "../../../../services/getTypeFromSchemaRef";
import { Link } from "../../../../components";

interface LayersResultTemplateProps {
  components: any[];
  hideTableHead?: boolean;
}

export const TableResultTemplate: React.FC<LayersResultTemplateProps> = ({ components, hideTableHead }) => {
  const { t } = useTranslation();

  return (
    <TableWrapper>
      <Table>
        {!hideTableHead && (
          <TableHead>
            <TableRow>
              <TableHeader>{t("Name")}</TableHeader>
              <TableHeader>{t("Type")}</TableHeader>
              <TableHeader>{t("Layer")}</TableHeader>
              <TableHeader>{t("Sources")}</TableHeader>
              <TableHeader>{t("ComponentType")}</TableHeader>
              <TableHeader>{t("Status")}</TableHeader>
              <TableHeader />
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {components.length > 0 &&
            components.map((component) => (
              <TableRow
                className={styles.tableRow}
                key={component.id}
                onClick={() => navigate(`/${getResultsUrl(component._self?.schema.ref)}/${component.id}`)}
              >
                <TableCell>
                  <span className={styles.name}>{component.name}</span>
                </TableCell>
                <TableCell>{t(_.upperFirst(getTypeFromSchemaRef(component._self?.schema.ref)))}</TableCell>
                <TableCell>
                  <div
                    className={clsx(
                      styles[
                        _.camelCase(
                          t(
                            `${
                              (component._self.schema.ref.includes("component.schema.json") &&
                                component.embedded?.nl?.embedded?.commonground?.layerType) ??
                              "Unknown"
                            } layer`,
                          ),
                        )
                      ],
                    )}
                  >
                    <ToolTip tooltip={t("Layer")}>
                      <DataBadge className={styles.tagWidth}>
                        {t(
                          _.upperFirst(
                            component._self.schema.ref.includes("component.schema.json")
                              ? component.embedded?.nl?.embedded?.commonground.layerType ?? t("Unknown")
                              : "N.V.T.",
                          ),
                        )}
                      </DataBadge>
                    </ToolTip>
                  </div>
                </TableCell>

                <TableCell>
                  <ToolTip tooltip={t("Sources")}>
                    <DataBadge className={styles.tagWidth}>
                      {_.upperFirst(
                        component._self?.synchronizations
                          ? component._self?.synchronizations?.length
                            ? component._self?.synchronizations?.at(-1)?.gateway.name
                            : "Onbekend"
                          : "N.V.T.",
                      )}
                    </DataBadge>
                  </ToolTip>
                </TableCell>

                <TableCell>
                  <ToolTip tooltip="Component Type">
                    <DataBadge>
                      {_.upperFirst(
                        component._self.schema.ref.includes("component.schema.json")
                          ? component.softwareType ?? "Onbekend"
                          : "N.V.T.",
                      )}
                    </DataBadge>
                  </ToolTip>
                </TableCell>

                <TableCell>
                  <ToolTip tooltip="Status">
                    <DataBadge className={styles.tagWidth}>
                      {t(
                        _.upperFirst(
                          component._self.schema.ref.includes("component.schema.json")
                            ? component.developmentStatus ?? "Onbekend"
                            : "N.V.T.",
                        ),
                      )}
                    </DataBadge>
                  </ToolTip>
                </TableCell>

                <TableCell>
                  <Link
                    to={`/${getResultsUrl(component._self?.schema?.ref)}/${component.id}`}
                    className={styles.detailsLink}
                  >
                    <Icon className="utrecht-icon--conduction-start">
                      <ArrowRightIcon />
                    </Icon>
                    {t("Details")}
                  </Link>
                </TableCell>
              </TableRow>
            ))}

          {!components.length && (
            <TableRow>
              <TableCell>{t("Geen resultaten gevonden")}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};
