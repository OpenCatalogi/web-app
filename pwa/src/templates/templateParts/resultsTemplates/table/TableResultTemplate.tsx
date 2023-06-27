import * as React from "react";
import * as styles from "./TableResultTemplate.module.css";
import _ from "lodash";
import { Icon, StatusBadge, DataBadge } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
} from "@utrecht/component-library-react/dist/css-module";
import { IconArrowRight } from "@tabler/icons-react";
import { ToolTip } from "../../../../components/toolTip/ToolTip";
import clsx from "clsx";
import { getResultsUrl } from "../../../../services/getResultsUrl";
import TableWrapper from "../../../../components/tableWrapper/TableWrapper";
import { getTypeFromSchemaRef } from "../../../../services/getTypeFromSchemaRef";
import { Link } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

interface TableResultTemplateProps {
  components: any[];
  hideTableHead?: boolean;
}

export const TableResultTemplate: React.FC<TableResultTemplateProps> = ({ components, hideTableHead }) => {
  const { t } = useTranslation();

  /**
   * Map component status to `StatusBadge` status
   */
  const getStatus = (description: string) => {
    switch (description) {
      case "Concept":
        return "warning";
      case "Development":
        return "warning";
      case "Beta":
        return "warning";
      case "Bruikbaar":
        return "safe";
      case "Stable":
        return "safe";
      case "Obsolete":
        return "danger";
      default:
        return;
    }
  };

  const ComponentStatusBadge = ({ status }: { status: string }) => {
    const s = getStatus(status);
    return (
      <StatusBadge status={s} className={styles.tagWidth}>
        {s ? (
          <>
            <FontAwesomeIcon icon={faInfoCircle} />{" "}
          </>
        ) : (
          ""
        )}
        {t(status)}
      </StatusBadge>
    );
  };

  return (
    <TableWrapper>
      <Table>
        {!hideTableHead && (
          <TableHeader>
            <TableRow>
              <TableHeaderCell>{t("Name")}</TableHeaderCell>
              <TableHeaderCell>{t("Type")}</TableHeaderCell>
              <TableHeaderCell>{t("Layer")}</TableHeaderCell>
              <TableHeaderCell>{t("Sources")}</TableHeaderCell>
              <TableHeaderCell>{t("Software type")}</TableHeaderCell>
              <TableHeaderCell>{t("Status")}</TableHeaderCell>
              <TableHeader />
            </TableRow>
          </TableHeader>
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
                        <FontAwesomeIcon icon={faLayerGroup} />{" "}
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
                    <ComponentStatusBadge
                      status={_.upperFirst(
                        component._self.schema.ref.includes("component.schema.json")
                          ? component.developmentStatus ?? "Onbekend"
                          : "N.V.T.",
                      )}
                    />
                  </ToolTip>
                </TableCell>

                <TableCell>
                  <Link
                    to={`/${getResultsUrl(component._self?.schema?.ref)}/${component.id}`}
                    className={styles.detailsLink}
                    rel="activate-row"
                  >
                    <Icon className="utrecht-icon--conduction-start">
                      <IconArrowRight />
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
