import * as React from "react";
import * as styles from "./ComponentsDetailTemplate.module.css";
import { Button, Heading1, Link, Paragraph, Tab, TabContext, TabPanel, Tabs } from "@gemeente-denhaag/components-react";
import { Container, InfoCard, Tag } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon, ExternalLinkIcon } from "@gemeente-denhaag/icons";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import grey from "../../assets/images/grey.png";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { ArrowLeftIcon, ArrowRightIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import { components as c } from "./../../testData/components";


interface ComponentsDetailTemplateProps {
  componentId: string;
}

export const ComponentsDetailTemplate: React.FC<ComponentsDetailTemplateProps> = ({ componentId }) => {
  const [component] = React.useState<any>(c.find((_c) => _c.id === componentId));
  const { t } = useTranslation();

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/components")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to components")}
        </Link>
      </div>


      {!getComponents.isLoading && component && (
        <>
          <div className={styles.heading}>
            <div className={styles.context}>
               <Heading1>{component.name}</Heading1>
           <span className={styles.subtitle}>Phasellus tempus. Aenean vulputate eleifend tellus. Sed a libero.</span>
            <Paragraph className={styles.description}>{component.description}</Paragraph>
              <div className={styles.tags}>
          <Tag tag={component.layer} />
          <Tag tag={component.status} />
        </div>
            </div>

            <div className={styles.addToCatalogusContainer}>
              <img src={grey} className={styles.img} />
              <Button icon={<ExternalLinkIcon />}>Toevoegen aan catalogus</Button>
            </div>
          </div>

          <div className={styles.cards}>
            <InfoCard title={component.name} content="Information for install component" />
            <InfoCard title="Github" content="Repo en links" />
            <InfoCard title="DummyData" content="Information for DummyData " />
            <InfoCard title="DummyData" content="Information for DummyData " />
          </div>

          <Table>
            <TableBody>
              <TableRow>
                <TableHeader>Gemma</TableHeader>
                <TableCell>Info gemma</TableCell>
              </TableRow>
              <TableRow>
                <TableHeader>UPL</TableHeader>
                <TableCell>Info UPL</TableCell>
              </TableRow>
              <TableRow>
                <TableHeader>Standaarden</TableHeader>
                <TableCell>Lorem ipsum</TableCell>
              </TableRow>
              <TableRow>
                <TableHeader>Wet en regelgeving</TableHeader>
                <TableCell>Lorem ipsum</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div>
            <TabContext value={component.toString()}>
              <Tabs
                scrollButtons={"on"}
                value={component}
                onChange={(_, newValue: number) => {
                  setComponent(newValue);
                }}
              >
                <div className={styles.tabs}>
                  <Tab label={t("Components")} value={0} />
                  <Tab label={t("Dependencies")} value={1} />
                  <Tab label={t("Standards")} value={2} />
                  <Tab label={t("Suppliers")} value={3} />
                  <Tab label={t("Reuse")} value={4} />
                  <Tab label={t("Schema's")} value={5} />
                  <Tab label={t("Processes")} value={6} />
                  <Tab label={t("Products")} value={7} />
                </div>
              </Tabs>

              <TabPanel value="0">Lorem ipsum</TabPanel>
              <TabPanel value="1">Lorem ipsum</TabPanel>
              <TabPanel value="2">Lorem ipsum</TabPanel>
              <TabPanel value="3">Lorem ipsum</TabPanel>
              <TabPanel value="4">Lorem ipsum</TabPanel>
              <TabPanel value="5">Lorem ipsum</TabPanel>
              <TabPanel value="6">Lorem ipsum</TabPanel>
              <TabPanel value="7">Lorem ipsum</TabPanel>
            </TabContext>
          </div>
        </>
      )}
      <a className={styles.externalLink} href={component.isBasedOn} target="_blank">
        <Link icon={<ArrowRightIcon />} iconAlign="start">
          {t("View component on GitHub")}
        </Link>
      </a>
    </Container>
  );
};
