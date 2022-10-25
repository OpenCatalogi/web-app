import * as React from "react";
import * as styles from "./AdminCatalogiTemplate.module.css";
import { Container, Tag } from "@conduction/components";
import { Heading1 } from "@gemeente-denhaag/components-react";
import { AdminTemplate } from "../../templateParts/adminTemplate/AdminTemplate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { t } from "i18next";
import { TEMPORARY_COMPONENTS } from "../../../data/components";
import { navigate } from "gatsby";
import clsx from "clsx";
import _ from "lodash";
import { ToolTip } from "../../../components/toolTip/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faRepeat } from "@fortawesome/free-solid-svg-icons";

export const AdminCatalogiTemplate: React.FC = () => {
  const components = TEMPORARY_COMPONENTS;

  return (
    <AdminTemplate>
      <Container>
        <section className={styles.section}>
          <Heading1>Catalogi</Heading1>
        </section>
        <section className={styles.section}>
          <Table>
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
                      <ToolTip tooltip="Laag">
                        <Tag
                          layoutClassName={styles.tagWidth}
                          label={t(_.upperFirst(component.embedded?.nl.embedded.commonground.layerType ?? "Onbekend"))}
                          icon={<FontAwesomeIcon icon={faLayerGroup} />}
                        />
                      </ToolTip>
                    </div>
                  </TableCell>

                  <TableCell>
                    <ToolTip tooltip="Status">
                      <Tag
                        layoutClassName={styles.tagWidth}
                        label={_.upperFirst(component.developmentStatus ?? "Onbekend")}
                        icon={<FontAwesomeIcon icon={faInfoCircle} />}
                      />
                    </ToolTip>
                  </TableCell>

                  <TableCell>
                    <ToolTip tooltip="Type">
                      <Tag label={_.upperFirst(component.softwareType ?? "Onbekend")} />
                    </ToolTip>
                  </TableCell>

                  <TableCell>
                    <ToolTip tooltip="Organisatie">
                      <Tag label={_.upperFirst("Onbekend")} icon={<FontAwesomeIcon icon={faHouse} />} />
                    </ToolTip>
                  </TableCell>

                  <TableCell>
                    <ToolTip tooltip="Installaties">
                      <Tag
                        label={_.upperFirst(component.usedBy?.length.toString() ?? "0")}
                        icon={<FontAwesomeIcon icon={faRepeat} />}
                      />
                    </ToolTip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </Container>
    </AdminTemplate>
  );
};
