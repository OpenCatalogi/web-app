/* eslint-disable */
import * as React from "react";
import * as styles from "./ComponentsDetailTemplate.module.css";
import { Heading, Icon, Button, DataBadge, BadgeCounter, Link } from "@utrecht/component-library-react/dist/css-module";
import {
  Container,
  InfoCard,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  NotificationPopUp as _NotificationPopUp,
} from "@conduction/components";
import { navigate } from "gatsby";
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
  faArrowLeft,
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
import { categories, TCategories } from "../../data/categories";
import { OrganizationCard } from "../../components/organizationCard/OrganizationCard";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { DependenciesTemplate } from "../templateParts/dependenciesTemplates/ComponentDependenciesTemplate";
import { useFiltersContext } from "../../context/filters";
import { ComponentCardsAccordionTemplate } from "../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";
import { DownloadTemplate } from "../templateParts/download/DownloadTemplate";
import { RatingOverview } from "../templateParts/ratingOverview/RatingOverview";
import ResultsDisplaySwitch from "../../components/resultsDisplaySwitch/ResultsDisplaySwitch";
import { ExpandableLeadParagraph } from "../../components/expandableLeadParagraph/ExpandableLeadParagraph";
import { TOOLTIP_ID } from "../../layout/Layout";

interface ComponentsDetailTemplateProps {
  componentId: string;
  sizeKb: string;
}

