import * as React from "react";
import * as styles from "./PublicationsDetailTemplate.module.css";
import _ from "lodash";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import componentPlacholderLogo from "../../assets/images/grey.png";
import {
  Heading,
  Icon,
  Button,
  DataBadge,
  BadgeCounter,
  Link,
  TableHeader,
  TableHeaderCell,
  StatusBadge,
  Heading3,
} from "@utrecht/component-library-react/dist/css-module";
import {
  Container,
  InfoCard,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  NotificationPopUp as _NotificationPopUp,
  DisplaySwitch,
  HorizontalOverflowWrapper,
} from "@conduction/components";
import { navigate } from "gatsby";
import { IconExternalLink, IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableRow } from "@utrecht/component-library-react/dist/css-module";
import { QueryClient } from "react-query";
import { useComponent } from "../../hooks/components";
import { RatingIndicatorTemplate } from "../templateParts/ratingIndicator/RatingIndicatorTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faArrowDown,
  faArrowLeft,
  faCircle,
  faGear,
  faHouse,
  faInfoCircle,
  faLaptop,
  faLayerGroup,
  faRepeat,
  faScroll,
  faUpload,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { OrganizationCard } from "../../components/organizationCard/OrganizationCard";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { DependenciesTemplate } from "../templateParts/dependenciesTemplates/ComponentDependenciesTemplate";
import { useResultDisplayLayoutContext } from "../../context/resultDisplayLayout";
import { ComponentCardsAccordionTemplate } from "../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";
import { DownloadTemplate } from "../templateParts/download/DownloadTemplate";
import { RatingOverview } from "../templateParts/ratingOverview/RatingOverview";
import { IDisplaySwitchButton } from "@conduction/components/lib/components/displaySwitch/DisplaySwitch";
import { ExpandableLeadParagraph } from "../../components/expandableLeadParagraph/ExpandableLeadParagraph";
import { TOOLTIP_ID } from "../../layout/Layout";
import { getStatusColor } from "../../services/getStatusColor";
import { ApplicationCard, ComponentCard } from "../../components";
import { getCommongroundRating } from "../../services/getCommongroundRating";
import {
  CommongroundRatingGold,
  CommongroundRatingSilver,
  CommongroundRatingBronze,
} from "../../assets/svgs/CommongroundRatingImages";
import { useFiltersContext } from "../../context/filters";
import { usePaginationContext } from "../../context/pagination";
import { maintenanceTypes } from "../../data/filters";
import { getSoftwareTypeLabel } from "../../services/getSoftwareTypeLabel";
import { usePublication } from "../../hooks/publication";

interface PublicationsDetailTemplateProps {
  publicationId: string;
}

