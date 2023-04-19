import * as React from "react";
import * as styles from "./TableResultTemplate.module.css";
import _ from "lodash";
import { Icon, StatusBadge } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { ToolTip } from "../../../../components/toolTip/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Tag } from "@conduction/components";
import { getResultsUrl } from "../../../../services/getResultsUrl";
import { GitHubLogo } from "../../../../assets/svgs/GitHub";
import { GitLabLogo } from "../../../../assets/svgs/GitLab";
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
            components.map((component) => {
              const componentStatus = _.upperFirst(
                component._self.schema.ref.includes("component.schema.json")
                  ? component.developmentStatus ?? "Onbekend"
                  : "N.V.T.",
              );

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

              return (
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
                        <Tag
                          layoutClassName={styles.tagWidth}
                          label={t(
                            _.upperFirst(
                              component._self.schema.ref.includes("component.schema.json")
                                ? component.embedded?.nl?.embedded?.commonground.layerType ?? t("Unknown")
                                : "N.V.T.",
                            ),
                          )}
                          icon={
                            component._self.schema.ref.includes("component.schema.json") ? (
                              <FontAwesomeIcon icon={faLayerGroup} />
                            ) : (
                              <></>
                            )
                          }
                        />
                      </ToolTip>
                    </div>
                  </TableCell>

                  <TableCell>
                    <ToolTip tooltip={t("Sources")}>
                      <Tag
                        layoutClassName={styles.tagWidth}
                        label={_.upperFirst(
                          component._self?.synchronizations
                            ? component._self?.synchronizations?.length
                              ? component._self?.synchronizations?.at(-1)?.gateway.name
                              : "Onbekend"
                            : "N.V.T.",
                        )}
                        icon={
                          component._self?.synchronizations?.length ? (
                            component._self?.synchronizations?.at(-1)?.gateway.name === "github" ? (
                              <GitHubLogo />
                            ) : component._self?.synchronizations?.at(-1)?.gateway.name === "gitlab" ? (
                              <GitLabLogo />
                            ) : (
                              <></>
                            )
                          ) : (
                            <></>
                          )
                        }
                      />
                    </ToolTip>
                  </TableCell>

                  <TableCell>
                    <ToolTip tooltip="Component Type">
                      <Tag
                        label={_.upperFirst(
                          component._self.schema.ref.includes("component.schema.json")
                            ? component.softwareType ?? "Onbekend"
                            : "N.V.T.",
                        )}
                      />
                    </ToolTip>
                  </TableCell>

                  <TableCell>
                    <ToolTip tooltip="Status">
                      <StatusBadge status={getStatus(componentStatus)} className={styles.tagWidth}>
                        {t(componentStatus)}
                      </StatusBadge>
                      {/* <Tag
                      layoutClassName={styles.tagWidth}
                      label={t(
                        _.upperFirst(
                          component._self.schema.ref.includes("component.schema.json")
                            ? component.developmentStatus ?? "Onbekend"
                            : "N.V.T.",
                        ),
                      )}
                      icon={
                        component._self.schema.ref.includes("component.schema.json") ? (
                          <FontAwesomeIcon icon={faInfoCircle} />
                        ) : (
                          <></>
                        )
                      }
                    /> */}
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
              );
            })}

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
