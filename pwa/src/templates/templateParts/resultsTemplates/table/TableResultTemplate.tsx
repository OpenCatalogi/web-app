import * as React from "react";
import * as styles from "./TableResultTemplate.module.css";
import _ from "lodash";
import { Icon, StatusBadge, DataBadge, Link } from "@utrecht/component-library-react/dist/css-module";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faLayerGroup, faStar } from "@fortawesome/free-solid-svg-icons";
import { TOOLTIP_ID } from "../../../../layout/Layout";
import { getStatusColor } from "../../../../services/getStatusColor";
import { HorizontalOverflowWrapper } from "@conduction/components";
import { RatingIndicatorTemplate } from "../../ratingIndicator/RatingIndicatorTemplate";

interface TableResultTemplateProps {
  components: any[];
  hideTableHead?: boolean;
}

export const TableResultTemplate: React.FC<TableResultTemplateProps> = ({ components, hideTableHead }) => {
  const { t } = useTranslation();

  return (
    <HorizontalOverflowWrapper
      ariaLabels={{ scrollLeftButton: t("Scroll left"), scrollRightButton: t("Scroll right") }}
    >
      <Table className={styles.table}>
        {!hideTableHead && (
          <TableHeader className={styles.tableHeader}>
            <TableRow>
              <TableHeaderCell>{t("Name")}</TableHeaderCell>
              <TableHeaderCell>{t("Type")}</TableHeaderCell>
              <TableHeaderCell>{t("Layer")}</TableHeaderCell>
              <TableHeaderCell>{t("Sources")}</TableHeaderCell>
              <TableHeaderCell>{t("Software type")}</TableHeaderCell>
              <TableHeaderCell>{t("Status")}</TableHeaderCell>
              <TableHeaderCell>{t("Rating")}</TableHeaderCell>
              <TableHeaderCell />
            </TableRow>
          </TableHeader>
        )}

        <TableBody className={styles.tableBody}>
          {components.length > 0 &&
            components.map((component) => (
              <TableRow
                className={styles.tableRow}
                key={component.id}
                onClick={() => navigate(`/${getResultsUrl(component._self?.schema.ref)}/${component.id}`)}
              >
                <TableCell>
                  <span data-tooltip-id={TOOLTIP_ID} data-tooltip-content={component.name} className={styles.name}>
                    {component.name}
                  </span>
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
                            ? component.embedded?.nl?.embedded?.commonground?.layerType ?? t("Unknown")
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
                  <StatusBadge
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content="Status"
                    status={getStatusColor(_.upperFirst(component.developmentStatus) ?? "Onbekend")}
                    className={styles.tagWidth}
                  >
                    {component._self.schema.ref.includes("component.schema.json") ? (
                      <>
                        <span className={styles.icon}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                        </span>
                        {_.upperFirst(component.developmentStatus ?? "Onbekend")}
                      </>
                    ) : (
                      "N.V.T."
                    )}
                  </StatusBadge>
                </TableCell>

                <TableCell className={styles.ratingTableCell}>
                  {component._self.schema.ref.includes("component.schema.json") ? (
                    component.embedded?.rating?.rating ? (
                      <RatingIndicatorTemplate
                        layoutClassName={styles.ratingIndicatorContainer}
                        maxRating={component.embedded?.rating?.maxRating}
                        rating={component.embedded?.rating?.rating}
                      />
                    ) : (
                      t("No rating available")
                    )
                  ) : (
                    "N.V.T."
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    onClick={() => navigate(`/${getResultsUrl(component._self?.schema?.ref)}/${component.id}`)}
                    className={styles.detailsLink}
                  >
                    <Icon>
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
    </HorizontalOverflowWrapper>
  );
};