export const PublicationsDetailTemplate: React.FC<PublicationsDetailTemplateProps> = ({ publicationId }) => {
  const { t } = useTranslation();
  const { resultDisplayLayout, setResultDisplayLayout } = useResultDisplayLayoutContext();
  const [moreInformationVisible, setMoreInformationVisible] = React.useState<boolean>(false);

  const [tabIndex, setTabIndex] = React.useState(0);

  const NotificationPopUpController = _NotificationPopUp.controller;
  const NotificationPopUp = _NotificationPopUp.NotificationPopUp;

  const { filters, setFilters } = useFiltersContext();
  const { pagination, setPagination } = usePaginationContext();

  const { isVisible, show, hide } = NotificationPopUpController();

  const tabsRef: any = React.useRef();
  const viewTabs = () => {
    tabsRef.current.scrollIntoView({ behavior: "smooth", inline: "start" });
  };

  const viewReuse = () => {
    viewTabs();

    let reuseIndex = 0;
    if (_getComponent.data?.embedded?.dependsOn?.embedded?.open) reuseIndex = reuseIndex + 1;
    if (_getComponent.data?.embedded?.supportedBy) reuseIndex = reuseIndex + 1;

    setTabIndex(reuseIndex);
  };

  const queryClient = new QueryClient();
  const _useComponent = useComponent(queryClient);
  // @ts-expect-error because
  const _getComponent = _useComponent.getOne(undefined);

  const _usePublication = usePublication(queryClient);
  const _getPublication = _usePublication.getOne(publicationId);

  const getConfigComponents = _useComponent.getAllConfig(_getComponent.data?.name);
  const getApplicationComponent = _useComponent.getApplicationComponent(
    _getComponent?.data?.embedded?.applicationSuite?.name,
  );

  const getMaintenanceType = (maintenanceType: string) => {
    const _maintenanceType = maintenanceTypes.find((__maintenanceType) => {
      return __maintenanceType.value === maintenanceType;
    });

    return _maintenanceType?.label ?? "";
  };

  const rating = _getComponent.data?.embedded?.rating;

  const gemma = _getComponent.data?.embedded?.nl?.embedded?.gemma;
  const publicationData = _getPublication.data?.data?.data;

  if (_getComponent.isError) return <>Something went wrong...</>;

  const organisation = _getPublication?.data?.data?.organization;
  const application = _getComponent?.data?.embedded?.applicationSuite;
  const applicationComponent = getApplicationComponent?.data?.results[0];

  const [isMetaDataVisible, setMetaDataIsVisible] = React.useState(false);

  const toggleMetaDataVisibility = () => {
    setMetaDataIsVisible(!isMetaDataVisible);
  };

  const imageHasValidSource = (src: string): boolean => {
    try {
      const url = new URL(src);
      return url.protocol === "htpp:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  const displaySwitchButtons: IDisplaySwitchButton[] = [
    {
      label: t("Layer"),
      pressed: resultDisplayLayout.dependenciesDisplayLayout === "layer",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, dependenciesDisplayLayout: "layer" }),
      icon: {
        name: "layer-group",
        prefix: "fas",
      },
    },
    {
      label: t("Relations"),
      pressed: resultDisplayLayout.dependenciesDisplayLayout === "relations",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, dependenciesDisplayLayout: "relations" }),
      icon: {
        name: "circle-nodes",
        prefix: "fas",
      },
    },
  ];

  const openModal = (onClick: () => any): void => {
    onClick();
    setTimeout(() => {
      const element = document.querySelectorAll('[class*="NotificationPopUp"]').item(0) as HTMLElement;
      const elementRect = element.getBoundingClientRect();
      const newHeight =
        Math.ceil(elementRect.height) % 2 === 0 ? Math.ceil(elementRect.height) : Math.ceil(elementRect.height) + 1;
      element.style.height = `${newHeight}px`;
      element.style.maxHeight = `${newHeight}px`;
      const newWidth =
        Math.ceil(elementRect.width) % 2 === 0 ? Math.ceil(elementRect.width) : Math.ceil(elementRect.width) + 1;
      element.style.width = `${newWidth}px`;
      element.style.maxWidth = newWidth < 1170 ? `${newWidth}px` : `${1170}px`;
    }, 300); // Give the modal some time to finish animating
  };

  const ratingFilter = window.sessionStorage.getItem("FILTER_RATING");

  const getCommongroundImage = (rating: number) => {
    switch (rating) {
      case 0:
        return <CommongroundRatingBronze />;
      case 1:
        return <CommongroundRatingBronze />;
      case 2:
        return <CommongroundRatingSilver />;
      case 3:
        return <CommongroundRatingGold />;
      default:
        return <CommongroundRatingBronze />;
    }
  };

  return (
    <Container layoutClassName={styles.container}>
      <Link
        className={styles.backButton}
        onClick={(e) => {
          e.preventDefault(), navigate("/publications");
        }}
        href="/publications"
      >
        <Icon>
          <IconArrowLeft />
        </Icon>
        {t("Back to publications")}
      </Link>

      {_getPublication.isSuccess && (
        <>
          <div className={styles.headingContainer}>
            <div className={styles.headingContent}>
              <Heading level={1} className={styles.componentName}>
                {_getPublication?.data?.data?.title}
              </Heading>

              <ExpandableLeadParagraph
                description={
                  _getPublication?.data?.data?.summary ?? t("No description available")
                }
              />

              <div className={styles.layerAndCategoryContainer}>
                <DataBadge
                  data-tooltip-id={TOOLTIP_ID}
                  data-tooltip-content="Laag"
                  className={
                    styles[
                      _.camelCase(
                        t(
                          `${
                            _getPublication.data?.data?.embedded?.nl?.embedded?.commonground?.layerType ?? "Unknown"
                          } layer`,
                        ),
                      )
                    ]
                  }
                >
                  <FontAwesomeIcon icon={faLayerGroup} />
                  {t(
                    _.upperFirst(
                      _getPublication.data?.data?.embedded?.nl?.embedded?.commonground?.layerType ?? "Unknown",
                    ),
                  )}
                </DataBadge>

                {_getPublication.data?.data?.category && (
                  <DataBadge
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content={t("Category")}
                    className={
                      styles[
                        _.camelCase(
                          `${
                            _getPublication.data?.data?.embedded?.nl.embedded?.commonground?.layerType ?? "Unknown"
                          } category`,
                        )
                      ]
                    }
                  >
                    {_.upperFirst(_getPublication.data?.category)}
                  </DataBadge>
                )}
              </div>

              <div className={styles.tags}>
                {_getPublication.data?.data?.usedBy?.length > 0 && (
                  <DataBadge
                    className={styles.clickableBadge}
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content="Installaties"
                    onClick={() => viewReuse()}
                  >
                    <FontAwesomeIcon icon={faRepeat} />
                    {_.toString(_getPublication.data?.data?.usedBy?.length ?? "0")}
                  </DataBadge>
                )}

                {organisation?.title && (
                  <DataBadge
                    className={styles.clickableBadge}
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content="Organisatie"
                  >
                    <FontAwesomeIcon icon={faHouse} />
                    {organisation.title}
                  </DataBadge>
                )}

                {_getPublication.data?.data?.license && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("License")}>
                    <FontAwesomeIcon icon={faScroll} />
                    {_getPublication.data?.license}
                  </DataBadge>
                )}

                {_getPublication.data?.data?.status && (
                  <StatusBadge
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content="Status"
                    status={getStatusColor(_.upperFirst(_getPublication.data?.data?.developmentStatus) ?? "Onbekend")}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
                    {t(_.upperFirst(_getPublication.data?.status))}
                  </StatusBadge>
                )}

                {_getPublication.data?.data?.published && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("Published")}>
                    <FontAwesomeIcon icon={faUpload} />
                    {_getPublication.data?.data?.published}
                  </DataBadge>
                )}

                {_getPublication.data?.data?.modified && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("Modified")}>
                    <FontAwesomeIcon icon={faGear} />
                    {_getPublication.data?.data?.modified}
                  </DataBadge>
                )}

                {_getPublication.data?.data?.portal && (
                  <DataBadge
                    className={styles.clickableBadge}
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content={_getPublication?.data?.portal}
                    onClick={() => open(_getPublication?.data?.portal)}
                  >
                    <FontAwesomeIcon icon={faCircle} />
                    {t("Portal")}
                  </DataBadge>
                )}

                {_getPublication.data?.data?.reference && (
                  <DataBadge
                    className={styles.clickableBadge}
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content={_getPublication.data?.data?.reference}
                    onClick={() => open(_getPublication?.data?.data?.reference)}
                  >
                    <FontAwesomeIcon icon={faGear} />
                    {t("Reference")}
                  </DataBadge>
                )}

                {_getPublication.data?.data?.softwareType && (
                  <DataBadge
                    className={styles.clickableBadge}
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content="Software type"
                    onClick={() => {
                      setFilters({
                        ...filters,
                        ["softwareType"]: _getPublication.data?.data?.softwareType,
                      });
                      setPagination({
                        ...pagination,
                        componentsCurrentPage: 1,
                      });

                      navigate("/components");
                    }}
                  >
                    <FontAwesomeIcon icon={faLaptop} />
                    {getSoftwareTypeLabel(_getPublication.data?.data?.softwareType)}
                  </DataBadge>
                )}

                {_getPublication.data?.data?.embedded?.maintenance?.type &&
                  _getPublication.data?.data?.embedded?.maintenance?.type !== "none" && (
                    <DataBadge
                      className={styles.clickableBadge}
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content="Onderhoudstype"
                      onClick={() => {
                        setFilters({
                          ...filters,
                          ["embedded.maintenance.type"]: _getPublication.data?.data?.embedded?.maintenance?.type,
                        });
                        setPagination({
                          ...pagination,
                          componentsCurrentPage: 1,
                        });

                        navigate("/components");
                      }}
                    >
                      <FontAwesomeIcon icon={faWrench} />
                      {getMaintenanceType(_getPublication.data?.data?.embedded?.maintenance?.type)}
                    </DataBadge>
                  )}
              </div>
              <div className={styles.tags}>
                {_getPublication.data?.data?.themes &&
                  _getPublication.data?.data?.themes.map((theme: string) => (
                    <DataBadge
                      className={styles.clickableBadge}
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content="Thema"
                    >
                      {theme}
                    </DataBadge>
                  ))}
              </div>


              {_getPublication.data?.metaData &&
                <div>
                  <Button  onClick={toggleMetaDataVisibility}>
                    <FontAwesomeIcon icon={isMetaDataVisible ? faMinus : faArrowDown } />
                    {isMetaDataVisible ? t("Hide metadata") : t("Show metadata")}
                  </Button>
                  {isMetaDataVisible &&
                    <Table>
                      <TableBody>
                        {_getPublication.data.metaData?.title &&
                          <TableRow>
                            <TableCell>{t("Title")}</TableCell>
                            <TableCell>{_getPublication.data.metaData.title}</TableCell>
                          </TableRow>
                        }
                        {_getPublication.data.metaData?.version &&
                          <TableRow>
                            <TableCell>{t("Version")}</TableCell>
                            <TableCell>{_getPublication.data.metaData.version}</TableCell>
                          </TableRow>
                        }
                        {_getPublication.data.metaData?.description &&
                          <TableRow>
                            <TableCell>{t("Description")}</TableCell>
                            <TableCell>{_getPublication.data.metaData.description}</TableCell>
                          </TableRow>
                        }
                        {_getPublication.data.metaData?.properties &&
                          <TableRow>
                            <TableCell>{t("Properties")}</TableCell>
                            <TableCell>{_getPublication.data.metaData.properties}</TableCell>
                          </TableRow>
                        }
                      </TableBody>
                    </Table>
                  }
                </div>
              }
            </div>

            <div className={styles.addToCatalogusContainer}>
              <div className={styles.logoContainer}>
                <img
                  src={
                    imageHasValidSource(_getPublication.data?.image)
                      ? _getPublication.data?.image
                      : componentPlacholderLogo
                  }
                  className={styles.logo}
                />
              </div>

              <div className={styles.headerButtonsContainer}>
                {/* This button should only be visible for authenticated users; feature will come in the future. */}
                {/* <Button>
                <Icon>
                  <IconExternalLink />
                </Icon>{" "}
                Toevoegen aan catalogus
              </Button> */}

                {_getPublication.data?.data?.embedded?.url?.url && (
                  <Button
                    appearance="secondary-action-button"
                    onClick={() => open(_getPublication.data?.data?.embedded?.url?.url)}
                  >
                    <Icon>
                      <GitHubLogo />
                    </Icon>{" "}
                    {t("View Repository")}
                  </Button>
                )}

                {_getPublication.data?.data?.embedded?.downloads && (
                  <DownloadTemplate
                    downloads={_getPublication?.data?.data?.embedded?.downloads}
                    backUrl={`/components/${_getPublication.data?.data?.id}`}
                  />
                )}

                {(gemma?.applicatiefunctie ||
                  gemma?.bedrijfsfuncties ||
                  gemma?.bedrijfsservices ||
                  gemma?.model ||
                  gemma?.referentiecomponenten?.length > 0 ||
                  _getPublication.data?.data?.embedded?.nl?.upl?.length > 0) && (
                  <>
                    <Button
                      appearance="secondary-action-button"
                      onClick={(e) => {
                        e.preventDefault(), openModal(() => setMoreInformationVisible(true));
                      }}
                    >
                      {t("More information")}
                    </Button>

                    {moreInformationVisible && (
                      <div className={styles.overlay}>
                        <NotificationPopUp
                          isVisible
                          hide={() => setMoreInformationVisible(false)}
                          title={`${t("More information")}:`}
                          customContent={
                            <HorizontalOverflowWrapper
                              ariaLabels={{
                                scrollLeftButton: t("Left scroll button"),
                                scrollRightButton: t("Right scroll button"),
                              }}
                            >
                              <Table className={styles.table}>
                                <TableBody className={styles.tableBody}>
                                  {gemma?.applicatiefunctie && (
                                    <TableRow className={styles.tableRow}>
                                      <TableCell className={styles.title}>Applicatiefunctie:</TableCell>
                                      <TableCell className={styles.description}>{gemma.applicatiefunctie}</TableCell>
                                    </TableRow>
                                  )}

                                  {gemma?.bedrijfsfuncties && (
                                    <TableRow className={styles.tableRow}>
                                      <TableCell className={styles.title}>Bedrijfsfuncties:</TableCell>
                                      <TableCell className={styles.description}>
                                        {gemma.bedrijfsfuncties.join(", ")}
                                      </TableCell>
                                    </TableRow>
                                  )}

                                  {gemma?.bedrijfsservices && (
                                    <TableRow className={styles.tableRow}>
                                      <TableCell className={styles.title}>Bedrijfsservices:</TableCell>
                                      <TableCell className={styles.description}>
                                        {gemma.bedrijfsservices.join(", ")}
                                      </TableCell>
                                    </TableRow>
                                  )}

                                  {gemma?.model && (
                                    <TableRow className={styles.tableRow}>
                                      <TableCell className={styles.title}>Model:</TableCell>
                                      <TableCell className={styles.description}>{gemma.model}</TableCell>
                                    </TableRow>
                                  )}

                                  {gemma?.referentiecomponenten?.length > 0 && (
                                    <TableRow className={styles.tableRow}>
                                      <TableCell className={styles.title}>Referentie componenten:</TableCell>
                                      <TableCell className={styles.description}>
                                        {gemma.referentiecomponenten.join(", ")}
                                      </TableCell>
                                    </TableRow>
                                  )}

                                  {_getPublication.data?.data?.embedded?.nl?.upl?.length > 0 && (
                                    <TableRow className={styles.tableRow}>
                                      <TableCell className={styles.title}>{t("Products")}</TableCell>
                                      <TableCell>
                                        {_getPublication.data?.data?.embedded?.nl?.upl.map(
                                          (product: string, idx: number) => (
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
                                          ),
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </HorizontalOverflowWrapper>
                          }
                          primaryButton={{
                            label: t("Close"),
                            icon: <FontAwesomeIcon icon={faArrowLeft} />,
                            handleClick: () => ({}),
                          }}
                          layoutClassName={styles.popup}
                        />
                      </div>
                    )}
                  </>
                )}
                {_getPublication.data?.data?.embedded?.nl?.embedded?.commonground?.rating &&
                  _getPublication.data?.data?.embedded?.nl?.embedded?.commonground?.rating !== 0 && (
                    <Button
                      tabIndex={-1}
                      className={clsx(
                        styles[
                          _.camelCase(
                            t(
                              `${getCommongroundRating(
                                _getPublication.data?.data?.embedded?.nl?.embedded?.commonground?.rating ?? 0,
                              )} ratingButton`,
                            ),
                          )
                        ],
                        styles.commongroundRating,
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content={`${t("This component has a rating of")} ${t(
                        getCommongroundRating(
                          _getPublication.data?.data?.embedded?.nl?.embedded?.commonground?.rating ?? 0,
                        ),
                      )}`}
                    >
                      <Icon>
                        {getCommongroundImage(
                          _getPublication.data?.data?.embedded?.nl?.embedded?.commonground?.rating ?? 0,
                        )}
                      </Icon>
                      {t("Common Ground rating")}
                    </Button>
                  )}
              </div>
            </div>
          </div>

          <div className={styles.cardsHeaderContainer}>
            <Heading3 className={styles.cardsHeading}>{t("Application")}</Heading3>
            <Heading3 className={styles.cardsHeading}>{t("Organization")}</Heading3>
            <Heading3 className={styles.cardsHeading}>{t("Rating")}</Heading3>
          </div>

          <div className={styles.cardsContainer}>
            {getApplicationComponent.isLoading && (
              <div className={styles.organizationCardContainer}>
                <Skeleton height="232px" />
              </div>
            )}
            {getApplicationComponent.isSuccess &&
              (applicationComponent && applicationComponent.name !== _getPublication.data?.data?.name ? (
                <ComponentCard
                  key={applicationComponent._self?.id}
                  title={{
                    label: applicationComponent.name,
                    href: `/components/${applicationComponent.id ?? applicationComponent._self.id}`,
                  }}
                  description={applicationComponent.embedded?.description?.shortDescription}
                  layer={applicationComponent.embedded?.nl?.embedded?.commonground?.layerType ?? "Unknown"}
                  categories={applicationComponent.categories}
                  tags={{
                    rating: {
                      rating: applicationComponent.embedded?.rating?.rating,
                      maxRating: applicationComponent.embedded?.rating?.maxRating,
                    },
                    ratingCommonground: {
                      rating: applicationComponent.embedded?.nl?.embedded?.commonground?.rating,
                    },
                    status: applicationComponent.developmentStatus,
                    installations: applicationComponent.usedBy?.length.toString() ?? "0",
                    organization: {
                      name: applicationComponent.embedded?.url?.embedded?.organisation?.name,
                      website: applicationComponent.embedded?.url?.embedded?.organisation?.website,
                    },
                    licence: applicationComponent.embedded?.legal?.license,
                    githubLink: applicationComponent.embedded?.url?.url,
                  }}
                  layoutClassName={styles.organizationCardContainer}
                />
              ) : (
                application && (
                  <ApplicationCard
                    key={application._self.id}
                    title={{ label: application.name, href: `/applications/${application._self.id}` }}
                    description={application.shortDescription}
                    tags={{
                      organization: application?.embedded?.owner?.fullName,
                      githubLink: application?.demoUrl,
                    }}
                    layoutClassName={styles.organizationCardContainer}
                  />
                )
              ))}
            {!getApplicationComponent.isLoading && !_getPublication?.data?.data?.embedded?.applicationSuite && (
              <span className={styles.noOrganizationCardAvailable}>{t("No application found")}</span>
            )}

            {organisation && (
              <OrganizationCard
                title={{
                  label: organisation.title,
                  href: `/organizations/${organisation?.id}`,
                }}
                description={organisation.description}
                website={organisation.website}
                logo={organisation.image}
                components={{
                  owned: organisation.owns?.length.toString() ?? "0",
                  supported: organisation.supports?.length.toString() ?? "0",
                  used: organisation.uses?.length.toString() ?? "0",
                }}
                gitHub={organisation.github}
                gitLab={organisation.gitlab}
                type={"Organization"}
                layoutClassName={styles.organizationCardContainer}
                contactInfo={publicationData?.contactPoint}
              />
            )}
            {!_getPublication?.data?.data?.organization && (
              <span className={styles.noOrganizationCardAvailable}>{t("No organization found")}</span>
            )}
            <InfoCard
              title=""
              content={
                <>
                  {(ratingFilter === "OpenCatalogi" || ratingFilter === "false") && (
                    <>
                      {_getPublication.data?.data?.embedded?.rating && (
                        <>
                          <RatingIndicatorTemplate
                            layoutClassName={styles.ratingIndicatorContainer}
                            maxRating={rating.maxRating}
                            rating={rating.rating}
                          />
                          <span className={styles.link}>
                            <Link
                              onClick={(e) => {
                                e.preventDefault(), openModal(() => show());
                              }}
                              href={`${_getPublication.data?.data?.id}/?openratingpopup`}
                            >
                              <Icon>
                                <IconArrowRight />
                              </Icon>
                              {t("Rating")}
                            </Link>
                          </span>
                        </>
                      )}
                      {!rating && <div className={styles.noRatingStyle}>{t("No rating available")}</div>}
                    </>
                  )}
                  {ratingFilter === "Commonground" && (
                    <>
                      <div
                        className={clsx(
                          styles[
                            _.camelCase(
                              t(
                                `${getCommongroundRating(
                                  _getPublication.data?.data?.embedded?.nl?.embedded?.commonground?.rating ?? "0",
                                )} rating`,
                              ),
                            )
                          ],
                          styles.commongroundRating,
                        )}
                      >
                        {getCommongroundImage(
                          _getPublication.data?.data?.embedded?.nl?.embedded?.commonground?.rating ?? "0",
                        )}
                      </div>
                    </>
                  )}
                </>
              }
              layoutClassName={clsx(styles.infoCard, ratingFilter === "Commonground" && styles.infoCardCommonground)}
            />

            {isVisible && (
              <div className={styles.overlay}>
                <NotificationPopUp
                  {...{ hide, isVisible }}
                  title={`${t("Rating")} (${rating?.rating}/${rating?.maxRating})`}
                  customContent={<RatingOverview {...{ rating }} />}
                  primaryButton={{
                    label: t("Score calculation"),
                    handleClick: () => {
                      navigate("/documentation/about#score-calculation");
                    },
                  }}
                  secondaryButton={{
                    label: t("Close"),
                    icon: <FontAwesomeIcon icon={faArrowLeft} />,
                    href: `${_getPublication.data?.data?.id}`,
                    handleClick: () => ({}),
                  }}
                  layoutClassName={styles.popup}
                />
              </div>
            )}
          </div>
          {(_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open ||
            getConfigComponents.data?.results?.length > 0 ||
            _getPublication.data?.data?.embedded?.supportedBy?.length > 0 ||
            _getPublication.data?.data?.embedded?.usedBy?.length > 0 ||
            getConfigComponents.data?.results?.length > 0 ||
            _getPublication.data?.data?.attachments ||
            _getPublication.data?.data?.data) && (
            <div id="Tabs" ref={tabsRef}>
              <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                  {_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open && (
                    <Tab>
                      <span>Componenten & Afhankelijkheden</span>
                      <BadgeCounter className={styles.badgeLayout}>
                        {_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open.length ?? 0}
                      </BadgeCounter>
                    </Tab>
                  )}
                  {_getPublication.data?.data?.embedded?.supportedBy && (
                    <Tab>
                      <span>{t("Suppliers")}</span>
                      <BadgeCounter className={styles.badgeLayout}>
                        {_getPublication.data?.data?.embedded?.supportedBy?.length ?? 0}
                      </BadgeCounter>
                    </Tab>
                  )}
                  {_getPublication.data?.data?.embedded?.usedBy && (
                    <Tab>
                      <span>{t("Reuse")}</span>
                      <BadgeCounter className={styles.badgeLayout}>
                        {_getPublication.data?.data?.embedded?.usedBy?.length ?? 0}
                      </BadgeCounter>
                    </Tab>
                  )}
                  {_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open && (
                    <Tab>
                      <span>{t("Schema's")}</span>
                      <BadgeCounter className={styles.badgeLayout}>
                        {_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open.length ?? 0}
                      </BadgeCounter>
                    </Tab>
                  )}
                  {_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open && (
                    <Tab>
                      <span>{t("Processes")}</span>
                      <BadgeCounter className={styles.badgeLayout}>
                        {_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open.length ?? 0}
                      </BadgeCounter>
                    </Tab>
                  )}
                  {getConfigComponents.data?.results?.length > 0 && (
                    <Tab>
                      <span>{t("Configurations")}</span>
                      <BadgeCounter className={styles.badgeLayout}>
                        {getConfigComponents.data?.results?.length ?? 0}
                      </BadgeCounter>
                    </Tab>
                  )}
                  {_getPublication.data?.attachments?.length > 0 && (
                    <Tab>
                      <span>{t("Attachments")}</span>
                      <BadgeCounter className={styles.badgeLayout}>
                        {_getPublication.data?.attachments?.length ?? 0}
                      </BadgeCounter>
                    </Tab>
                  )}
                  {_getPublication.data?.data?.data && (
                    <Tab>
                      <span>{t("Extensies")}</span>
                    </Tab>
                  )}
                </TabList>
                {_getPublication.data?.data?.embedded?.dependsOn && (
                  <TabPanel>
                    <div className={styles.components}>
                      {_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open && (
                        <DisplaySwitch
                          buttons={displaySwitchButtons}
                          layoutClassName={styles.dependenciesDisplaySwitchButtons}
                        />
                      )}

                      <DependenciesTemplate
                        type={resultDisplayLayout.dependenciesDisplayLayout}
                        components={_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open ?? []}
                        mainComponent={{
                          id: publicationId,
                          name: _getPublication.data?.data?.name,
                          layer: _getPublication.data?.data?.embedded?.nl?.embedded?.commonground?.layerType,
                        }}
                      />
                    </div>
                  </TabPanel>
                )}
                {_getPublication.data?.data?.embedded?.supportedBy?.length > 0 && (
                  <TabPanel>
                    <Table className={styles.table}>
                      <TableHeader className={styles.tableHeader}>
                        <TableRow>
                          <TableHeaderCell>{t("Name")}</TableHeaderCell>
                          {/* This table row should be visible when the organization has a maintenanceType. feature will come in the future. */}
                          {/* <TableHeaderCell>{t("Type of support")}</TableHeaderCell>  */}
                          <TableHeaderCell>{t("Email")}</TableHeaderCell>
                          <TableHeaderCell>{t("Phone number")}</TableHeaderCell>
                          <TableHeaderCell>{t("Website")}</TableHeaderCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody className={styles.tableBody}>
                        {_getPublication.data?.data?.embedded?.supportedBy?.map((organization: any) => (
                          <TableRow className={styles.tableRow} key={organization?._self.id}>
                            <TableCell>{organization?.name}</TableCell>
                            {/* This table row should be visible when the organization has a maintenanceType. feature will come in the future. */}
                            {/* <TableCell>
                            {organization?.maintenanceType && organization?.maintenanceType !== ""
                              ? organization?.maintenanceType
                              : t("Unavailable")}
                          </TableCell> */}

                            <TableCell>
                              {organization?.email && organization?.email !== "" ? (
                                <Link
                                  onClick={(e: any) => {
                                    e.preventDefault(), navigate(`mailto:${organization?.email}`);
                                  }}
                                  href={`mailto:${organization?.email}`}
                                  aria-label={`${t("Email")}, ${organization?.email}`}
                                >
                                  {organization?.email}
                                </Link>
                              ) : (
                                t("Unavailable")
                              )}
                            </TableCell>
                            <TableCell>
                              {organization?.phone && organization?.phone !== "" ? (
                                <Link
                                  onClick={(e: any) => {
                                    e.preventDefault(), navigate(`tel:${organization?.phone}`);
                                  }}
                                  href={`tel:${organization?.phone}`}
                                  aria-label={`${t("Phone number")}, ${organization?.phone}`}
                                >
                                  {organization?.phone}
                                </Link>
                              ) : (
                                t("Unavailable")
                              )}
                            </TableCell>
                            <TableCell>
                              {organization?.website && organization?.website !== "" ? (
                                <Link
                                  onClick={(e: any) => {
                                    e.preventDefault(), open(organization?.website ?? "");
                                  }}
                                  href={organization?.website ?? ""}
                                  aria-label={
                                    organization?.website
                                      ? `${t("Website")}, ${organization?.website
                                          .replace("https://", "www.")
                                          .replace("/", "")}, ${t("Opens a new window")}`
                                      : ""
                                  }
                                >
                                  {organization?.website.replace("https://", "www.").replace("/", "")}
                                </Link>
                              ) : (
                                t("Unavailable")
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabPanel>
                )}
                {_getPublication.data?.data?.embedded?.usedBy?.length > 0 && (
                  <TabPanel>
                    <div className={styles.organizations}>
                      {_getPublication.data?.data?.embedded?.usedBy?.map((organization: any) => (
                        <OrganizationCard
                          key={organization._self.id}
                          title={{
                            label: organization?.name,
                            href: `/organizations/${organization._self.id}`,
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
                  </TabPanel>
                )}
                {_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open && (
                  <TabPanel>
                    <ComponentCardsAccordionTemplate
                      components={_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open}
                    />
                  </TabPanel>
                )}
                {_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open && (
                  <TabPanel>
                    <ComponentCardsAccordionTemplate
                      components={_getPublication.data?.data?.embedded?.dependsOn?.embedded?.open}
                    />
                  </TabPanel>
                )}
                {getConfigComponents.data?.results?.length > 0 && (
                  <TabPanel>
                    <div className={styles.organizations}>
                      {getConfigComponents.data?.results?.map((component: any) => {
                        return (
                          <ComponentCard
                            key={component._self?.id}
                            title={{
                              label: component.name,
                              href: `/components/${component.id ?? component._self.id}`,
                            }}
                            description={component.embedded?.description?.shortDescription}
                            layer={component.embedded?.nl?.embedded?.commonground?.layerType ?? "Unknown"}
                            categories={component.categories}
                            tags={{
                              rating: {
                                rating: component.embedded?.rating?.rating,
                                maxRating: component.embedded?.rating?.maxRating,
                              },
                              ratingCommonground: {
                                rating: component.embedded?.nl?.embedded?.commonground?.rating,
                              },
                              status: component.developmentStatus,
                              installations: component.usedBy?.length.toString() ?? "0",
                              organization: {
                                name: component.embedded?.url?.embedded?.organisation?.name,
                                website: component.embedded?.url?.embedded?.organisation?.website,
                              },
                              licence: component.embedded?.legal?.license,
                              githubLink: component.embedded?.url?.url,
                            }}
                          />
                        );
                      })}
                    </div>
                  </TabPanel>
                )}
                {_getPublication.data?.attachments?.length > 0 && (
                  <TabPanel>
                    <HorizontalOverflowWrapper
                      ariaLabels={{
                        scrollLeftButton: t("Left scroll button"),
                        scrollRightButton: t("Right scroll button"),
                      }}
                    >
                      <Table className={styles.table}>
                        <TableHeader className={styles.tableHeader}>
                          <TableRow>
                            <TableHeaderCell>{t("Name")}</TableHeaderCell>
                            <TableHeaderCell>{t("Description")}</TableHeaderCell>
                            <TableHeaderCell>{t("License")}</TableHeaderCell>
                            <TableHeaderCell>{t("Type")}</TableHeaderCell>
                            <TableHeaderCell>{t("Published")}</TableHeaderCell>
                            <TableHeaderCell>{t("Modified")}</TableHeaderCell>
                            <TableHeaderCell>{t("Access url")}</TableHeaderCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody className={styles.tableBody}>
                          {_getPublication?.data?.attachments.map((attachment: any) => {
                            return attachment.published === "false" ? (
                              <></>
                            ) : (
                              <TableRow className={styles.tableRow}>
                                <TableCell className={styles.title}>{attachment.title}</TableCell>
                                <TableCell className={styles.description}>
                                  <div
                                    data-tooltip-id={attachment.description.length > 100 && TOOLTIP_ID}
                                    data-tooltip-content={attachment.description}
                                  >
                                    {attachment.description.length > 100
                                      ? `${attachment.description.substring(0, 100)}...`
                                      : attachment.description}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <DataBadge
                                    className={styles.tagWidth}
                                    data-tooltip-id={TOOLTIP_ID}
                                    data-tooltip-content={t("License")}
                                  >
                                    <FontAwesomeIcon icon={faScroll} />
                                    {attachment.license}
                                  </DataBadge>
                                </TableCell>
                                <TableCell>{attachment.type}</TableCell>
                                <TableCell>
                                  <span className={styles.date}>{attachment.published}</span>
                                </TableCell>
                                <TableCell>
                                  <span className={styles.date}>{attachment.modified}</span>
                                </TableCell>
                                <TableCell>
                                  <Link
                                    onClick={(e) => {
                                      e.preventDefault(), open(attachment.downloadURL);
                                    }}
                                    href={`/publications/${_getPublication.data?.data?.id}`}
                                    className={styles.tagWidth}
                                  >
                                    {t("Access url")}
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </HorizontalOverflowWrapper>
                  </TabPanel>
                )}
                {publicationData && (
                  <TabPanel>
                    <HorizontalOverflowWrapper
                      ariaLabels={{
                        scrollLeftButton: t("Left scroll button"),
                        scrollRightButton: t("Right scroll button"),
                      }}
                    >
                      <Table className={styles.table}>
                        <TableBody className={styles.tableBody}>
                          {/* Keep commented out for reverting purposes */}
                          {/* {publicationData?.contactPoint && (
                            <TableRow className={styles.tableRow}>
                              <TableCell className={styles.title}>Contact:</TableCell>
                              <TableCell>
                                <div className={styles.publicationDataContact}>
                                  <span>{`${t("Name")}: ${publicationData?.contactPoint?.name}`}</span>
                                  <span>{`${t("Email")}: ${publicationData?.contactPoint?.email}`}</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          )} */}

                          {publicationData?.qualifiedAttribution && (
                            <TableRow className={styles.tableRow}>
                              <TableCell className={styles.title}>Toeschrijving:</TableCell>
                              <TableCell>
                                <div className={styles.publicationDataContact}>
                                  <span>{`${t("Name")}: ${publicationData?.contactPoint?.name}`}</span>
                                  <span>{`${t("Email")}: ${publicationData?.contactPoint?.email}`}</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}

                          {publicationData?.bedrijfsservices && (
                            <TableRow className={styles.tableRow}>
                              <TableCell className={styles.title}>Bedrijfsservices:</TableCell>
                              <TableCell className={styles.description}>
                                {publicationData.bedrijfsservices.join(", ")}
                              </TableCell>
                            </TableRow>
                          )}

                          {publicationData?.model && (
                            <TableRow className={styles.tableRow}>
                              <TableCell className={styles.title}>Model:</TableCell>
                              <TableCell className={styles.description}>{publicationData.model}</TableCell>
                            </TableRow>
                          )}

                          {publicationData?.spatial > 0 && (
                            <TableRow className={styles.tableRow}>
                              <TableCell className={styles.title}>Referentie componenten:</TableCell>
                              <TableCell className={styles.description}>{publicationData.spatial.join(", ")}</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </HorizontalOverflowWrapper>
                  </TabPanel>
                )}
              </Tabs>
            </div>
          )}
        </>
      )}
      {_getPublication.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
