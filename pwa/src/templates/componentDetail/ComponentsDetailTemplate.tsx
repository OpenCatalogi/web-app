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
import { faHouse, faInfoCircle, faLayerGroup, faRepeat, faScroll } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { ComponentCardsAccordionTemplate } from "../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";
import { ToolTip } from "../../components/toolTip/ToolTip";
import { categories, TCategories } from "../../data/categories";
import { GitHubLogo } from "../../assets/svgs/GitHub";
import { BadgeCounter } from "../../components/badgeCounter/BadgeCounter";

interface ComponentsDetailTemplateProps {
  componentId: string;
}

export const ComponentsDetailTemplate: React.FC<ComponentsDetailTemplateProps> = ({ componentId }) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState<number>(0);

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
            <div>
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
                {_getComponent.data.usedBy?.length && (
                  <ToolTip tooltip="Installaties">
                    <Tag
                      label={_.toString(_getComponent.data.usedBy?.length)}
                      icon={<FontAwesomeIcon icon={faRepeat} />}
                    />
                  </ToolTip>
                )}
                {!_getComponent.data.usedBy?.length && (
                  <ToolTip tooltip="Installaties">
                    <Tag label="0" icon={<FontAwesomeIcon icon={faRepeat} />} />
                  </ToolTip>
                )}
                {_getComponent.data.embedded?.legal.embedded?.repoOwner.name && (
                  <ToolTip tooltip="Organisatie">
                    <Tag
                      label={_getComponent.data.embedded?.legal.embedded?.repoOwner.name}
                      icon={<FontAwesomeIcon icon={faHouse} />}
                    />
                  </ToolTip>
                )}
              </div>
            </div>

            <div className={styles.addToCatalogusContainer}>
              <img src={grey} className={styles.componentImg} />
              <Button icon={<ExternalLinkIcon />}>Toevoegen aan catalogus</Button>
            </div>
          </div>

          <div className={styles.cardsContainer}>
            <InfoCard
              title="Organisatie"
              content={
                <>
                  {_getComponent.data.embedded?.legal.embedded?.repoOwner.name && (
                    <div>
                      Dit component wordt aangeboden door{" "}
                      <span onClick={() => navigate("/organizations/f9d9190e-74f0-4e91-a5d8-0f0e6dad2bd0")}>
                        <Link icon={<ArrowRightIcon />} iconAlign="start">
                          {_getComponent.data.embedded?.legal.embedded?.repoOwner.name}
                        </Link>
                        .
                      </span>
                    </div>
                  )}
                  {!_getComponent.data.embedded?.legal.embedded?.repoOwner.name && "Er is geen informatie beschikbaar."}
                </>
              }
            />
            <InfoCard
              title="Github"
              content={
                <>
                  {_getComponent.data.embedded?.url?.url && (
                    <div>
                      De broncode van dit component is te vinden op{" "}
                      <span onClick={() => open(_getComponent.data.embedded?.url?.url)}>
                        <Link icon={<ExternalLinkIcon />} iconAlign="start">
                          GitHub
                        </Link>
                      </span>
                      .
                    </div>
                  )}
                  {!_getComponent.data.embedded?.url?.url && "Er is geen informatie beschikbaar."}
                </>
              }
            />
            <InfoCard
              title="Licentie"
              content={
                <>
                  {_getComponent.data.embedded?.legal.license && (
                    <div>
                      De licentie van dit component is{" "}
                      <Tag
                        label={_getComponent.data.embedded?.legal.license}
                        icon={<FontAwesomeIcon icon={faScroll} />}
                      />
                    </div>
                  )}
                  {!_getComponent.data.embedded?.legal.license && "Er is geen informatie beschikbaar."}
                </>
              }
            />
            <InfoCard title="" content={<RatingIndicatorTemplate component={_getComponent.data} />} />
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
                      stylingClassName={styles.badgeStyle}
                      number={TempComponentsDependencies.length}
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
                    <BadgeCounter
                      layoutClassName={styles.badgeLayout}
                      stylingClassName={styles.badgeStyle}
                      number={TempComponentsSchema.length}
                    >
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
                      stylingClassName={styles.badgeStyle}
                      number={TempComponentsProcesses.length}
                    >
                      {t("Processes")}
                    </BadgeCounter>
                  }
                  value={4}
                />
              </Tabs>

              <TabPanel className={styles.tabPanel} value="0">
                <div className={styles.components}>
                  <ComponentCardsAccordionTemplate components={TempComponentsDependencies} />
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
