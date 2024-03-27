import * as React from "react";
import * as styles from "./LandingTemplate.module.css";
import { Container, DetailsCard, DisplaySwitch, ImageAndDetailsCard } from "@conduction/components";
import { FeedbackTemplate } from "../templateParts/feedback/FeedbackTemplate";
import overOpenCatalogiImage from "./../../assets/svgs/SpotAPI.svg";
import aanDeSlagMetOpenCatalogiImage from "./../../assets/svgs/SpotForum.svg";
import { useResultDisplayLayoutContext } from "../../context/resultDisplayLayout";
import { LandingDisplayTemplate } from "../templateParts/landingDisplayTemplates/LandingDisplayTemplate";
import { useGatsbyContext } from "../../context/gatsby";
import { IDisplaySwitchButton } from "@conduction/components/lib/components/displaySwitch/DisplaySwitch";
import { Heading, Separator } from "@utrecht/component-library-react/dist/css-module";
import { MarkdownContentTemplate } from "../markdown/MarkdownContentTemplate";
import { useTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import { Button, Heading3 } from "@utrecht/component-library-react";

interface LandingTemplateProps {
  params: any;
}

interface dataProps {
  title: string;
  value: number;
  color: string;
}

export const LandingTemplate: React.FC<LandingTemplateProps> = ({ params }) => {
  const { t } = useTranslation();
  const { screenSize } = useGatsbyContext();
  const { resultDisplayLayout, setResultDisplayLayout } = useResultDisplayLayoutContext();
  const [selectedOntwikkelingsfases, setSelectedOntwikkelingsfases] = React.useState<number | undefined>(0);
  const [selectedInitiatieven, setSelectedInitiatieven] = React.useState<number | undefined>(0);
  const [selectedDomein, setSelectedDomein] = React.useState<number | undefined>(0);
  const [hoveredOntwikkelingsfases, setHoveredOntwikkelingsfases] = React.useState<number | undefined>(undefined);
  const [hoveredInitiatieven, setHoveredInitiatieven] = React.useState<number | undefined>(undefined);
  const [hoveredDomein, setHoveredDomein] = React.useState<number | undefined>(undefined);
  const [showPrecentages, setShowPrecentages] = React.useState<boolean>(false);

  const detailPageSlug = params.detailPageSlug;
  const pageSlug = params.pageSlug;

  const displaySwitchButtons: IDisplaySwitchButton[] = [
    {
      label: t("Layer"),
      pressed: resultDisplayLayout.landingDisplayLayout === "layer",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, landingDisplayLayout: "layer" }),
      icon: {
        name: "layer-group",
        prefix: "fas",
      },
    },
    {
      label: t("Cards"),
      pressed: resultDisplayLayout.landingDisplayLayout === "cards",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, landingDisplayLayout: "cards" }),
      icon: {
        name: "grip-vertical",
        prefix: "fas",
      },
    },
  ];

  const dataOntwikkelingsfases = [
    { title: "Doorontwikkeling en beheer", value: 13, color: "#118dff" },
    { title: "Opschaling", value: 11, color: "#12239e" },
    { title: "Realisatie", value: 3, color: "#e66c37" },
    { title: "Initiatie", value: 1, color: "#6b007b" },
  ];

  const dataInitiatieven = [
    { title: "Toepassing", value: 19, color: "#118dff" },
    { title: "Component", value: 6, color: "#12239e" },
    { title: "Standaard", value: 3, color: "#e66c37" },
  ];

  const dataDomein = [
    { title: "Dienstverlening", value: 11, color: "#118dff" },
    { title: "(Lokale) belastingen", value: 2, color: "#12239e" },
    { title: "Fysieke leefomgeving", value: 3, color: "#e66c37" },
    { title: "Openvare orde en veiligheid", value: 1, color: "#6b007b" },
    { title: "Sociaal domein", value: 1, color: "#d9b300" },
    { title: "Ruimtelijke ordening", value: 6, color: "#d64550" },
    { title: "Bestuur", value: 16, color: "#197278" },
    { title: "Bedrijfsvoering", value: 7, color: "#1aab40" },
  ];

  const convertDataOntwikkelingsfases = (data: any): dataProps[] => {
    return data.map((entry: dataProps, i: number) => {
      if (hoveredOntwikkelingsfases === i) {
        return {
          ...entry,
          color: "grey",
        };
      }
      return entry;
    });
  };
  const convertDataInitiatieven = (data: any): dataProps[] => {
    return data.map((entry: dataProps, i: number) => {
      if (hoveredInitiatieven === i) {
        return {
          ...entry,
          color: "grey",
        };
      }
      return entry;
    });
  };
  const convertDataDomein = (data: any): dataProps[] => {
    return data.map((entry: dataProps, i: number) => {
      if (hoveredDomein === i) {
        return {
          ...entry,
          color: "grey",
        };
      }
      return entry;
    });
  };

  return (
    <Container layoutClassName={styles.container}>
      {window.sessionStorage.getItem("COMMONGROUND_CHARTS") === "true" && (
        <section className={styles.section}>
          <Button onClick={() => setShowPrecentages(!showPrecentages)}>
            {showPrecentages ? t("Show Total") : t("Show Percentages")}
          </Button>
          <div className={styles.charts}>
            <div className={styles.chart}>
              <Heading3>Verdeling over ontwikkelingsfases</Heading3>
              <PieChart
                data={convertDataOntwikkelingsfases(dataOntwikkelingsfases)}
                style={{
                  fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                  fontSize: "6px",
                }}
                radius={50 - 6}
                lineWidth={60}
                segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                segmentsShift={(index) => (index === selectedOntwikkelingsfases ? 6 : 1)}
                animate
                label={({ dataEntry }) => (showPrecentages ? Math.round(dataEntry.percentage) + "%" : dataEntry.value)}
                labelPosition={100 - 60 / 2}
                labelStyle={{
                  fill: "#fff",
                  opacity: 0.75,
                  pointerEvents: "none",
                }}
                onClick={(_, index) => {
                  setSelectedOntwikkelingsfases(index === selectedOntwikkelingsfases ? undefined : index);
                }}
                onMouseOver={(_, index) => {
                  setHoveredOntwikkelingsfases(index);
                }}
                onMouseOut={() => {
                  setHoveredOntwikkelingsfases(undefined);
                }}
                startAngle={270}
              />
            </div>

            <div className={styles.chart}>
              <Heading3>Verdeling type initiatieven</Heading3>
              <PieChart
                data={convertDataInitiatieven(dataInitiatieven)}
                style={{
                  fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                  fontSize: "6px",
                }}
                radius={50 - 6}
                lineWidth={60}
                segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                segmentsShift={(index) => (index === selectedInitiatieven ? 6 : 1)}
                animate
                label={({ dataEntry }) => (showPrecentages ? Math.round(dataEntry.percentage) + "%" : dataEntry.value)}
                labelPosition={100 - 60 / 2}
                labelStyle={{
                  fill: "#fff",
                  opacity: 0.75,
                  pointerEvents: "none",
                }}
                onClick={(_, index) => {
                  setSelectedInitiatieven(index === selectedInitiatieven ? undefined : index);
                }}
                onMouseOver={(_, index) => {
                  setHoveredInitiatieven(index);
                }}
                onMouseOut={() => {
                  setHoveredInitiatieven(undefined);
                }}
                startAngle={270}
              />
            </div>

            <div className={styles.chart}>
              <Heading3>Verdeling per domein</Heading3>
              <PieChart
                data={convertDataDomein(dataDomein)}
                style={{
                  fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                  fontSize: "6px",
                }}
                radius={50 - 6}
                lineWidth={60}
                segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                segmentsShift={(index) => (index === selectedDomein ? 6 : 1)}
                animate
                label={({ dataEntry }) => (showPrecentages ? Math.round(dataEntry.percentage) + "%" : dataEntry.value)}
                labelPosition={100 - 60 / 2}
                labelStyle={{
                  fill: "#fff",
                  opacity: 0.75,
                  pointerEvents: "none",
                }}
                onClick={(_, index) => {
                  setSelectedDomein(index === selectedDomein ? undefined : index);
                }}
                onMouseOver={(_, index) => {
                  setHoveredDomein(index);
                }}
                onMouseOut={() => {
                  setHoveredDomein(undefined);
                }}
                startAngle={270}
              />
            </div>
          </div>
        </section>
      )}
      {window.sessionStorage.getItem("OPTIONAL_START_PAGE") &&
        window.sessionStorage.getItem("OPTIONAL_START_PAGE") !== "false" &&
        window.sessionStorage.getItem("OPTIONAL_START_PAGE") !== undefined && (
          <MarkdownContentTemplate
            link={window.sessionStorage.getItem("OPTIONAL_START_PAGE") ?? ""}
            {...{ pageSlug, detailPageSlug }}
          />
        )}

      {(!window.sessionStorage.getItem("OPTIONAL_START_PAGE") ||
        window.sessionStorage.getItem("OPTIONAL_START_PAGE") === "false") && (
        <>
          <section className={styles.section}>
            <DisplaySwitch buttons={displaySwitchButtons} layoutClassName={styles.landingDisplaySwitchButtons} />

            <LandingDisplayTemplate type={resultDisplayLayout.landingDisplayLayout} />
          </section>

          <section className={styles.section}>
            <Heading level={3} className={styles.textColor}>
              Veelbezochte pagina's
            </Heading>
            {screenSize === "desktop" && (
              <div className={styles.cards}>
                <ImageAndDetailsCard
                  layoutClassName={styles.textColor}
                  title="Over OpenCatalogi"
                  image={<img src={overOpenCatalogiImage} />}
                  introduction="OpenCatalogi is een weergave van Componenten verdeeld over de 5 lagen zoals gedefinieerd door VNG in het Gegevenslandschap."
                  link={{ label: "Ga naar Over OpenCatalogi", href: "/documentation/about" }}
                />

                <ImageAndDetailsCard
                  layoutClassName={styles.textColor}
                  title="Aan de slag met OpenCatalogi"
                  image={<img src={aanDeSlagMetOpenCatalogiImage} />}
                  introduction="Wilt u uw component op OpenCatalogi aanbieden zodat andere uw component kunnen (her)gebruiken of bij dragen aan de doorontwikkeling van uw component?"
                  link={{ label: "Aan de slag met OpenCatalogi", href: "documentation/usage" }}
                />
              </div>
            )}
            {screenSize === "tablet" && (
              <div className={styles.cards}>
                <DetailsCard
                  layoutClassName={styles.textColor}
                  title="Over OpenCatalogi"
                  link={{ label: "Ga naar Over OpenCatalogi", href: "/documentation/about" }}
                />
                <DetailsCard
                  layoutClassName={styles.textColor}
                  title="Aan de slag met OpenCatalogi"
                  link={{ label: "Aan de slag met OpenCatalogi", href: "documentation/usage" }}
                />
              </div>
            )}

            {screenSize === "mobile" && (
              <div className={styles.cards}>
                <DetailsCard
                  layoutClassName={styles.textColor}
                  title="Over OpenCatalogi"
                  link={{ label: "Ga naar Over OpenCatalogi", href: "/documentation/about" }}
                />
                <DetailsCard
                  layoutClassName={styles.textColor}
                  title="Aan de slag met OpenCatalogi"
                  link={{ label: "Aan de slag met OpenCatalogi", href: "documentation/usage" }}
                />
              </div>
            )}
          </section>

          <Separator />

          <FeedbackTemplate layoutClassName={styles.feedback} />
        </>
      )}
    </Container>
  );
};