export const ComponentsDetailTemplate: React.FC<ComponentsDetailTemplateProps> = ({ componentId, sizeKb }) => {
  const { t } = useTranslation();
  const { filters } = useFiltersContext();

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

  const imageHasValidSource = (src: string): boolean => {
    try {
      const url = new URL(src);
      return url.protocol === "htpp:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  return (
    <Container layoutClassName={styles.container}>
      <Link className={styles.backButton} onClick={() => navigate("/components")}>
        <Icon>
          <IconArrowLeft />
        </Icon>
        {t("Back to components")}
      </Link>

      {_getComponent.isSuccess && (
        <>
          <div className={styles.headingContainer}>
            <div className={styles.headingContent}>
              <Heading level={1} className={styles.componentName}>
                {_getComponent.data.name}
              </Heading>

              <ExpandableLeadParagraph
                description={_getComponent.data.embedded?.description?.longDescription ?? t("No description available")}
              />

              <div className={styles.layerAndCategoryContainer}>
                <DataBadge
                  data-tooltip-id={TOOLTIP_ID}
                  data-tooltip-content="Laag"
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

                {_getComponent.data?.categories &&
                  _categories &&
                  _categories.map(
                    (category: any) =>
                      category && (
                        <DataBadge
                          data-tooltip-id={TOOLTIP_ID}
                          data-tooltip-content="Categorie"
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
                      ),
                  )}
              </div>

              <div className={styles.tags}>
                {_getComponent.data.developmentStatus && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Status">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {t(_.upperFirst(_getComponent.data.developmentStatus))}
                  </DataBadge>
                )}
                <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Installaties">
                  <FontAwesomeIcon icon={faRepeat} />
                  {_.toString(_getComponent.data.usedBy?.length ?? "0")}
                </DataBadge>

                {organisation?.name && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Organisatie">
                    <FontAwesomeIcon icon={faHouse} />
                    {organisation.name}
                  </DataBadge>
                )}

                {_getComponent.data.embedded?.legal?.license && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Licentie">
                    <FontAwesomeIcon icon={faScroll} />
                    {_getComponent.data.embedded?.legal.license}
                  </DataBadge>
                )}

                {_getComponent.data.softwareType && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Software type">
                    <FontAwesomeIcon icon={faLaptop} />
                    {_getComponent.data.softwareType}
                  </DataBadge>
                )}

                {_getComponent.data.embedded?.maintenance?.type && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Onderhoudstype">
                    <FontAwesomeIcon icon={faWrench} />
                    {_getComponent.data.embedded.maintenance.type}
                  </DataBadge>
                )}
              </div>
            </div>

            <div className={styles.addToCatalogusContainer}>
              <div className={styles.logoContainer}>
                <img
                  src={
                    imageHasValidSource(_getComponent.data?.embedded?.url?.embedded?.component?.logo)
                      ? _getComponent.data?.embedded?.url?.embedded?.component?.logo
                      : componentPlacholderLogo
                  }
                  className={styles.logo}
                />
              </div>
              <Button>
                <Icon>
                  <IconExternalLink />
                </Icon>{" "}
                Toevoegen aan catalogus
              </Button>

              {_getComponent.data.embedded?.url?.url && (
                <Button
                  appearance="secondary-action-button"
                  onClick={() => open(_getComponent.data.embedded?.url?.url)}
                >
                  <Icon>
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
                          <Icon>
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
                    icon: <FontAwesomeIcon icon={faArrowLeft} />,
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    handleClick: () => {},
                  }}
                  layoutClassName={styles.popup}
                />
              </div>
            )}
          </div>

          <div>
            <Tabs>
              <TabList>
                <Tab>
                  <span>Componenten & Afhankelijkheden</span>
                  <BadgeCounter className={styles.badgeLayout}>
                    {_getComponent.data.embedded?.dependsOn?.embedded?.open.length ?? 0}
                  </BadgeCounter>
                </Tab>
                <Tab>
                  <span>{t("Suppliers")}</span>
                </Tab>
                <Tab>
                  <span>{t("Reuse")}</span>
                </Tab>
                <Tab>
                  <span>{t("Schema's")}</span>
                  <BadgeCounter className={styles.badgeLayout}>
                    {_getComponent.data.embedded?.dependsOn?.embedded?.open.length ?? 0}
                  </BadgeCounter>
                </Tab>
                <Tab>
                  <span>{t("Processes")}</span>
                  <BadgeCounter className={styles.badgeLayout}>
                    {_getComponent.data.embedded?.dependsOn?.embedded?.open.length ?? 0}
                  </BadgeCounter>
                </Tab>
              </TabList>
              <TabPanel>
                <div className={styles.components}>
                  {_getComponent.data.embedded?.dependsOn?.embedded.open && (
                    <ResultsDisplaySwitch
                      resultsDisplayType="dependenciesDisplayLayout"
                      layoutClassName={styles.dependenciesDisplaySwitchButtons}
                    />
                  )}

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
              <TabPanel>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Gemeente Rotterdam</TableCell>
                      <TableCell>
                        <Link>
                          <Icon>
                            <GitHubLogo />
                          </Icon>
                          Componenten GitHub
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link>
                          <Icon>
                            <IconPhone />
                          </Icon>
                          010 - 123 456 7
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link onClick={() => navigate("/organizations/5b9e0b17-00ca-433c-961b-913270643e6d")}>
                          <Icon>
                            <IconArrowRight />
                          </Icon>
                          {t("Details")}
                        </Link>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Conduction</TableCell>
                      <TableCell>
                        <Link>
                          <Icon>
                            <GitHubLogo />
                          </Icon>
                          Componenten GitHub
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link>
                          <Icon>
                            <IconPhone />
                          </Icon>
                          020 - 123 456 7
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link onClick={() => navigate("/organizations/5b9e0b17-00ca-433c-961b-913270643e6d")}>
                          <Icon>
                            <IconArrowRight />
                          </Icon>
                          {t("Details")}
                        </Link>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Gemeente Utrecht</TableCell>
                      <TableCell>
                        <Link>
                          <Icon>
                            <GitHubLogo />
                          </Icon>
                          Componenten GitHub
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link>
                          <Icon>
                            <IconPhone />
                          </Icon>
                          030 - 123 456 7
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link onClick={() => navigate("/organizations/5b9e0b17-00ca-433c-961b-913270643e6d")}>
                          <Icon>
                            <IconArrowRight />
                          </Icon>
                          {t("Details")}
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel>
                <>
                  {_getComponent.data?.usedBy?.length > 0 && (
                    <div className={styles.organizations}>
                      {_getComponent.data.usedBy.map((organization: any) => (
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
                    </div>
                  )}

                  {_getComponent.data?.usedBy?.length < 1 && <>Er zijn geen hergebruikers van dit component.</>}
                </>
              </TabPanel>
              <TabPanel>
                <ComponentCardsAccordionTemplate
                  components={_getComponent.data.embedded?.dependsOn?.embedded?.open ?? []}
                />
              </TabPanel>
              <TabPanel>
                <ComponentCardsAccordionTemplate
                  components={_getComponent.data.embedded?.dependsOn?.embedded?.open ?? []}
                />
              </TabPanel>
            </Tabs>
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
                            <Icon>
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
