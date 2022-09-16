import * as React from "react";
import * as styles from "./ComponentsDetailTemplate.module.css";
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
import { Container, InfoCard } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, CallIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import grey from "../../assets/images/grey.png";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { QueryClient } from "react-query";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";
import { TEMPORARY_COMPONENTS } from "../../data/components";
import { RatingIndicatorTemplate } from "../templateParts/ratingIndicator/RatingIndicatorTemplate";
import { Tag } from "../../components/tag/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNodes,
  faHouse,
  faInfoCircle,
  faLayerGroup,
  faRepeat,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { ToolTip } from "../../components/toolTip/ToolTip";
import { categories, TCategories } from "../../data/categories";
import { categories as _categories } from "../../data/filters";
import { OrganizationCard } from "../../components/organizationCard/OrganizationCard";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { BadgeCounter } from "../../components/badgeCounter/BadgeCounter";
import { DependenciesTemplate } from "../templateParts/dependenciesTemplates/ComponentDependenciesTemplate";
import { FiltersContext } from "../../context/filters";
import { ComponentCardsAccordionTemplate } from "../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";

interface ComponentsDetailTemplateProps {
  componentId: string;
  organization: any;
}

export const ComponentsDetailTemplate: React.FC<ComponentsDetailTemplateProps> = ({ componentId, organization }) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const [filters, setFilters] = React.useContext(FiltersContext);

  const TempComponentsDependencies = TEMPORARY_COMPONENTS.slice(1, 9);
  const TempComponentsSchema = TEMPORARY_COMPONENTS.slice(0, 1);
  const TempComponentsProcesses = TEMPORARY_COMPONENTS.slice(11, 15);

  const queryClient = new QueryClient();
  const _useComponent = useComponent(queryClient);
  const _getComponent = _useComponent.getOne(componentId);

  const layer: TCategories = t(_.upperFirst(_getComponent.data?.embedded?.nl.embedded.commonground.layerType));
  const category =
    layer &&
    categories[layer].find((category) => {
      return category.value === _getComponent.data?.categories;
    });

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
            <div className={styles.headingContent}>
              <Heading1>{_getComponent.data.name}</Heading1>

              <LeadParagraph className={styles.description}>
                {_getComponent.data.embedded.description.longDescription}
              </LeadParagraph>

              <div className={styles.layerAndCategoryContainer}>
                <ToolTip tooltip="Laag">
                  <Tag
                    layoutClassName={
                      styles[_.camelCase(t(`${_getComponent.data.embedded?.nl.embedded.commonground.layerType}`))]
                    }
                    label={t(_.upperFirst(_getComponent.data.embedded?.nl.embedded.commonground.layerType))}
                    icon={<FontAwesomeIcon icon={faLayerGroup} />}
                  />
                </ToolTip>

                {_getComponent.data?.categories && category && (
                  <ToolTip tooltip="Categorie">
                    <Tag
                      layoutClassName={
                        styles[
                          _.camelCase(`${_getComponent.data.embedded?.nl.embedded.commonground.layerType} category`)
                        ]
                      }
                      label={_.upperFirst(category?.title)}
                      icon={category?.icon}
                    />
                  </ToolTip>
                )}
              </div>

              <div className={styles.tags}>
                {_getComponent.data.developmentStatus && (
                  <ToolTip tooltip="Status">
                    <Tag
                      label={_.upperFirst(_getComponent.data.developmentStatus)}
                      icon={<FontAwesomeIcon icon={faInfoCircle} />}
                    />
                  </ToolTip>
                )}
                <ToolTip tooltip="Installaties">
                  <Tag
                    label={_.toString(_getComponent.data.usedBy?.length ?? "0")}
                    icon={<FontAwesomeIcon icon={faRepeat} />}
                  />
                </ToolTip>

                {_getComponent.data.embedded?.legal.embedded?.repoOwner.name && (
                  <ToolTip tooltip="Organisatie">
                    <Tag
                      label={_getComponent.data.embedded?.legal.embedded?.repoOwner.name}
                      icon={<FontAwesomeIcon icon={faHouse} />}
                    />
                  </ToolTip>
                )}

                {_getComponent.data.embedded?.url?.url && (
                  <ToolTip tooltip="GitHub/GitLab">
                    <Tag
                      label={t("Repository")}
                      icon={<GitHubLogo />}
                      onClick={() => open(_getComponent.data.embedded?.url?.url)}
                    />
                  </ToolTip>
                )}

                {_getComponent.data.embedded?.legal.license && (
                  <ToolTip tooltip="Licentie">
                    <Tag
                      label={_getComponent.data.embedded?.legal.license}
                      icon={<FontAwesomeIcon icon={faScroll} />}
                    />
                  </ToolTip>
                )}
              </div>
            </div>

            <div className={styles.addToCatalogusContainer}>
              <img src={grey} className={styles.componentImage} />
              <Button icon={<ExternalLinkIcon />}>Toevoegen aan catalogus</Button>
            </div>
          </div>

          <div className={styles.cardsContainer}>
            <OrganizationCard
              title={{ label: organization.name, href: `/organizations/${organization.id}` }}
              description={organization.description}
              website={organization.website}
              logo={organization.logo}
              components={{
                owned: organization.owns?.length.toString() ?? "0",
                supported: organization.supports?.length.toString() ?? "0",
                used: organization.uses?.length.toString() ?? "0",
              }}
              gitHub={organization.github}
              gitLab={organization.gitlab}
              type={organization.type}
              layoutClassName={styles.organizationCardContainer}
            />
            <InfoCard
              title=""
              content={
                <RatingIndicatorTemplate
                  layoutClassName={styles.ratingIndicatorContainer}
                  component={_getComponent.data}
                />
              }
              layoutClassName={styles.infoCard}
            />
          </div>

          <div>
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
                    {_getComponent.data.embedded.nl.upl &&
                      _getComponent.data.embedded.nl?.upl.map((product: string, idx: number) => (
                        <span
                          key={idx}
                          onClick={() => open("http://standaarden.overheid.nl/owms/terms/AangifteVertrekBuitenland")}
                        >
                          <Link icon={<ExternalLinkIcon />} iconAlign="start">
                            {product},
                          </Link>
                        </span>
                      ))}
                    {!_getComponent.data.embedded.nl.upl && (
                      <span>Op dit moment zijn er geen producten beschikbaar.</span>
                    )}
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
          </div>
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
                      variant={
                        filters.dependenciesDisplayLayout === "relations" ? "primary-action" : "secondary-action"
                      }
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
                      id: componentId,
                      name: _getComponent.data.name,
                      layer: _getComponent.data.embedded?.nl.embedded.commonground.layerType,
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
      )}
      {_getComponent.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
