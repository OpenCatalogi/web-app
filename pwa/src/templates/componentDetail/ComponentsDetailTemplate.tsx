/* eslint-disable */
import * as React from "react";
import * as styles from "./ComponentsDetailTemplate.module.css";
import { Tab, TabContext, TabPanel, Tabs } from "@gemeente-denhaag/components-react";
import {
  BadgeCounter,
  Heading,
  Paragraph,
  Icon,
  Button,
  DataBadge,
} from "@utrecht/component-library-react/dist/css-module";
import { Container, InfoCard, NotificationPopUp as _NotificationPopUp } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";
import { IconExternalLink, IconArrowLeft, IconArrowRight, IconPhone } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import componentPlacholderLogo from "../../assets/images/grey.png";
import { Table, TableBody, TableCell, TableRow } from "@utrecht/component-library-react/dist/css-module";
import { QueryClient } from "react-query";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";
import { RatingIndicatorTemplate } from "../templateParts/ratingIndicator/RatingIndicatorTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faDatabase,
  faHouse,
  faInfoCircle,
  faLaptop,
  faLayerGroup,
  faRepeat,
  faScroll,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { ToolTip } from "../../components/toolTip/ToolTip";
import { categories, TCategories } from "../../data/categories";
import { OrganizationCard } from "../../components/organizationCard/OrganizationCard";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { DependenciesTemplate } from "../templateParts/dependenciesTemplates/ComponentDependenciesTemplate";
import { FiltersContext } from "../../context/filters";
import { ComponentCardsAccordionTemplate } from "../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";
import { DownloadTemplate } from "../templateParts/download/DownloadTemplate";
import { RatingOverview } from "../templateParts/ratingOverview/RatingOverview";
import clsx from "clsx";
import ResultsDisplaySwitch from "../../components/resultsDisplaySwitch/ResultsDisplaySwitch";
import { Link } from "../../components";

interface ComponentsDetailTemplateProps {
  componentId: string;
  sizeKb: string;
}

