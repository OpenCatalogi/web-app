import * as React from "react";
import * as styles from "./PublicationsDetailTemplate.module.css";
import _ from "lodash";
import Skeleton from "react-loading-skeleton";
import componentPlacholderLogo from "../../assets/images/grey.png";
import {
  Heading,
  Icon,
  DataBadge,
  BadgeCounter,
  Link,
  TableHeader,
  TableHeaderCell,
  Heading3,
} from "@utrecht/component-library-react/dist/css-module";
import { Container, Tabs, TabList, Tab, TabPanel, HorizontalOverflowWrapper } from "@conduction/components";
import { navigate } from "gatsby";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableRow } from "@utrecht/component-library-react/dist/css-module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrush, faClock, faHouse, faList, faScroll, faTag } from "@fortawesome/free-solid-svg-icons";
import { OrganizationCard } from "../../components/organizationCard/OrganizationCard";
import { ExpandableLeadParagraph } from "../../components/expandableLeadParagraph/ExpandableLeadParagraph";
import { TOOLTIP_ID } from "../../layout/Layout";
// TODO: uncomment
// import { usePublication } from "../../hooks/publication";
import { translateDate } from "../../services/dateFormat";
import { TEMPORARY_PUBLICATION } from "../../data/publications";

interface PublicationsDetailTemplateProps {
  publicationId: string;
}

