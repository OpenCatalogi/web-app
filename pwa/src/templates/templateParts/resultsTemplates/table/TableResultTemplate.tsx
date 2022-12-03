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

interface LayersResultTemplateProps {
  components: any[];
  hideTableHead?: boolean;
}

export const TableResultTemplate: React.FC<LayersResultTemplateProps> = ({ components, hideTableHead }) => {
  const { t } = useTranslation();
  const { screenSize } = React.useContext(GatsbyContext);

  const _components = components.filter((component) => {
    return component._schema;
  });

  return (
    <div className={styles.tableWrapper}>
      <Table>
        {!hideTableHead && (
          <TableHead>
            <TableRow>
              <TableHeader>{t("Name")}</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>{t("Layer")}</TableHeader>
              {screenSize !== "mobile" && <TableHeader>{t("ComponentType")}</TableHeader>}
              {screenSize === "desktop" && <TableHeader>{t("Status")}</TableHeader>}
              <TableHeader />
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {_components.map((component) => (
            <>
              <TableRow
                className={styles.tableRow}
                key={component.id}
                onClick={() => navigate(`/${getResultsUrl(component._schema.title)}/${component.id}`)}
              >
                <TableCell>
                  <span className={styles.name}>{component.name}</span>
                </TableCell>
                <TableCell>{t(_.upperFirst(component._schema.title))}</TableCell>
                <TableCell>
                  <div className={clsx(styles[_.camelCase(t(`${component.nl?.commonground.layerType} layer`))])}>
                    <ToolTip tooltip="Laag">
                      <Tag
                        layoutClassName={styles.tagWidth}
                        label={t(
                          _.upperFirst(
                            component._schema.title === "Component"
                              ? component.nl?.commonground.layerType ?? "Onbekend"
                              : "N.V.T.",
                          ),
                        )}
                        icon={component._schema.title === "Component" ? <FontAwesomeIcon icon={faLayerGroup} /> : <></>}
                      />
                    </ToolTip>
                  </div>
                </TableCell>

                {screenSize !== "mobile" && (
                  <TableCell>
                    <ToolTip tooltip="Component Type">
                      <Tag
                        label={_.upperFirst(
                          component._schema.title === "Component" ? component.softwareType ?? "Onbekend" : "N.V.T.",
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
                            component._schema.title === "Component"
                              ? component.developmentStatus ?? "Onbekend"
                              : "N.V.T.",
                          ),
                        )}
                        icon={component._schema.title === "Component" ? <FontAwesomeIcon icon={faInfoCircle} /> : <></>}
                      />
                    </ToolTip>
                  </TableCell>
                )}

                <TableCell onClick={() => navigate(`/${getResultsUrl(component._schema.title)}/${component.id}`)}>
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
