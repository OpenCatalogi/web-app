import * as React from "react";
import * as styles from "./ComponentResultsTemplate.module.css";
import * as _ from "lodash";
import { RichContentCard, Tag } from "@conduction/components";
import { Card, Link } from "@gemeente-denhaag/components-react";
import { HamburgerIcon, HouseIcon } from "@gemeente-denhaag/icons";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";

interface ComponentsTemplateProps {
  type: string;
  results: any[];
}

export const ComponentResultTemplate: React.FC<ComponentsTemplateProps> = ({ results, type }) => {
  const { t } = useTranslation();

  switch (type) {
    case "table":
      return (
        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>{t("Name")}</TableHeader>
              <TableHeader>{t("Status")}</TableHeader>
              <TableHeader>{t("Type")}</TableHeader>
              <TableHeader>{t("Layer")}</TableHeader>
              <TableHeader>{t("Organisation")}</TableHeader>
              <TableHeader />
            </TableRow>
            {results.map((component) => (
              <TableRow
                key={component.id}
                className={styles.contentRow}
                onClick={() => navigate(`/components/${component.id}`)}
              >
                <TableCell>{component.name}</TableCell>

                <TableCell>
                  <Tag tag={component.developmentStatus} />
                </TableCell>
                <TableCell>
                  <Tag tag={component.softwareType} />
                </TableCell>

                <TableCell>
                  <Tag tag={_.upperFirst(component.intendedAudience)} />
                </TableCell>

                <TableCell>
                  <Tag tag="Conduction" />
                </TableCell>

                <TableCell onClick={() => navigate(`/components/${component.id}`)}>
                  <Link icon={<ArrowRightIcon />} iconAlign="start">
                    {t("Details")}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );

    case "cards":
      return (
        <div className={styles.componentsGrid}>
          {results.map((component) => (
            <RichContentCard
              key={component.id}
              link={{ label: component.name, href: `/components/${component.id}` }}
              labelsWithIcon={[
                { label: _.upperFirst(component.intendedAudience), icon: <HamburgerIcon /> },
                { label: "Conduction", icon: <HouseIcon /> },
              ]}
              tags={[component.developmentStatus, component.softwareType]}
              contentLinks={[
                {
                  title: t("Repository"),
                  subTitle: t("Check out the repository on GitHub"),
                  href: component.isBasedOn,
                },
              ]}
            />
          ))}
        </div>
      );
    case "layer":
      return (
        <div className={styles.componentsGrid}>
          {results.map((component) => (
            <Card
              key={component.id}
              title={component.name}
              date={new Date(component.releaseDate)}
              subTitle={component.intendedAudience}
              onClick={() => navigate(`/components/${component.id}`)}
              variant="case"
            />
          ))}
        </div>
      );
  }
  return <></>;
};
