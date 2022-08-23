import * as React from "react";
import * as styles from "./TableResultTemplate.module.css";
import { Link } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import _ from "lodash";
import { ToolTip } from "../../../../components/toolTip/ToolTip";
import { Tag } from "../../../../components/tag/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat, faT } from "@fortawesome/free-solid-svg-icons";
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
              <div
                className={clsx(styles[_.camelCase(t(`${component.embedded?.nl.embedded.commonground.layerType}`))])}
              >
                <ToolTip tooltip="Laag">
                  <Tag
                    layoutClassName={styles.tagWidth}
                    content={{
                      icon: <FontAwesomeIcon icon={faLayerGroup} />,
                      tag: _.upperFirst(t(`${component.embedded?.nl.embedded.commonground.layerType}` ?? "Onbekend")),
                    }}
                  />
                </ToolTip>
              </div>
            </TableCell>

            <TableCell>
              <ToolTip tooltip="Status">
                <Tag
                  layoutClassName={styles.tagWidth}
                  content={{
                    icon: <FontAwesomeIcon icon={faInfoCircle} />,
                    tag: _.upperFirst(component.developmentStatus ?? "Onbekend"),
                  }}
                />
              </ToolTip>
            </TableCell>

            <TableCell>
              <ToolTip tooltip="Type">
                <Tag
                  content={{
                    tag: _.upperFirst(component.softwareType ?? "Onbekend"),
                  }}
                />
              </ToolTip>
            </TableCell>

            <TableCell>
              <ToolTip tooltip="Organisatie">
                <Tag
                  content={{
                    icon: <FontAwesomeIcon icon={faHouse} />,
                    tag: _.upperFirst(component.embedded?.legal?.embedded?.repoOwner.name ?? "Onbekend"),
                  }}
                />
              </ToolTip>
            </TableCell>

            <TableCell>
              <ToolTip tooltip="Installaties">
                <Tag
                  content={{
                    icon: <FontAwesomeIcon icon={faRepeat} />,
                    tag: _.upperFirst(component.usedBy?.length ?? 0),
                  }}
                />
              </ToolTip>
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