export const PublicationsDetailTemplate: React.FC<PublicationsDetailTemplateProps> = ({ publicationId }) => {
  const { t } = useTranslation();

  const [tabIndex, setTabIndex] = React.useState(0);

  const tabsRef: any = React.useRef();
  // TODO: uncomment
  //   const _usePublication = usePublication(queryClient);
  //   const _getPublication = _usePublication.getOne(publicationId);
  const _getPublication = TEMPORARY_PUBLICATION;

  const organisation = _getPublication?.catalogi?.organisation;

  const imageHasValidSource = (src: string): boolean => {
    try {
      const url = new URL(src);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
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

      {_getPublication && (
        <>
          <div className={styles.headingContainer}>
            <div className={styles.headingContent}>
              <Heading level={1} className={styles.componentName}>
                {_getPublication?.title}
              </Heading>

              <ExpandableLeadParagraph description={_getPublication?.description ?? t("No description available")} />
            </div>

            <div className={styles.addToCatalogusContainer}>
              <div className={styles.logoContainer}>
                <img
                  src={imageHasValidSource(_getPublication.image) ? _getPublication.image : componentPlacholderLogo}
                  className={styles.logo}
                />
              </div>
              <div className={styles.tags}>
                {organisation?.title && (
                  <DataBadge
                    className={styles.clickableBadge}
                    onClick={() => {
                      navigate("/organizations/" + organisation.id);
                    }}
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content="Organisatie"
                  >
                    <FontAwesomeIcon icon={faHouse} />
                    {organisation.title}
                  </DataBadge>
                )}

                {_getPublication.reference && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Referentie">
                    <FontAwesomeIcon icon={faTag} />
                    {_getPublication.reference}
                  </DataBadge>
                )}
                {_getPublication.category && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Category">
                    <FontAwesomeIcon icon={faList} />
                    {_.upperFirst(_getPublication.category)}
                  </DataBadge>
                )}
                {_getPublication.themes &&
                  _getPublication.themes.map((theme, idx) => (
                    <DataBadge key={idx} data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Theme">
                      <FontAwesomeIcon icon={faBrush} />
                      {_.upperFirst(theme)}
                    </DataBadge>
                  ))}
                {_getPublication.license && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content="Licentie">
                    <FontAwesomeIcon icon={faScroll} />
                    {_getPublication.license}
                  </DataBadge>
                )}
                {_getPublication.published && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("Published")}>
                    <FontAwesomeIcon icon={faClock} />
                    {/*@ts-expect-error*/}
                    {translateDate("nl", _getPublication.published)}
                  </DataBadge>
                )}
                {_getPublication.modified && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("Modified")}>
                    <FontAwesomeIcon icon={faClock} />
                    {/*@ts-expect-error*/}
                    {translateDate("nl", _getPublication.modified)}
                  </DataBadge>
                )}
              </div>
            </div>
          </div>

          <div className={styles.cardsHeaderContainer}>
            <Heading3 className={styles.cardsHeading}>{t("Catalogi")}</Heading3>
            <Heading3 className={styles.cardsHeading}>MetaData</Heading3>
            <Heading3 className={styles.cardsHeading}>{t("Organization")}</Heading3>
          </div>

          <div className={styles.cardsContainer}>
            {!organisation && <span className={styles.noOrganizationCardAvailable}>{t("No organization found")}</span>}
            {_getPublication.catalogi && (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <b>{t("Title")}</b>
                    </TableCell>
                    <TableCell>{_getPublication.catalogi.title ?? t("No title known")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>{t("Summary")}</b>
                    </TableCell>
                    <TableCell>{_getPublication.catalogi.summary ?? t("No version known")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>{t("Description")}</b>
                    </TableCell>
                    <TableCell>{_getPublication.catalogi.description ?? t("No description known")}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
            {!organisation && <span className={styles.noOrganizationCardAvailable}>{t("No catalogus found")}</span>}
            {_getPublication.catalogi.metadata && (
              <Table>
                <TableHeader>
                  <TableHeaderCell>{t("Title")}</TableHeaderCell>
                  <TableHeaderCell>{t("Version")}</TableHeaderCell>
                  <TableHeaderCell>{t("Description")}</TableHeaderCell>
                </TableHeader>
                <TableBody>
                  {_getPublication.catalogi.metadata.map((data, idx) => (
                    <TableRow key={`${data.id}-${idx}`}>
                      <TableCell>{data.title || t("No title known")}</TableCell>
                      <TableCell>{data.version || t("No version known")}</TableCell>
                      <TableCell>{data.description || t("No description known")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {!_getPublication.catalogi.metadata && (
              <span className={styles.noOrganizationCardAvailable}>{t("No metadata found")}</span>
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
                contactInfo={organisation.contactInformation}
              />
            )}
          </div>
          {_getPublication.attachments && (
            <div id="Tabs" ref={tabsRef}>
              <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                  {_getPublication.attachments?.length > 0 && (
                    <Tab>
                      <span>{t("Attachments")}</span>
                      <BadgeCounter className={styles.badgeLayout}>
                        {_getPublication.attachments?.length ?? 0}
                      </BadgeCounter>
                    </Tab>
                  )}
                </TabList>

                {_getPublication.attachments?.length > 0 && (
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
                            <TableHeaderCell>{t("Download url")}</TableHeaderCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody className={styles.tableBody}>
                          {_getPublication?.attachments.map((attachment: any) => {
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
                                  <span className={styles.date}>{translateDate("nl", attachment.published)}</span>
                                </TableCell>
                                <TableCell>
                                  <span className={styles.date}>{translateDate("nl", attachment.modified)}</span>
                                </TableCell>
                                <TableCell>
                                  <Link
                                    onClick={(e) => {
                                      e.preventDefault(), open(attachment.accessURL);
                                    }}
                                    href={`/publications/${_getPublication.id}`}
                                    className={styles.tagWidth}
                                  >
                                    {t("Access url")}
                                  </Link>
                                </TableCell>
                                <TableCell>
                                  <Link
                                    onClick={(e) => {
                                      e.preventDefault(), open(attachment.downloadURL);
                                    }}
                                    href={`/publications/${_getPublication.id}`}
                                    className={styles.tagWidth}
                                  >
                                    {t("Download url")}
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
              </Tabs>
            </div>
          )}
        </>
      )}
      {/* @ts-expect-error */}
      {_getPublication.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
