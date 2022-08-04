import * as React from "react";
import * as styles from "./ComponentsDetailTemplate.module.css";
import {
  Button,
  Heading1,
  LeadParagraph,
  Link,
  Tab,
  TabContext,
  TabPanel,
  Tabs,
} from "@gemeente-denhaag/components-react";
import { Container, InfoCard, Tag } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import grey from "../../assets/images/grey.png";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { QueryClient } from "react-query";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";

interface ComponentsDetailTemplateProps {
  componentId: string;
}

export const ComponentsDetailTemplate: React.FC<ComponentsDetailTemplateProps> = ({ componentId }) => {
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const { t } = useTranslation();

  const queryClient = new QueryClient();

  const _useComponent = useComponent(queryClient);
  const _getComponent = _useComponent.getOne(componentId);

  if (_getComponent.isError) return <>Something went wrong...</>;

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/components")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to components")}
        </Link>
      </div>

      {_getComponent.isSuccess && (
        <>
          <div className={styles.headingContainer}>
            <div>
              <Heading1>{_getComponent.data.name}</Heading1>

              <LeadParagraph className={styles.description}>
                Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl
                consectetur et.
              </LeadParagraph>

              <LeadParagraph className={styles.description}>
                Dit component wordt aangeboden door{" "}
                <span onClick={() => navigate("/organizations/f9d9190e-74f0-4e91-a5d8-0f0e6dad2bd0")}>
                  <Link icon={<ArrowRightIcon />} iconAlign="start">
                    Gemeente Rotterdam
                  </Link>
                </span>
              </LeadParagraph>

              <div className={styles.tags}>
                <Tag tag="layer" />
                <Tag tag={_getComponent.data.developmentStatus} />
              </div>
            </div>

            <div className={styles.addToCatalogusContainer}>
              <img src={grey} className={styles.componentImg} />
              <Button icon={<ExternalLinkIcon />}>Toevoegen aan catalogus</Button>
            </div>
          </div>

          <div className={styles.cardsContainer}>
            <InfoCard title="Organisatie" content="ipsum dolor sit amet consectetur adipiscing" />
            <InfoCard title="Github" content="Enim blandit volutpat maecenas volutpat blandit" />
            <InfoCard title="Dolor purus non" content="Ultrices eros in cursus turpis massa" />
            <InfoCard title="Nulla posuere" content="Faucibus nisl tincidunt eget nullam non" />
          </div>

          <div>
            <h2>Magna ullamcorper ultricies</h2>

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
          </div>

          <div>
            <h2>Magna ullamcorper ultricies</h2>

            <TabContext value={currentTab.toString()}>
              <Tabs
                value={currentTab}
                onChange={(_, newValue: number) => {
                  setCurrentTab(newValue);
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

              <TabPanel className={styles.tabPanel} value="0">
                Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor.
                rhoncus.
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="1">
                Egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc sed blandit libero
                volutpat sed cras ornare.
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="2">
                Sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis
                ultricies
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="3">
                Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="4">
                Est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa
                tincidunt nunc pulvinar sapien
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="5">
                Amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec
                feugiat nisl pretium fusce
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="6">
                Morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra
                pharetra massa massa ultricies
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="7">
                Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida
                neque convallis a cras
              </TabPanel>
            </TabContext>
          </div>
        </>
      )}

      {_getComponent.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
