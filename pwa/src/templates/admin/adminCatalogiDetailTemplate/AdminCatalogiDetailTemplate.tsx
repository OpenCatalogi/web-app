import * as React from "react";
import * as styles from "./AdminCatalogiDetailTemplate.module.css";
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
import { Container, BadgeCounter, InfoCard } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, CallIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { TEMPORARY_COMPONENTS } from "../../../data/components";
import { Tag } from "../../../components/tag/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import componentPlacholderLogo from "../../../assets/images/grey.png";
import { faCircleNodes, faInfoCircle, faLayerGroup, faRepeat } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { ToolTip } from "../../../components/toolTip/ToolTip";
import { categories as _categories } from "../../../data/filters";
import { GitHubLogo } from "../../../assets/svgs/GitHub";
import { DependenciesTemplate } from "../../templateParts/dependenciesTemplates/ComponentDependenciesTemplate";
import { FiltersContext } from "../../../context/filters";
import { ComponentCardsAccordionTemplate } from "../../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";
import { AdminTemplate } from "../../templateParts/adminTemplate/AdminTemplate";
import { categories, TCategories } from "../../../data/categories";
import { RatingIndicatorTemplate } from "../../templateParts/ratingIndicator/RatingIndicatorTemplate";

interface AdminCatalogiDetailTemplateProps {
  catalogiId: string;
}

export const AdminCatalogiDetailTemplate: React.FC<AdminCatalogiDetailTemplateProps> = ({ catalogiId }) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const [filters, setFilters] = React.useContext(FiltersContext);

  const tempComponent =
    TEMPORARY_COMPONENTS.find((component: any) => component.id === catalogiId) ?? TEMPORARY_COMPONENTS[1];

  const TempComponentsDependencies = TEMPORARY_COMPONENTS.slice(1, 9);
  const TempComponentsSchema = TEMPORARY_COMPONENTS.slice(0, 1);
  const TempComponentsProcesses = TEMPORARY_COMPONENTS.slice(11, 15);

  const layer: TCategories = t(_.upperFirst(tempComponent.embedded?.nl.embedded.commonground.layerType));
  const category =
    layer &&
    categories[layer].find((category) => {
      return tempComponent.categories.includes(category.value);
    });

  return (
    <AdminTemplate>
      <Container>
        <div className={styles.backButton} onClick={() => navigate("/admin/catalogi")}>
          <Link icon={<ArrowLeftIcon />} iconAlign="start">
            {t("Back to catalogi")}
          </Link>
        </div>

        <>
          <div className={styles.headingContainer}>
            <div className={styles.headingContent}>
              <Heading1>{tempComponent.name}</Heading1>

              <LeadParagraph className={styles.description}>
                {tempComponent.description ??
                  `Documenten API,Een API om een documentregistratiecomponent (DRC) te benaderen. In een documentregistratiecomponent worden INFORMATIEOBJECTen opgeslagen. Een INFORMATIEOBJECT is een digitaal document voorzien van meta-gegevens. INFORMATIEOBJECTen kunnen aan andere objecten zoals zaken en besluiten worden gerelateerd (maar dat hoeft niet) en kunnen gebruiksrechten hebben.`}
              </LeadParagraph>

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

                {tempComponent?.categories && category && (
                  <ToolTip tooltip="Categorie">
                    <Tag
                      layoutClassName={
                        styles[_.camelCase(`${tempComponent.embedded?.nl.embedded.commonground.layerType} category`)]
                      }
                      label={_.upperFirst(category?.title)}
                      icon={category?.icon}
                    />
                  </ToolTip>
                )}
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

                {tempComponent.url && (
                  <ToolTip tooltip="GitHub/GitLab">
                    <Tag label={t("Repository")} icon={<GitHubLogo />} onClick={() => open(tempComponent?.url ?? "")} />
                  </ToolTip>
                )}
              </div>
            </div>

            <div className={styles.addToCatalogusContainer}>
              <div className={styles.logoContainer}>
                <img
                  src={componentPlacholderLogo}
                  className={styles.logo}
                />
              </div>
              <Button icon={<ExternalLinkIcon />}>Toevoegen aan catalogus</Button>
            </div>
          </div>

          <div className={styles.cardsContainer}>
            <span className={styles.noOrganizationCardAvailable}>{t("No organization found")}</span>
            <InfoCard
              title=""
              content={
                <RatingIndicatorTemplate layoutClassName={styles.ratingIndicatorContainer} component={tempComponent} />
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
                  <TableCell>Op dit moment zijn er geen producten beschikbaar.</TableCell>
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
                      id: catalogiId,
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
      </Container>
    </AdminTemplate>
  );
};
