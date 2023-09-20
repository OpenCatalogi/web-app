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
import clsx from "clsx";
import { getResultsUrl } from "../../../../services/getResultsUrl";
import { getTypeFromSchemaRef } from "../../../../services/getTypeFromSchemaRef";
import { Link } from "../../../../components";
import { TableWrapper } from "@conduction/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { TOOLTIP_ID } from "../../../../layout/Layout";
import { GatsbyContext } from "../../../../context/gatsby";

interface TableResultTemplateProps {
  components: any[];
  hideTableHead?: boolean;
}

export const TableResultTemplate: React.FC<TableResultTemplateProps> = ({ components, hideTableHead }) => {
  const { t } = useTranslation();
  const { screenSize } = React.useContext(GatsbyContext);

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
      <StatusBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Status" status={s} className={styles.tagWidth}>
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
    <TableWrapper touchScreen={screenSize === "tablet" || screenSize === "mobile"}>
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
                    <DataBadge
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content={t("Layer")}
                      className={styles.tagWidth}
                    >
                      <FontAwesomeIcon icon={faLayerGroup} />{" "}
                      {t(
                        _.upperFirst(
                          component._self.schema.ref.includes("component.schema.json")
                            ? component.embedded?.nl?.embedded?.commonground.layerType ?? t("Unknown")
                            : "N.V.T.",
                        ),
                      )}
                    </DataBadge>
                  </div>
                </TableCell>

                <TableCell>
                  <DataBadge
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content={t("Sources")}
                    className={styles.tagWidth}
                  >
                    {_.upperFirst(
                      component._self?.synchronizations
                        ? component._self?.synchronizations?.length
                          ? component._self?.synchronizations?.at(-1)?.source.name
                          : "Onbekend"
                        : "N.V.T.",
                    )}
                  </DataBadge>
                </TableCell>

                <TableCell>
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Component Type">
                    {_.upperFirst(
                      component._self.schema.ref.includes("component.schema.json")
                        ? component.softwareType ?? "Onbekend"
                        : "N.V.T.",
                    )}
                  </DataBadge>
                </TableCell>

                <TableCell>
                  <ComponentStatusBadge
                    status={_.upperFirst(
                      component._self.schema.ref.includes("component.schema.json")
                        ? component.developmentStatus ?? "Onbekend"
                        : "N.V.T.",
                    )}
                  />
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
