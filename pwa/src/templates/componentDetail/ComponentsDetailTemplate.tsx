import * as React from "react";
import * as styles from "./ComponentsDetailTemplate.module.css";
import { Button, Heading1, Link, Paragraph, Tab, TabContext, TabPanel, Tabs } from "@gemeente-denhaag/components-react";
import { Container, InfoCard, Tag } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon, ExternalLinkIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import grey from "../../assets/images/grey.png";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { components as c } from "./../../testData/components";

interface ComponentsDetailTemplateProps {
  componentId: string;
}

export const ComponentsDetailTemplate: React.FC<ComponentsDetailTemplateProps> = ({ componentId }) => {
  const [component] = React.useState<any>(c.find((_c) => _c.id === componentId));
  const [tabSwitch, setTabSwitch] = React.useState<number>(0);
  const { t } = useTranslation();
  const [currentMessagesTab, setCurrentMessagesTab] = React.useState<number>(0);


  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/components")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to components")}
        </Link>
      </div>
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
          <InfoCard title={component.name} content="ipsum dolor sit amet consectetur adipiscing" />
          <InfoCard title="Github" content="Enim blandit volutpat maecenas volutpat blandit" />
          <InfoCard title="Dolor purus non" content="Ultrices eros in cursus turpis massa" />
          <InfoCard title="Nulla posuere" content="Faucibus nisl tincidunt eget nullam non" />
        </div>

        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>Gemma</TableHeader>
              <TableCell>Rhoncus aenean vel elit scelerisque mauris</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>UPL</TableHeader>
              <TableCell>Sit amet nisl suscipit adipiscing bibendum est ultricies</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>Standaarden</TableHeader>
              <TableCell>Dui faucibus in ornare quam viverra orci sagittis</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>Wet en regelgeving</TableHeader>
              <TableCell>Congue quisque egestas diam in arcu cursus euismod</TableCell>
            </TableRow>
          </TableBody>
        </Table>


          <TabContext value={tabSwitch.toString()}>
            <Tabs
              value={tabSwitch}
              onChange={(_, newValue: number) => {
                setTabSwitch(newValue);
              }}
              className={styles.tabs}
              variant="scrollable"
            >
                <Tab label={t("Components")} value={0} />
                <Tab label={t("Dependencies")} value={1} />
                <Tab label={t("Standards")} value={2} />
                <Tab label={t("Suppliers")} value={3} />
                <Tab label={t("Reuse")} value={4} />
                <Tab label={t("Schema's")} value={5} />
                <Tab label={t("Processes")} value={6} />
                <Tab label={t("Products")} value={7} />
            </Tabs>

            <TabPanel value="0">
              Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor. rhoncus.
            </TabPanel>
            <TabPanel value="1">
              Egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc sed blandit libero
              volutpat sed cras ornare.
            </TabPanel>
            <TabPanel value="2">
              sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis
              ultricies
            </TabPanel>
            <TabPanel value="3">
              ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis
            </TabPanel>
            <TabPanel value="4">
              est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa
              tincidunt nunc pulvinar sapien
            </TabPanel>
            <TabPanel value="5">
              amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat
              nisl pretium fusce
            </TabPanel>
            <TabPanel value="6">
              morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra
              pharetra massa massa ultricies
            </TabPanel>
            <TabPanel value="7">
              pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida
              neque convallis a cras
            </TabPanel>
          </TabContext>


      </>
    </Container>
  );
};
