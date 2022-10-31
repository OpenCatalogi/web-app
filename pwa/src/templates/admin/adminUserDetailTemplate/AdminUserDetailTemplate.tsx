import * as React from "react";
import * as styles from "./AdminUserDetailTemplate.module.css";
import {
  Button,
  Heading1,
  Heading2,
  LeadParagraph,
  Link,
  Tab,
  TabContext,
  TabPanel,
  Tabs,
} from "@gemeente-denhaag/components-react";
import { Container, Tag, BadgeCounter } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon, ArrowRightIcon, CallIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { TEMPORARY_COMPONENTS } from "../../../data/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faInfoCircle, faLayerGroup, faRepeat, faScroll } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { ToolTip } from "../../../components/toolTip/ToolTip";
import { TCategories } from "../../../data/categories";
import { categories as _categories } from "../../../data/filters";
import { GitHubLogo } from "../../../assets/svgs/GitHub";
import { DependenciesTemplate } from "../../templateParts/dependenciesTemplates/ComponentDependenciesTemplate";
import { FiltersContext } from "../../../context/filters";
import { ComponentCardsAccordionTemplate } from "../../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";

interface AdminUsersDetailTemplateProps {
  userId: string;
}

export const AdminUsersDetailTemplate: React.FC<AdminUsersDetailTemplateProps> = ({ userId }) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const [filters, setFilters] = React.useContext(FiltersContext);

  const tempComponent =
    TEMPORARY_COMPONENTS.find((component: any) => component.id === userId) ?? TEMPORARY_COMPONENTS[1];

  const TempComponentsDependencies = TEMPORARY_COMPONENTS.slice(1, 9);
  const TempComponentsSchema = TEMPORARY_COMPONENTS.slice(0, 1);
  const TempComponentsProcesses = TEMPORARY_COMPONENTS.slice(11, 15);

  const layer: TCategories = t(_.upperFirst(tempComponent.embedded?.nl.embedded.commonground.layerType));
  //   const category =
  //     layer &&
  //     categories[layer].find((category) => {
  //       return category.value === tempComponent.categories;
  //     });

  //   if (tempComponent.isError) return <>Something went wrong...</>;

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/components")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to components")}
        </Link>
      </div>

      {/* {tempComponent.isSuccess && ( */}
      <>
        <div className={styles.headingContainer}>
          <div className={styles.headingContent}>
            <Heading1>{tempComponent.name}</Heading1>

            <LeadParagraph className={styles.description}>{tempComponent.description}</LeadParagraph>

            <div className={styles.layerAndCategoryContainer}>
              <ToolTip tooltip="Laag">
                <Tag
                  layoutClassName={
                    styles[_.camelCase(t(`${tempComponent.embedded?.nl.embedded.commonground.layerType} layer`))]
                  }
                  label={t(_.upperFirst(tempComponent.embedded?.nl.embedded.commonground.layerType))}
                  icon={<FontAwesomeIcon icon={faLayerGroup} />}
                />
              </ToolTip>

              {/* {tempComponent.categories && category && (
                  <ToolTip tooltip="Categorie">
                    <Tag
                      layoutClassName={
                        styles[
                          _.camelCase(`${tempComponent.embedded?.nl.embedded.commonground.layerType} category`)
                        ]
                      }
                      label={_.upperFirst(category?.title)}
                      icon={category?.icon}
                    />
                  </ToolTip>
                )} */}
            </div>

            <div className={styles.tags}>
              {tempComponent.developmentStatus && (
                <ToolTip tooltip="Status">
                  <Tag
                    label={_.upperFirst(tempComponent.developmentStatus)}
                    icon={<FontAwesomeIcon icon={faInfoCircle} />}
                  />
                </ToolTip>
              )}
              <ToolTip tooltip="Installaties">
                <Tag
                  label={_.toString(tempComponent.usedBy?.length ?? "0")}
                  icon={<FontAwesomeIcon icon={faRepeat} />}
                />
              </ToolTip>

              {/* {tempComponent.embedded?.legal.embedded?.repoOwner.name && (
                  <ToolTip tooltip="Organisatie">
                    <Tag
                      label={tempComponent.embedded?.url?.embedded?.organisation?.name}
                      icon={<FontAwesomeIcon icon={faHouse} />}
                    />
                  </ToolTip>
                )} */}

              {tempComponent.url && (
                <ToolTip tooltip="GitHub/GitLab">
                  <Tag
                    label={t("Repository")}
                    icon={<GitHubLogo />}
                    //   onClick={() => open(tempComponent.url)}
                  />
                </ToolTip>
              )}

              {tempComponent.legal && (
                <ToolTip tooltip="Licentie">
                  <Tag label={tempComponent.legal} icon={<FontAwesomeIcon icon={faScroll} />} />
                </ToolTip>
              )}
            </div>
          </div>

          {/* <div className={styles.addToCatalogusContainer}>
              <div className={styles.logoContainer}>
                <img
                  src={tempComponent.embedded?.url?.avatar_url ?? componentPlacholderLogo}
                  className={styles.logo}
                />
              </div>
              <Button icon={<ExternalLinkIcon />}>Toevoegen aan catalogus</Button>
            </div> */}
        </div>

        {/* <div className={styles.cardsContainer}>
            {tempComponent.embedded?.url?.embedded?.organisation && (
              <OrganizationCard
                title={{
                  label: tempComponent.embedded?.url?.embedded?.organisation?.name,
                  href: `/organizations/${tempComponent.embedded?.url?.embedded?.organisation?.id}`,
                }}
                description={tempComponent.embedded?.url?.embedded?.organisation?.description}
                website={tempComponent.embedded?.url?.embedded?.organisation?.website}
                logo={tempComponent.embedded?.url?.embedded?.organisation?.logo}
                components={{
                  owned: tempComponent.embedded?.url?.embedded?.organisation?.owns?.length.toString() ?? "0",
                  supported:
                    tempComponent.embedded?.url?.embedded?.organisation?.supports?.length.toString() ?? "0",
                  used: tempComponent.embedded?.url?.embedded?.organisation?.uses?.length.toString() ?? "0",
                }}
                gitHub={tempComponent.embedded?.url?.embedded?.organisation?.github}
                gitLab={tempComponent.embedded?.url?.embedded?.organisation?.gitlab}
                type={tempComponent.embedded?.url?.embedded?.organisation?.type}
                layoutClassName={styles.organizationCardContainer}
              />
            )}
            {!tempComponent.embedded?.url?.embedded?.organisation && (
              <span className={styles.noOrganizationCardAvailable}>{t("No organization found")}</span>
            )}
            <InfoCard
              title=""
              content={
                <RatingIndicatorTemplate
                  layoutClassName={styles.ratingIndicatorContainer}
                  component={tempComponent}
                />
              }
              layoutClassName={styles.infoCard}
            />
          </div> */}

        {/* <DownloadTemplate
            label={tempComponent.name}
            icon={<FontAwesomeIcon icon={faDatabase} />}
            {...{ sizeKb }}
          /> */}

        {/* <div>
            <h2>Technische gegevens</h2>

            <Table>
              <TableBody>
                <TableRow>
                  <TableHeader>Gemma</TableHeader>
                  <TableCell>Op dit moment is er geen gemma data beschikbaar.</TableCell>
                </TableRow>
                <TableRow>
                  <TableHeader>{t("Products")}</TableHeader>
                  <TableCell>
                    {tempComponent.embedded.nl.upl &&
                      tempComponent.embedded.nl?.upl.map((product: string, idx: number) => (
                        <span
                          key={idx}
                          onClick={() => open("http://standaarden.overheid.nl/owms/terms/AangifteVertrekBuitenland")}
                        >
                          <Link icon={<ExternalLinkIcon />} iconAlign="start">
                            {product},
                          </Link>
                        </span>
                      ))}
                    {!tempComponent.embedded.nl.upl ||
                      (!tempComponent.embedded.nl.upl.length && (
                        <span>Op dit moment zijn er geen producten beschikbaar.</span>
                      ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHeader>Standaarden</TableHeader>
                  <TableCell>Op dit moment zijn er geen standaarden beschikbaar.</TableCell>
                </TableRow>
                <TableRow>
                  <TableHeader>Wet en regelgeving</TableHeader>
                  <TableCell>Op dit moment zijn er geen wetten en regelgevingen beschikbaar.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div> */}

        <div>
          <Heading2>Tabbladen</Heading2>

          <TabContext value={currentTab.toString()}>
            <Tabs
              value={currentTab}
              onChange={(_, newValue: number) => {
                setCurrentTab(newValue);
              }}
              variant="scrollable"
            >
              <Tab
                className={styles.tab}
                label={
                  <BadgeCounter
                    layoutClassName={styles.badgeLayout}
                    number={_.toString(TempComponentsDependencies.length)}
                  >
                    Componenten & Afhankelijkheden
                  </BadgeCounter>
                }
                value={0}
              />
              <Tab className={styles.tab} label={t("Suppliers")} value={1} />
              <Tab className={styles.tab} label={t("Reuse")} value={2} />
              <Tab
                className={styles.tab}
                label={
                  <BadgeCounter layoutClassName={styles.badgeLayout} number={_.toString(TempComponentsSchema.length)}>
                    {t("Schema's")}
                  </BadgeCounter>
                }
                value={3}
              />
              <Tab
                className={styles.tab}
                label={
                  <BadgeCounter
                    layoutClassName={styles.badgeLayout}
                    number={_.toString(TempComponentsProcesses.length)}
                  >
                    {t("Processes")}
                  </BadgeCounter>
                }
                value={4}
              />
            </Tabs>

            <TabPanel className={styles.tabPanel} value="0">
              <div className={styles.components}>
                <div className={styles.dependenciesDisplaySwitchButtons}>
                  <Button
                    className={styles.buttonIcon}
                    variant={filters.dependenciesDisplayLayout === "layer" ? "primary-action" : "secondary-action"}
                    onClick={() => setFilters({ ...filters, dependenciesDisplayLayout: "layer" })}
                  >
                    <FontAwesomeIcon icon={faLayerGroup} />
                    {t("Layers")}
                  </Button>
                  <Button
                    className={styles.buttonIcon}
                    variant={filters.dependenciesDisplayLayout === "relations" ? "primary-action" : "secondary-action"}
                    onClick={() => setFilters({ ...filters, dependenciesDisplayLayout: "relations" })}
                  >
                    <FontAwesomeIcon icon={faCircleNodes} />
                    {t("Relations")}
                  </Button>
                </div>

                <DependenciesTemplate
                  type={filters.dependenciesDisplayLayout}
                  components={TempComponentsDependencies}
                  mainComponent={{
                    id: userId,
                    name: tempComponent.name,
                    layer: tempComponent.embedded?.nl.embedded.commonground.layerType,
                  }}
                />
              </div>
            </TabPanel>

            <TabPanel className={styles.tabPanel} value="1">
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

            <TabPanel className={styles.tabPanel} value="2">
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

            <TabPanel className={styles.tabPanel} value="3">
              <div className={styles.components}>
                <ComponentCardsAccordionTemplate components={TempComponentsSchema} />
              </div>
            </TabPanel>
            <TabPanel className={styles.tabPanel} value="4">
              <div className={styles.components}>
                <ComponentCardsAccordionTemplate components={TempComponentsProcesses} />
              </div>
            </TabPanel>
          </TabContext>
        </div>
      </>
      {/* )} */}
      {/* {_getComponent.isLoading && <Skeleton height="200px" />} */}
    </Container>
  );
};
