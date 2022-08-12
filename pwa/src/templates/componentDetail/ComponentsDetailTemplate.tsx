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
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, CallIcon, EmailIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import grey from "../../assets/images/grey.png";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { QueryClient } from "react-query";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";
import { TableResultTemplate } from "../templateParts/resultsTemplates/table/TableResultTemplate";
import { TEMPORARY_COMPONENTS } from "../../data/components";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { RatingIndicatorTemplate } from "../templateParts/ratingIndicator/RatingIndicatorTemplate";

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
            <InfoCard title="" content={<RatingIndicatorTemplate component={_getComponent.data} />} />
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
                <Tab className={styles.tab} label="Componenten & Afhankelijkheden" value={0} />
                <Tab className={styles.tab} label={t("Standards")} value={1} />
                <Tab className={styles.tab} label={t("Suppliers")} value={2} />
                <Tab className={styles.tab} label={t("Reuse")} value={3} />
                <Tab className={styles.tab} label={t("Schema's")} value={4} />
                <Tab className={styles.tab} label={t("Processes")} value={5} />
                <Tab className={styles.tab} label={t("Products")} value={6} />
              </Tabs>

              <div className={styles.panels}>
                <TabPanel className={styles.tabPanel} value="0">
                  <TableResultTemplate components={TEMPORARY_COMPONENTS.slice(1, 5)} hideTableHead />
                </TabPanel>

                <TabPanel className={styles.tabPanel} value="1">
                  Op dit moment zijn er geen standaarden beschikbaar.
                </TabPanel>

                <TabPanel className={styles.tabPanel} value="2">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableHeader>Gemeente Rotterdam</TableHeader>
                        <TableCell>
                          <Link icon={<GitHubLogo />} iconAlign="start">
                            Componenten GitHub
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link icon={<CallIcon />} iconAlign="start">
                            010 - 123 456 7
                          </Link>
                        </TableCell>

                        <TableCell
                          className={styles.details}
                          onClick={() => navigate("/organizations/5b9e0b17-00ca-433c-961b-913270643e6d")}
                        >
                          <Link icon={<ArrowRightIcon />} iconAlign="start">
                            {t("Details")}
                          </Link>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableHeader>Conduction</TableHeader>
                        <TableCell>
                          <Link icon={<GitHubLogo />} iconAlign="start">
                            Componenten GitHub
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link icon={<CallIcon />} iconAlign="start">
                            020 - 123 456 7
                          </Link>
                        </TableCell>

                        <TableCell
                          className={styles.details}
                          onClick={() => navigate("/organizations/5b9e0b17-00ca-433c-961b-913270643e6d")}
                        >
                          <Link icon={<ArrowRightIcon />} iconAlign="start">
                            {t("Details")}
                          </Link>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableHeader>Gemeente Utrecht</TableHeader>
                        <TableCell>
                          <Link icon={<GitHubLogo />} iconAlign="start">
                            Componenten GitHub
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link icon={<CallIcon />} iconAlign="start">
                            030 - 123 456 7
                          </Link>
                        </TableCell>

                        <TableCell
                          className={styles.details}
                          onClick={() => navigate("/organizations/5b9e0b17-00ca-433c-961b-913270643e6d")}
                        >
                          <Link icon={<ArrowRightIcon />} iconAlign="start">
                            {t("Details")}
                          </Link>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>

                <TabPanel className={styles.tabPanel} value="3">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableHeader>Gemeente Amsterdam</TableHeader>
                        <TableCell>
                          <Link icon={<GitHubLogo />} iconAlign="start">
                            Componenten GitHub
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link icon={<CallIcon />} iconAlign="start">
                            020 - 123 456 7
                          </Link>
                        </TableCell>

                        <TableCell
                          className={styles.details}
                          onClick={() => navigate("/organizations/5b9e0b17-00ca-433c-961b-913270643e6d")}
                        >
                          <Link icon={<ArrowRightIcon />} iconAlign="start">
                            {t("Details")}
                          </Link>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Gemeente Rotterdam</TableHeader>
                        <TableCell>
                          <Link icon={<GitHubLogo />} iconAlign="start">
                            Componenten GitHub
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link icon={<CallIcon />} iconAlign="start">
                            010 - 123 456 7
                          </Link>
                        </TableCell>

                        <TableCell
                          className={styles.details}
                          onClick={() => navigate("/organizations/5b9e0b17-00ca-433c-961b-913270643e6d")}
                        >
                          <Link icon={<ArrowRightIcon />} iconAlign="start">
                            {t("Details")}
                          </Link>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableHeader>Gemeente Waterland</TableHeader>
                        <TableCell>
                          <Link icon={<GitHubLogo />} iconAlign="start">
                            Componenten GitHub
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link icon={<CallIcon />} iconAlign="start">
                            030 - 123 456 7
                          </Link>
                        </TableCell>

                        <TableCell
                          className={styles.details}
                          onClick={() => navigate("/organizations/5b9e0b17-00ca-433c-961b-913270643e6d")}
                        >
                          <Link icon={<ArrowRightIcon />} iconAlign="start">
                            {t("Details")}
                          </Link>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>

                <TabPanel className={styles.tabPanel} value="4">
                  <TableResultTemplate components={TEMPORARY_COMPONENTS.slice(0, 1)} hideTableHead />
                </TabPanel>
                <TabPanel className={styles.tabPanel} value="5">
                  <TableResultTemplate components={TEMPORARY_COMPONENTS.slice(1, 3)} hideTableHead />
                </TabPanel>

                <TabPanel className={styles.tabPanel} value="6">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableHeader>Adoptie aangifte</TableHeader>
                        <TableCell>Artikel 2.38 Wet basisregistratie personen</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Adoptie- of pleegzorguitkering</TableHeader>
                        <TableCell>Artikel 3:9 Wet arbeid en zorg</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Adoptieherroeping</TableHeader>
                        <TableCell>Artikel 231 Burgerlijk Wetboek Boek 1</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>
              </div>
            </TabContext>
          </div>
        </>
      )}
      {_getComponent.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
