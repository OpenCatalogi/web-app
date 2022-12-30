import * as React from "react";
import * as styles from "./TableResultTemplate.module.css";
import _ from "lodash";
import { Link } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { ToolTip } from "../../../../components/toolTip/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Tag } from "@conduction/components";
import { GatsbyContext } from "../../../../context/gatsby";
import { getResultsUrl } from "../../../../services/getResultsUrl";
import { GitHubLogo } from "../../../../assets/svgs/GitHub";
import { GitLabLogo } from "../../../../assets/svgs/GitLab";
import { getTypeFromSchemaRef } from "../../../../services/getTypeFromSchemaRef";

interface LayersResultTemplateProps {
  components: any[];
  hideTableHead?: boolean;
}

export const TableResultTemplate: React.FC<LayersResultTemplateProps> = ({ components, hideTableHead }) => {
  const { t } = useTranslation();
  const { screenSize } = React.useContext(GatsbyContext);

  return (
    <div className={styles.tableWrapper}>
      <Table>
        {!hideTableHead && (
          <TableHead>
            <TableRow>
              <TableHeader>{t("Name")}</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>{t("Layer")}</TableHeader>
              <TableHeader>{t("Sources")}</TableHeader>
              {screenSize !== "mobile" && <TableHeader>{t("ComponentType")}</TableHeader>}
              {screenSize === "desktop" && <TableHeader>{t("Status")}</TableHeader>}
              <TableHeader />
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {components.map((component) => (
            <>
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
                  <div className={clsx(styles[_.camelCase(t(`${component.nl?.commonground.layerType} layer`))])}>
                    <ToolTip tooltip={t("Layer")}>
                      <Tag
                        layoutClassName={styles.tagWidth}
                        label={t(
                          _.upperFirst(
                            component._self.schema.ref === "https://opencatalogi.nl/component.schema.json"
                              ? component.nl?.commonground.layerType ?? t("Unknown")
                              : "N.V.T.",
                          ),
                        )}
                        icon={
                          component._self.schema.ref === "https://opencatalogi.nl/component.schema.json" ? (
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
                        component.url?._self?.properties?.source
                          ? component.url?._self?.properties?.source?.value !== null
                            ? component.url?._self?.properties?.source?.value
                            : "Onbekend"
                          : "N.V.T.",
                      )}
                      icon={
                        component.url?._self?.properties?.source?.value ? (
                          component.url?._self?.properties?.source?.value === "github" ? (
                            <GitHubLogo />
                          ) : (
                            <GitLabLogo />
                          )
                        ) : (
                          <></>
                        )
                      }
                    />
                  </ToolTip>
                </TableCell>

                {screenSize !== "mobile" && (
                  <TableCell>
                    <ToolTip tooltip="Component Type">
                      <Tag
                        label={_.upperFirst(
                          component.url?._self?.title ??
                            component._self.schema.ref === "https://opencatalogi.nl/component.schema.json"
                            ? component.softwareType ?? "Onbekend"
                            : "N.V.T.",
                        )}
                      />
                    </ToolTip>
                  </TableCell>
                )}

                {screenSize === "desktop" && (
                  <TableCell>
                    <ToolTip tooltip="Status">
                      <Tag
                        layoutClassName={styles.tagWidth}
                        label={t(
                          _.upperFirst(
                            component.url?._self?.title ??
                              component._self.schema.ref === "https://opencatalogi.nl/component.schema.json"
                              ? component.developmentStatus ?? "Onbekend"
                              : "N.V.T.",
                          ),
                        )}
                        icon={
                          component.url?._self?.title ??
                          component._self.schema.ref === "https://opencatalogi.nl/component.schema.json" ? (
                            <FontAwesomeIcon icon={faInfoCircle} />
                          ) : (
                            <></>
                          )
                        }
                      />
                    </ToolTip>
                  </TableCell>
                )}

                <TableCell
                  onClick={() =>
                    navigate(`/${getResultsUrl(component._self?.title ?? component.url._self.title)}/${component.id}`)
                  }
                >
                  <Link className={styles.detailsLink} icon={<ArrowRightIcon />} iconAlign="start">
                    {t("Details")}
                  </Link>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
