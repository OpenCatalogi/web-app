import * as React from "react";
import * as styles from "./DirectoryDetailTemplate.module.css";
import Skeleton from "react-loading-skeleton";
import _ from "lodash";
import {
  DataBadge,
  Heading,
  Heading3,
  Icon,
  Link,
  BadgeCounter,
} from "@utrecht/component-library-react/dist/css-module";
import { Container, Tab, TabList, TabPanel, Tabs } from "@conduction/components";
import { navigate } from "gatsby";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import { useDirectory } from "../../hooks/directory";
import { ExpandableLeadParagraph } from "../../components/expandableLeadParagraph/ExpandableLeadParagraph";
import { faHouse, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { TOOLTIP_ID } from "../../layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translateDate } from "../../services/dateFormat";
import { OrganizationCard } from "../../components";
import { MetadataCard } from "../../components/metadataCard/MetadataCard";
import JWT from "../../apiService/apiService";
import { getFileNameFromUrl } from "../../services/FileNameFromUrl";

interface DirectoryDetailTemplateProps {
  directoryId: string;
}

export const DirectoryDetailTemplate: React.FC<DirectoryDetailTemplateProps> = ({ directoryId }) => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [metadata, setMetadata] = React.useState<any>();

  const queryClient = new QueryClient();
  const _useDirectory = useDirectory(queryClient);
  const _getDirectory = _useDirectory.getOne(directoryId);

  const directory = _getDirectory.data;
  const organisation = directory?.organisation;

  React.useEffect(() => {
    if (!directory?.directory) return;
    const afterWithout = directory.directory.substring(0, directory.directory.lastIndexOf("/"));
    const authorization = JWT ? { Authorization: "Bearer " + JWT } : {};

    const fetchMetadata = async (): Promise<any> => {
      const fetchResults = fetch(`${afterWithout}/metadata`, {
        method: "get",
        headers: {
          Accept: "application/json",
        },
        ...authorization,
      });

      const getMetadata = await (await fetchResults).json();
      setMetadata(getMetadata.results);
    };
    fetchMetadata();
  }, [directory?.directory]);

  const directoryMetadata = metadata?.filter((metadata: any) => {
    const metadataFilteredIds = directory.metadata.map((metadata: string) => getFileNameFromUrl(metadata.toString()));

    return metadataFilteredIds.includes(metadata.id.toString());
  });

  const tabsRef: any = React.useRef();

  return (
    <Container layoutClassName={styles.container}>
      <Link
        className={styles.backButton}
        onClick={(e) => {
          e.preventDefault(), navigate("/directories");
        }}
        href="/directories"
      >
        <Icon>
          <IconArrowLeft />
        </Icon>
        {t("Back to directories")}
      </Link>

      {_getDirectory.isSuccess && (
        <>
          <div className={styles.headingContainer}>
            <div className={styles.headingContent}>
              <Heading level={1} className={styles.componentName}>
                {directory.title}
              </Heading>

              <ExpandableLeadParagraph
                description={directory.description ?? directory.summary ?? t("No description available")}
              />

              <div className={styles.tags}>
                {directory.lastSync && (
                  <DataBadge data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("Last sync")}>
                    <FontAwesomeIcon icon={faRepeat} />
                    {translateDate("nl", directory.lastSync)}
                  </DataBadge>
                )}

                {organisation?.title && (
                  <DataBadge
                    className={styles.clickableBadge}
                    onClick={() => {
                      navigate("/organizations/" + organisation._self?.id);
                    }}
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content="Organisatie"
                  >
                    <FontAwesomeIcon icon={faHouse} />
                    {organisation.title}
                  </DataBadge>
                )}
              </div>
            </div>
          </div>
          <div className={styles.cardsHeaderContainer}>
            <Heading3 className={styles.cardsHeading}>{t("Organization")}</Heading3>
          </div>

          <div className={styles.cardsContainer}>
            {organisation && (
              <OrganizationCard
                title={{
                  label: organisation.title,
                  href: `/organizations/${organisation.id}`,
                }}
                description={organisation.summary}
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
            {!organisation && <span className={styles.noOrganizationCardAvailable}>{t("No organization found")}</span>}
          </div>
          <div id="Tabs" ref={tabsRef}>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
              <TabList>
                {directory.metadata && (
                  <Tab>
                    <span>{t("MetaData")}</span>
                    <BadgeCounter className={styles.badgeLayout}>{directory.metadata?.length ?? 0}</BadgeCounter>{" "}
                  </Tab>
                )}
              </TabList>
              {directory.metadata && (
                <TabPanel>
                  {directoryMetadata?.length !== 0 && (
                    <div className={styles.metaDataGrid}>
                      {directoryMetadata?.map((metadata: any, idx: number) => (
                        <MetadataCard
                          key={idx}
                          title={metadata.title}
                          description={metadata.summary}
                          tags={{
                            version: metadata.version,
                            properties: _.size(metadata.properties).toString() ?? "0",
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {directoryMetadata?.length === 0 && <div>No metadata found in current directory</div>}
                </TabPanel>
              )}
            </Tabs>
          </div>
        </>
      )}

      {_getDirectory.isLoading && <Skeleton height="200px" />}
    </Container>
  );
};
