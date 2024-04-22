import * as React from "react";
import * as styles from "./OrganizationDetailTemplate.module.css";
import { Container, Tabs, TabList, Tab, TabPanel } from "@conduction/components";
import {
  Heading,
  DataBadge,
  Icon,
  Button,
  Separator,
  BadgeCounter,
  Link,
} from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { QueryClient } from "react-query";
import { useOrganization } from "../../hooks/organization";
import Skeleton from "react-loading-skeleton";
import organizationPlaceholderImage from "../../assets/images/grey.png";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { GitLabLogo } from "../../assets/svgs/GitLab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCertificate, faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { ExpandableLeadParagraph } from "../../components/expandableLeadParagraph/ExpandableLeadParagraph";
import { TOOLTIP_ID } from "../../layout/Layout";
import { ComponentCard } from "../../components";

interface OrganizationDetailTemplateProps {
  organizationId: string;
}

export const OrganizationDetailTemplate: React.FC<OrganizationDetailTemplateProps> = ({ organizationId }) => {
  const { t } = useTranslation();
  const queryClient = new QueryClient();
  const _useOrganization = useOrganization(queryClient);
  const _getOrganization = _useOrganization.getOne(organizationId);

  return (
    <Container layoutClassName={styles.container}>
      <Link
        className={styles.backButton}
        onClick={(e) => {
          e.preventDefault(), navigate("/organizations");
        }}
        href="/organizations"
      >
        <Icon>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Icon>
        {t("Back to organizations")}
      </Link>

      {_getOrganization.isSuccess && (
        <>
          <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
              <Heading level={1} className={styles.title}>
                {_getOrganization.data.name}
              </Heading>

              <ExpandableLeadParagraph
                description={_getOrganization.data.description ?? t("There is no description available")}
              />
            </div>

            <div className={styles.headerOrganizationData}>
              <div className={styles.logoContainer}>
                <img
                  className={styles.logo}
                  src={_getOrganization.data.logo ?? organizationPlaceholderImage}
                  alt="Organization logo"
                />
              </div>
              <div>
                <div className={styles.tagsContainer}>
                  {_getOrganization.data.github && (
                    <Button appearance="secondary-action-button" onClick={() => open(_getOrganization.data.github)}>
                      <GitHubLogo />
                      {t("GitHub")}
                    </Button>
                  )}
                  {_getOrganization.data.gitlab && (
                    <Button appearance="secondary-action-button" onClick={() => open(_getOrganization.data.gitlab)}>
                      <GitLabLogo />
                      {t("GitLab")}
                    </Button>
                  )}
                  {_getOrganization.data.website && (
                    <Button appearance="secondary-action-button" onClick={() => open(_getOrganization.data.website)}>
                      <FontAwesomeIcon icon={faGlobe} />
                      {_getOrganization.data.website}
                    </Button>
                  )}
                  {_getOrganization.data.phone && (
                    <Button
                      appearance="secondary-action-button"
                      onClick={() => navigate(`tel:${_getOrganization.data.phone}`)}
                    >
                      <FontAwesomeIcon icon={faPhone} />
                      {_getOrganization.data.phone}
                    </Button>
                  )}
                  {_getOrganization.data.email && (
                    <Button
                      appearance="secondary-action-button"
                      onClick={() => navigate(`mailto:${_getOrganization.data.email}`)}
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                      {_getOrganization.data.email}
                    </Button>
                  )}
                </div>
              </div>

              {_getOrganization.data.certificate && (
                <>
                  <Separator />

                  <div className={styles.tagsContainer}>
                    {_getOrganization.data.certificate.map((certificate: any, idx: number) => (
                      <DataBadge
                        key={idx}
                        data-tooltip-id={TOOLTIP_ID}
                        data-tooltip-content={certificate.name}
                        onClick={() => open(certificate.href)}
                      >
                        <FontAwesomeIcon icon={faCertificate} />
                        {certificate.name}
                      </DataBadge>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <Separator />

          <div className={styles.section}>
            <Heading level={2} className={styles.title}>
              {t("Components")}
            </Heading>
            <Tabs>
              <TabList>
                <Tab>
                  <span>Eigen componenten</span>
                  <BadgeCounter className={styles.badgeLayout}>{_getOrganization.data?.owns?.length ?? 0}</BadgeCounter>
                </Tab>
                <Tab>
                  <span>Ondersteunde componenten</span>
                  <BadgeCounter className={styles.badgeLayout}>
                    {_getOrganization.data?.supports?.length ?? 0}
                  </BadgeCounter>
                </Tab>
                <Tab>
                  <span>Gebruikte componenten</span>
                  <BadgeCounter className={styles.badgeLayout}>{_getOrganization.data?.uses?.length ?? 0}</BadgeCounter>
                </Tab>
              </TabList>
              <TabPanel>
                <div className={styles.components}>
                  {/* <ComponentCardsAccordionTemplate components={_getOrganization.data?.embedded?.owns ?? []} /> */}
                  <div className={styles.componentsGrid}>
                    {_getOrganization.data?.embedded?.owns?.length &&
                      _getOrganization.data?.embedded?.owns?.map((component: any) => (
                        <ComponentCard
                          key={component._self.id}
                          title={{ label: component.name, href: `/components/${component._self.id}` }}
                          description={component?.description?.shortDescription}
                          categories={component?.categories}
                          tags={{
                            status: component?.developmentStatus,
                            installations: component?.usedBy?.length.toString() ?? "0",
                            organization: {
                              name: component?.url?.organisation?.name,
                              website: component?.url?.organisation?.website,
                            },
                            licence: component?.legal?.license,
                            githubLink: component?.url?.url,
                          }}
                        />
                      ))}
                    {!_getOrganization.data?.embedded?.owns?.length && <>Geen resultaten gevonden.</>}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={styles.components}>
                  {/* <ComponentCardsAccordionTemplate components={_getOrganization.data?.embedded?.supports ?? []} /> */}
                  <div className={styles.componentsGrid}>
                    {_getOrganization.data?.embedded?.supports?.length &&
                      _getOrganization.data?.embedded?.supports?.map((component: any) => (
                        <ComponentCard
                          key={component._self.id}
                          title={{ label: component.name, href: `/components/${component._self.id}` }}
                          description={component?.description?.shortDescription}
                          categories={component?.categories}
                          tags={{
                            status: component?.developmentStatus,
                            installations: component?.usedBy?.length.toString() ?? "0",
                            organization: {
                              name: component?.url?.organisation?.name,
                              website: component?.url?.organisation?.website,
                            },
                            licence: component?.legal?.license,
                            githubLink: component?.url?.url,
                          }}
                        />
                      ))}
                    {!_getOrganization.data?.embedded?.supports?.length && <>Geen resultaten gevonden.</>}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={styles.components}>
                  {/* <ComponentCardsAccordionTemplate components={_getOrganization.data?.embedded?.uses ?? []} /> */}
                  <div className={styles.componentsGrid}>
                    {_getOrganization.data?.embedded?.uses?.length &&
                      _getOrganization.data?.embedded?.uses?.map((component: any) => (
                        <ComponentCard
                          key={component._self.id}
                          title={{ label: component.name, href: `/components/${component._self.id}` }}
                          description={component?.description?.shortDescription}
                          categories={component?.categories}
                          tags={{
                            status: component?.developmentStatus,
                            installations: component?.usedBy?.length.toString() ?? "0",
                            organization: {
                              name: component?.url?.organisation?.name,
                              website: component?.url?.organisation?.website,
                            },
                            licence: component?.legal?.license,
                            githubLink: component?.url?.url,
                          }}
                        />
                      ))}
                    {!_getOrganization.data?.embedded?.uses?.length && <>Geen resultaten gevonden.</>}
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </>
      )}
      {_getOrganization.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
