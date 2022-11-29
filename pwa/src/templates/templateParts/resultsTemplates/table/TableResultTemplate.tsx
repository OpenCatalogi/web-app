import * as React from "react";
import * as styles from "./TableResultTemplate.module.css";
import { Link } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import _ from "lodash";
import { ToolTip } from "../../../../components/toolTip/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Tag } from "@conduction/components";
import { GatsbyContext } from "../../../../context/gatsby";

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
              <TableHeader>Type</TableHeader>
              <TableHeader>{t("Name")}</TableHeader>
              <TableHeader>{t("Layer")}</TableHeader>
              {screenSize !== "mobile" && <TableHeader>{t("Status")}</TableHeader>}
              {screenSize === "desktop" && <TableHeader>{t("ComponentType")}</TableHeader>}
              {screenSize === "desktop" && <TableHeader>{t("Organization")}</TableHeader>}
              {screenSize === "desktop" && <TableHeader>{t("Installations")}</TableHeader>}
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
                onClick={() =>
                  component.catalogusAPI !== undefined
                    ? navigate(`/organizations/${component.id}`)
                    : navigate(`/components/${component.id}`)
                }
              >
                <TableCell>
                  {component.catalogusAPI !== undefined ? <span>Organisatie</span> : <span>Component</span>}
                </TableCell>
                <TableCell>
                  <span className={styles.name}>{component.name}</span>
                </TableCell>

                <TableCell>
                  <div
                    className={clsx(
                      styles[_.camelCase(t(`${component.embedded?.nl?.embedded.commonground.layerType} layer`))],
                    )}
                  >
                    <ToolTip tooltip="Laag">
                      <Tag
                        layoutClassName={styles.tagWidth}
                        label={t(_.upperFirst(component.embedded?.nl?.embedded.commonground.layerType ?? "Onbekend"))}
                        icon={<FontAwesomeIcon icon={faLayerGroup} />}
                      />
                    </ToolTip>
                  </div>
                </TableCell>

                {screenSize !== "mobile" && (
                  <TableCell>
                    <ToolTip tooltip="Status">
                      <Tag
                        layoutClassName={styles.tagWidth}
                        label={t(_.upperFirst(component.developmentStatus ?? "Onbekend"))}
                        icon={<FontAwesomeIcon icon={faInfoCircle} />}
                      />
                    </ToolTip>
                  </TableCell>
                )}

                {screenSize === "desktop" && (
                  <TableCell>
                    <ToolTip tooltip="Type">
                      <Tag label={_.upperFirst(component.softwareType ?? "Onbekend")} />
                    </ToolTip>
                  </TableCell>
                )}

                {screenSize === "desktop" && (
                  <TableCell>
                    <ToolTip tooltip="Organisatie">
                      <Tag
                        label={_.upperFirst(component.embedded?.url?.embedded?.organisation?.name ?? "Onbekend")}
                        icon={<FontAwesomeIcon icon={faHouse} />}
                      />
                    </ToolTip>
                  </TableCell>
                )}

                {screenSize === "desktop" && (
                  <TableCell>
                    <ToolTip tooltip="Installaties">
                      <Tag
                        label={_.upperFirst(component.usedBy?.length ?? 0)}
                        icon={<FontAwesomeIcon icon={faRepeat} />}
                      />
                    </ToolTip>
                  </TableCell>
                )}

                <TableCell onClick={() => navigate(`/components/${component.id}`)}>
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
