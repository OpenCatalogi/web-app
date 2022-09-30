import * as React from "react";
import * as styles from "./TableResultTemplate.module.css";
import { Link } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import _ from "lodash";
import { Tag } from "../../../../components/tag/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

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
            <TableHeader>{t("Layer")}</TableHeader>
            <TableHeader>{t("Status")}</TableHeader>
            <TableHeader>{t("Type")}</TableHeader>
            <TableHeader>{t("Organization")}</TableHeader>
            <TableHeader>{t("Installations")}</TableHeader>
            <TableHeader />
          </TableRow>
        </TableHead>
      )}

      <TableBody>
        {components.map((component) => (
          <TableRow
            className={styles.tableRow}
            key={component.id}
            onClick={() => navigate(`/components/${component.id}`)}
          >
            <TableCell>
              <span className={styles.name}>{component.name}</span>
            </TableCell>

            <TableCell>
              <div
                className={clsx(
                  styles[_.camelCase(t(`${component.embedded?.nl.embedded.commonground.layerType} layer`))],
                )}
              >
                <div className={styles.tooltipWrapper} data-tip="Laag">
                  <Tag
                    layoutClassName={styles.tagWidth}
                    label={t(_.upperFirst(component.embedded?.nl.embedded.commonground.layerType ?? "Onbekend"))}
                    icon={<FontAwesomeIcon icon={faLayerGroup} />}
                  />
                </div>
              </div>
            </TableCell>

            <TableCell>
              <div className={styles.tooltipWrapper} data-tip="Status">
                <Tag
                  layoutClassName={styles.tagWidth}
                  label={_.upperFirst(component.developmentStatus ?? "Onbekend")}
                  icon={<FontAwesomeIcon icon={faInfoCircle} />}
                />
              </div>
            </TableCell>

            <TableCell>
              <div className={styles.tooltipWrapper} data-tip="Type">
                <Tag label={_.upperFirst(component.softwareType ?? "Onbekend")} />
              </div>
            </TableCell>

            <TableCell>
              <div className={styles.tooltipWrapper} data-tip="Organisatie">
                <Tag
                  label={_.upperFirst(component.embedded?.legal?.embedded?.repoOwner.name ?? "Onbekend")}
                  icon={<FontAwesomeIcon icon={faHouse} />}
                />
              </div>
            </TableCell>

            <TableCell>
              <div className={styles.tooltipWrapper} data-tip="Installaties">
                <Tag label={_.upperFirst(component.usedBy?.length ?? 0)} icon={<FontAwesomeIcon icon={faRepeat} />} />
              </div>
            </TableCell>

            <TableCell onClick={() => navigate(`/components/${component.id}`)}>
              <Link className={styles.detailsLink} icon={<ArrowRightIcon />} iconAlign="start">
                {t("Details")}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
