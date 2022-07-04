import * as React from "react";
import * as styles from "./ComponentsDetailTemplate.module.css";
import { Button, Heading1, Link, Paragraph, Tab, TabContext, TabPanel, Tabs, } from "@gemeente-denhaag/components-react";
import { Container, Tag } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon, ExternalLinkIcon } from "@gemeente-denhaag/icons";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import grey from "../../assets/images/grey.png";
import { Table, TableBody, TableCell, TableCol, TableHeader, TableRow } from "@gemeente-denhaag/table";

interface ComponentsDetailTemplateProps {
  componentId: string;
}

export const ComponentsDetailTemplate: React.FC<ComponentsDetailTemplateProps> = ({ componentId }) => {
  const [component, setComponent] = React.useState<any>(null);
  const { t } = useTranslation();

  const _useComponent = useComponent();
  const getComponents = _useComponent.getAll();

  React.useEffect(() => {
    if (!getComponents.isSuccess) return;

    const _component = getComponents.data.find((c: any) => c.id === componentId);
    setComponent(_component);
  }, [getComponents.isSuccess]);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/components")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to components")}
        </Link>
      </div>

      {!getComponents.isLoading && component && (
        <>
          <div className={styles.heading}>
            <div className={styles.context}>
              <Heading1>{component.name}</Heading1>
              <span className={styles.subtitle}>Component organisatie</span>
              <Paragraph className={styles.description}>{component.description}</Paragraph>
              <div className={styles.tags}>
                <Tag tag={component.intendedAudience} />
                <Tag tag={component.intendedAudience} />
              </div>
            </div>

            <div className={styles.object}>
              <img src={grey} className={styles.img} />
              <Button icon={<ExternalLinkIcon />}>Toevoegen aan catalogus</Button>
            </div>
          </div>

            <Table>
            <TableHeader>
                  <TableCell>Gemma</TableCell>
                  <TableCell>UPL</TableCell>
                  <TableCell >Standaarden</TableCell>
                  <TableCell >Wet en regelgeving</TableCell>
            </TableHeader>

          </Table>



          <div>
            <TabContext value={component.toString()}>
              <Tabs
                scrollButtons={"on"}
                value={component}
                onChange={(_, newValue: number) => {
                  setComponent(newValue);
                }}
              >
                <div className={styles.tabs}>
                  <Tab label={t("Components")} value={0} />
                  <Tab label={t("Dependencies")} value={1} />
                  <Tab label={t("Standards")} value={3} />
                  <Tab label={t("Suppliers")} value={4} />
                  <Tab label={t("Reuse")} value={5} />
                  <Tab label={t("Schema's")} value={6} />
                  <Tab label={t("Processes")} value={7} />
                  <Tab label={t("Products")} value={8} />
                </div>
              </Tabs>

              <TabPanel value="0"></TabPanel>
              <TabPanel value="1"></TabPanel>
              <TabPanel value="3"></TabPanel>
              <TabPanel value="4"></TabPanel>
              <TabPanel value="5"></TabPanel>
              <TabPanel value="6"></TabPanel>
              <TabPanel value="7"></TabPanel>
              <TabPanel value="8"></TabPanel>
            </TabContext>
          </div>
        </>
      )}

      {getComponents.isLoading && <Skeleton height="250px" />}
    </Container>
  );
};