export const ComponentsDetailTemplate: React.FC<ComponentsDetailTemplateProps> = ({ componentId, sizeKb }) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const [filters] = React.useContext(FiltersContext);

  const NotificationPopUpController = _NotificationPopUp.controller;
  const NotificationPopUp = _NotificationPopUp.NotificationPopUp;

  const { isVisible, show, hide } = NotificationPopUpController();

  const queryClient = new QueryClient();
  const _useComponent = useComponent(queryClient);
  const _getComponent = _useComponent.getOne(componentId);

  const layer: TCategories = t(_.upperFirst(_getComponent.data?.embedded?.nl?.embedded?.commonground.layerType));
  const _categories =
    layer &&
    _getComponent.data?.categories.map((category: any) => {
      return categories[layer]?.find((_category) => {
        return _category.value === category;
      });
    });

  if (_getComponent.isError) return <>Something went wrong...</>;

  const organisation = _getComponent?.data?.embedded?.url?.embedded?.organisation;

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton}>
        <Link to="/components">
          <Icon className="utrecht-icon--conduction-start">
            <IconArrowLeft />
          </Icon>
          {t("Back to components")}
        </Link>
      </div>

      {_getComponent.isSuccess && (
        <>
          <div className={styles.headingContainer}>
            <div className={styles.headingContent}>
              <Heading level={1} className={styles.componentName}>
                {_getComponent.data.name}
              </Heading>

              <Paragraph lead className={styles.description}>
                {_getComponent.data.embedded?.description?.longDescription ?? t("No description available")}
              </Paragraph>

              <div className={styles.layerAndCategoryContainer}>
                <ToolTip tooltip="Laag">
                  <DataBadge
                    className={
                      styles[
                        _.camelCase(
                          t(`${_getComponent.data.embedded?.nl?.embedded?.commonground.layerType ?? "Unknown"} layer`),
                        )
                      ]
                    }
                  >
                    <FontAwesomeIcon icon={faLayerGroup} />
                    {t(_.upperFirst(_getComponent.data.embedded?.nl?.embedded?.commonground.layerType ?? "Unknown"))}
                  </DataBadge>
                </ToolTip>

                {_getComponent.data?.categories &&
                  _categories &&
                  _categories.map(
                    (category: any) =>
                      category && (
                        <ToolTip tooltip="Categorie">
                          <DataBadge
                            className={
                              styles[
                                _.camelCase(
                                  `${_getComponent.data.embedded?.nl.embedded?.commonground.layerType} category`,
                                )
                              ]
                            }
                          >
                            {category?.icon}
                            {_.upperFirst(category?.title)}
                          </DataBadge>
                        </ToolTip>
                      ),
                  )}
              </div>

              <div className={styles.tags}>
                {_getComponent.data.developmentStatus && (
                  <ToolTip tooltip="Status">
                    <DataBadge>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      {t(_.upperFirst(_getComponent.data.developmentStatus))}
                    </DataBadge>
                  </ToolTip>
                )}
                <ToolTip tooltip="Installaties">
                  <DataBadge>
                    <FontAwesomeIcon icon={faRepeat} />
                    {_.toString(_getComponent.data.usedBy?.length ?? "0")}
                  </DataBadge>
                </ToolTip>

                {organisation?.name && (
                  <ToolTip tooltip="Organisatie">
                    <DataBadge>
                      <FontAwesomeIcon icon={faHouse} />
                      {organisation.name}
                    </DataBadge>
                  </ToolTip>
                )}

                {_getComponent.data.embedded?.legal?.license && (
                  <ToolTip tooltip="Licentie">
                    <DataBadge>
                      <FontAwesomeIcon icon={faScroll} />
                      {_getComponent.data.embedded?.legal.license}
                    </DataBadge>
                  </ToolTip>
                )}

                {_getComponent.data.softwareType && (
                  <ToolTip tooltip="Software type">
                    <DataBadge>
                      <FontAwesomeIcon icon={faLaptop} />
                      {_getComponent.data.softwareType}
                    </DataBadge>
                  </ToolTip>
                )}

                {_getComponent.data.embedded?.maintenance?.type && (
                  <ToolTip tooltip="Onderhoudstype">
                    <DataBadge>
                      <FontAwesomeIcon icon={faWrench} />
                      {_getComponent.data.embedded.maintenance.type}
                    </DataBadge>
                  </ToolTip>
                )}
              </div>
            </div>

            <div className={styles.addToCatalogusContainer}>
              <div className={styles.logoContainer}>
                <img
                  src={_getComponent.data?.embedded?.url?.avatar_url ?? componentPlacholderLogo}
                  className={styles.logo}
                />
              </div>
              <Button>
                <Icon className="utrecht-icon--conduction-start">
                  <IconExternalLink />
                </Icon>{" "}
                Toevoegen aan catalogus
              </Button>

              {_getComponent.data.embedded?.url?.url && (
                <Button
                  appearance="secondary-action-button"
                  onClick={() => open(_getComponent.data.embedded?.url?.url)}
                >
                  <Icon className="utrecht-icon--conduction-start">
                    <GitHubLogo />
                  </Icon>{" "}
                  {t("View Repository")}
                </Button>
              )}
            </div>
          </div>

          <div className={styles.cardsContainer}>
            {organisation && (
              <OrganizationCard
                title={{
                  label: organisation.name,
                  href: `/organizations/${organisation._self.id}`,
                }}
                description={organisation.description}
                website={organisation.website}
                logo={organisation.logo}
                components={{
                  owned: organisation.owns?.length.toString() ?? "0",
                  supported: organisation.supports?.length.toString() ?? "0",
                  used: organisation.uses?.length.toString() ?? "0",
                }}
                gitHub={organisation.github}
                gitLab={organisation.gitlab}
                type={organisation.type}
                layoutClassName={styles.organizationCardContainer}
              />
            )}
            {!_getComponent?.data?.embedded?.url?.embedded?.organisation && (
              <span className={styles.noOrganizationCardAvailable}>{t("No organization found")}</span>
            )}
            <InfoCard
              title=""
              content={
                <>
                  {_getComponent.data.embedded?.rating && (
                    <>
                      <RatingIndicatorTemplate
                        layoutClassName={styles.ratingIndicatorContainer}
                        maxRating={_getComponent.data.embedded?.rating?.maxRating}
                        rating={_getComponent.data.embedded?.rating?.rating}
                      />
                      <span className={styles.link}>
                        <Link onClick={show}>
                          <Icon className="utrecht-icon--conduction-start">
                            <IconArrowRight />
                          </Icon>
                          Rating
                        </Link>
                      </span>
                    </>
                  )}
                  {!_getComponent.data.embedded?.rating && (
                    <div className={styles.noRatingStyle}>{t("No rating available")}</div>
                  )}
                </>
              }
              layoutClassName={styles.infoCard}
            />
            {isVisible && (
              <div className={styles.overlay}>
                <NotificationPopUp
                  {...{ hide, isVisible }}
                  title="Rating"
                  description={<RatingOverview getComponent={_getComponent} />}
                  primaryButton={{
                    label: t("Score calculation"),
                    handleClick: () => {
                      navigate("/documentation/about#score-calculation");
                    },
                  }}
                  secondaryButton={{
                    label: t("Close"),
                    icon: <ArrowLeftIcon />,
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    handleClick: () => {},
                  }}
                  layoutClassName={styles.popup}
                />
              </div>
            )}
          </div>

          <div>
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
                    <>
                      <div className={styles.tabBadgeContainer}>
                        <span>Componenten & Afhankelijkheden</span>
                        <BadgeCounter className={styles.badgeLayout}>
                          {_getComponent.data.embedded?.dependsOn?.embedded?.open.length ?? 0}
                        </BadgeCounter>
                      </div>
                    </>
                  }
                  value={0}
                />
                <Tab className={styles.tab} label={t("Suppliers")} value={1} />
                <Tab className={styles.tab} label={t("Reuse")} value={2} />
                <Tab
                  className={styles.tab}
                  label={
                    <>
                      <div className={styles.tabBadgeContainer}>
                        <span>{t("Schema's")}</span>
                        <BadgeCounter className={styles.badgeLayout}>
                          {_getComponent.data.embedded?.dependsOn?.embedded?.open.length ?? 0}
                        </BadgeCounter>
                      </div>
                    </>
                  }
                  value={3}
                />
                <Tab
                  className={styles.tab}
                  label={
                    <>
                      <div className={styles.tabBadgeContainer}>
                        <span>{t("Processes")}</span>
                        <BadgeCounter className={styles.badgeLayout}>
                          {_getComponent.data.embedded?.dependsOn?.embedded?.open.length ?? 0}
                        </BadgeCounter>
                      </div>
                    </>
                  }
                  value={4}
                />
              </Tabs>

              <TabPanel className={styles.tabPanel} value="0">
                <div className={styles.components}>
                  <ResultsDisplaySwitch
                    resultsDisplayType="dependenciesDisplayLayout"
                    layoutClassName={styles.dependenciesDisplaySwitchButtons}
                  />

                  <DependenciesTemplate
                    type={filters.dependenciesDisplayLayout}
                    components={_getComponent.data.embedded?.dependsOn?.embedded?.open ?? []}
                    mainComponent={{
                      id: componentId,
                      name: _getComponent.data.name,
                      layer: _getComponent.data.embedded?.nl?.embedded?.commonground.layerType,
                    }}
                  />
                </div>
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="1">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Gemeente Rotterdam</TableCell>
                      <TableCell>
                        <Link to={""}>
                          <Icon className="utrecht-icon--conduction-start">
                            <GitHubLogo />
                          </Icon>
                          Componenten GitHub
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={""}>
                          <Icon className="utrecht-icon--conduction-start">
                            <IconPhone />
                          </Icon>
                          010 - 123 456 7
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link to="/organizations/5b9e0b17-00ca-433c-961b-913270643e6d">
                          <Icon className="utrecht-icon--conduction-start">
                            <IconArrowRight />
                          </Icon>
                          {t("Details")}
                        </Link>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Conduction</TableCell>
                      <TableCell>
                        <Link to={""}>
                          <Icon className="utrecht-icon--conduction-start">
                            <GitHubLogo />
                          </Icon>
                          Componenten GitHub
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={""}>
                          <Icon className="utrecht-icon--conduction-start">
                            <IconPhone />
                          </Icon>
                          020 - 123 456 7
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link to="/organizations/5b9e0b17-00ca-433c-961b-913270643e6d">
                          <Icon className="utrecht-icon--conduction-start">
                            <IconArrowRight />
                          </Icon>
                          {t("Details")}
                        </Link>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Gemeente Utrecht</TableCell>
                      <TableCell>
                        <Link to={""}>
                          <Icon className="utrecht-icon--conduction-start">
                            <GitHubLogo />
                          </Icon>
                          Componenten GitHub
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={""}>
                          <Icon className="utrecht-icon--conduction-start">
                            <IconPhone />
                          </Icon>
                          030 - 123 456 7
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link to="/organizations/5b9e0b17-00ca-433c-961b-913270643e6d">
                          <Icon className="utrecht-icon--conduction-start">
                            <IconArrowRight />
                          </Icon>
                          {t("Details")}
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabPanel>

              <TabPanel className={clsx(styles.tabPanel, styles.organizations)} value="2">
                {_getComponent.data?.usedBy?.length &&
                  _getComponent.data?.usedBy.map((organization: any) => (
                    <OrganizationCard
                      key={organization.id}
                      title={{
                        label: organization?.name,
                        href: `#`,
                      }}
                      description={organization?.description}
                      website={organization?.website}
                      logo={organization?.logo}
                      components={{
                        owned: organization?.owns?.length.toString() ?? "0",
                        supported: organization?.supports?.length.toString() ?? "0",
                        used: organization?.uses?.length.toString() ?? "0",
                      }}
                      gitHub={organization?.github}
                      gitLab={organization?.gitlab}
                      type={organization?.type}
                      layoutClassName={styles.organizationCardContainer}
                    />
                  ))}

                {!_getComponent.data?.usedBy?.length && <>Er zijn geen hergebruikers van dit component.</>}
              </TabPanel>

              <TabPanel className={styles.tabPanel} value="3">
                <div className={styles.components}>
                  <ComponentCardsAccordionTemplate
                    components={_getComponent.data.embedded?.dependsOn?.embedded?.open ?? []}
                  />
                </div>
              </TabPanel>
              <TabPanel className={styles.tabPanel} value="4">
                <div className={styles.components}>
                  <ComponentCardsAccordionTemplate
                    components={_getComponent.data.embedded?.dependsOn?.embedded?.open ?? []}
                  />
                </div>
              </TabPanel>
            </TabContext>
          </div>

          <DownloadTemplate
            label={_getComponent.data.name}
            icon={<FontAwesomeIcon icon={faDatabase} />}
            {...{ sizeKb }}
          />

          <div>
            <h2 className={styles.title}>Meer informatie</h2>

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={styles.title}>Gemma</TableCell>
                  <TableCell className={styles.description}>Op dit moment is er geen gemma data beschikbaar.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.title}>{t("Products")}</TableCell>
                  <TableCell>
                    {_getComponent.data.embedded?.nl?.upl &&
                      _getComponent.data.embedded?.nl?.upl.map((product: string, idx: number) => (
                        <span key={idx}>
                          <Link
                            target="_new"
                            href="http://standaarden.overheid.nl/owms/terms/AangifteVertrekBuitenland"
                          >
                            <Icon className="utrecht-icon--conduction-start">
                              <IconExternalLink />
                            </Icon>
                            {product},{" "}
                          </Link>
                        </span>
                      ))}
                    {(!_getComponent.data.embedded?.nl?.upl || !_getComponent.data.embedded?.nl?.upl.length) && (
                      <span className={styles.description}>Op dit moment zijn er geen producten beschikbaar.</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.title}>Standaarden</TableCell>
                  <TableCell className={styles.description}>
                    Op dit moment zijn er geen standaarden beschikbaar.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.title}>Wet en regelgeving</TableCell>
                  <TableCell className={styles.description}>
                    Op dit moment zijn er geen wetten en regelgevingen beschikbaar.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </>
      )}
      {_getComponent.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
