import * as React from "react";
import * as styles from "./CommongroundChartsTemplate.module.css";
import Skeleton from "react-loading-skeleton";
import { useAvailableFilters } from "../../hooks/availableFilters";
import { useTranslation } from "react-i18next";
import { statisticsColors } from "../../data/statisticsColors";
import { Button, Heading3 } from "@utrecht/component-library-react";
import { PieChart } from "react-minimal-pie-chart";

interface dataProps {
  title: string;
  value: number;
  color: string;
}

export const CommongroundCartsTemplate: React.FC = () => {
  const { t } = useTranslation();

  const [selectedOntwikkelingsfases, setSelectedOntwikkelingsfases] = React.useState<number | undefined>(0);
  const [selectedInitiatieven, setSelectedInitiatieven] = React.useState<number | undefined>(0);
  const [selectedDomein, setSelectedDomein] = React.useState<number | undefined>(0);
  const [selectedRating, setSelectedRating] = React.useState<number | undefined>(0);
  const [hoveredOntwikkelingsfases, setHoveredOntwikkelingsfases] = React.useState<number | undefined>(undefined);
  const [hoveredInitiatieven, setHoveredInitiatieven] = React.useState<number | undefined>(undefined);
  const [hoveredDomein, setHoveredDomein] = React.useState<number | undefined>(undefined);
  const [hoveredRating, setHoveredRating] = React.useState<number | undefined>(undefined);
  const [showPrecentages, setShowPrecentages] = React.useState<boolean>(false);
  const [dataOntwikkelingsfases, setDataOntwikkelingsfases] = React.useState<any>([]);
  const [dataInitiatieven, setDataInitiatieven] = React.useState<any>([]);
  const [dataRating, setDataRating] = React.useState<any>([]);
  const [dataDomein, setDataDomein] = React.useState<any>([]);
  const _useFilters = useAvailableFilters();
  const getStatistics = _useFilters.getStatistics();

  const dataDevelopmentStatusStable =
    getStatistics.isSuccess &&
    getStatistics.data.developmentStatus.find((option: any) => {
      return option._id === "stable";
    });

  const dataDevelopmentStatusBeta =
    getStatistics.isSuccess &&
    getStatistics.data.developmentStatus.find((option: any) => {
      return option._id === "beta";
    });

  const dataDevelopmentStatusConcept =
    getStatistics.isSuccess &&
    getStatistics.data.developmentStatus.find((option: any) => {
      return option._id === "concept";
    });

  const dataDevelopmentStatusDevelopment =
    getStatistics.isSuccess &&
    getStatistics.data.developmentStatus.find((option: any) => {
      return option._id === "development";
    });

  const getDataSoftwareTypeStandalone = () => {
    if (!getStatistics.isSuccess) return;
    let sum = 0;

    const filter = getStatistics.data.softwareType.filter((option: any) => {
      return option._id.includes("standalone");
    });

    filter.forEach((element: any) => {
      sum += element.count;
    });

    return { _id: "standalone", count: sum };
  };

  const dataSoftwareTypeSoftwareAddon =
    getStatistics.isSuccess &&
    getStatistics.data.softwareType.find((option: any) => {
      return option._id === "softwareAddon";
    });

  const dataRatingBronze =
    getStatistics.isSuccess &&
    getStatistics.data["embedded.nl.embedded.commonground.rating"].find((option: any) => {
      return option._id === 1;
    });

  const dataRatingSilver =
    getStatistics.isSuccess &&
    getStatistics.data["embedded.nl.embedded.commonground.rating"].find((option: any) => {
      return option._id === 2;
    });

  const dataRatingGold =
    getStatistics.isSuccess &&
    getStatistics.data["embedded.nl.embedded.commonground.rating"].find((option: any) => {
      return option._id === 3;
    });

  React.useEffect(() => {
    if (!getStatistics.isSuccess) return;

    const dataOntwikkelingsfases: any[] = [];
    dataDevelopmentStatusStable?.count &&
      dataDevelopmentStatusStable?.count !== 0 &&
      dataOntwikkelingsfases.push({
        title: "Doorontwikkeling en beheer",
        value: dataDevelopmentStatusStable?.count ?? 0,
        color: "#118dff",
      });

    dataDevelopmentStatusBeta?.count &&
      dataDevelopmentStatusBeta?.count !== 0 &&
      dataOntwikkelingsfases.push({
        title: "Opschaling",
        value: dataDevelopmentStatusBeta?.count ?? 0,
        color: "#12239e",
      });

    dataDevelopmentStatusDevelopment?.count &&
      dataDevelopmentStatusDevelopment?.count !== 0 &&
      dataOntwikkelingsfases.push({
        title: "Realisatie",
        value: dataDevelopmentStatusDevelopment?.count ?? 0,
        color: "#e66c37",
      });

    dataDevelopmentStatusConcept?.count &&
      dataDevelopmentStatusConcept?.count !== 0 &&
      dataOntwikkelingsfases.push({
        title: "Initiatie",
        value: dataDevelopmentStatusConcept?.count ?? 0,
        color: "#6b007b",
      });

    const dataInitiatieven: any[] = [];
    const dataSoftwareTypeStandalone = getDataSoftwareTypeStandalone();

    dataSoftwareTypeStandalone?.count &&
      dataSoftwareTypeStandalone?.count !== 0 &&
      dataInitiatieven.push({
        title: "Toepassing (Bruikbare oplossing)",
        value: dataSoftwareTypeStandalone?.count ?? 0,
        color: "#118dff",
      });

    dataSoftwareTypeSoftwareAddon?.count &&
      dataSoftwareTypeSoftwareAddon?.count !== 0 &&
      dataInitiatieven.push({
        title: "Component (Deel van toepassing)",
        value: dataSoftwareTypeSoftwareAddon?.count ?? 0,
        color: "#12239e",
      });

    const dataRating: any[] = [];

    dataRatingBronze?.count &&
      dataRatingBronze?.count !== 0 &&
      dataRating.push({
        title: t("Bronze"),
        value: dataRatingBronze?.count ?? 0,
        color: "#a97142",
      });

    dataRatingSilver?.count &&
      dataRatingSilver?.count !== 0 &&
      dataRating.push({
        title: t("Silver"),
        value: dataRatingSilver?.count ?? 0,
        color: "#bcc6cc",
      });

    dataRatingGold?.count &&
      dataRatingGold?.count !== 0 &&
      dataRating.push({
        title: t("Gold"),
        value: dataRatingGold?.count ?? 0,
        color: "#d4af37",
      });

    const dataDomein: any[] =
      getStatistics.isSuccess &&
      getStatistics.data.categories.map((option: any, idx: number) => {
        const color = statisticsColors.find((color) => {
          return color.id === idx;
        });
        return {
          title: option._id,
          value: option.count ?? 0,
          color: color?.color ?? `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        };
      });

    setDataOntwikkelingsfases(dataOntwikkelingsfases);
    setDataInitiatieven(dataInitiatieven);
    setDataRating(dataRating);
    setDataDomein(dataDomein);
  }, [getStatistics.isSuccess]);

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
  const convertDataRating = (data: any): dataProps[] => {
    return data.map((entry: dataProps, i: number) => {
      if (hoveredRating === i) {
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
    <section className={styles.section}>
      <Button onClick={() => setShowPrecentages(!showPrecentages)}>
        {showPrecentages ? t("Show Total") : t("Show Percentages")}
      </Button>

      <div className={styles.charts}>
        <div className={styles.chart}>
          <Heading3>Verdeling over ontwikkelingsfases</Heading3>
          {getStatistics.isSuccess && (
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
          )}
          {getStatistics.isLoading && <Skeleton height="300px" />}
        </div>

        <div className={styles.chart}>
          <Heading3>Verdeling type initiatieven</Heading3>
          {getStatistics.isSuccess && (
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
          )}
          {getStatistics.isLoading && <Skeleton height="300px" />}
        </div>

        <div className={styles.chart}>
          <Heading3>Verdeling CG portfoliofases</Heading3>
          {getStatistics.isSuccess && (
            <PieChart
              data={convertDataRating(dataRating)}
              style={{
                fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                fontSize: "6px",
              }}
              radius={50 - 6}
              lineWidth={60}
              segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
              segmentsShift={(index) => (index === selectedRating ? 6 : 1)}
              animate
              label={({ dataEntry }) => (showPrecentages ? Math.round(dataEntry.percentage) + "%" : dataEntry.value)}
              labelPosition={100 - 60 / 2}
              labelStyle={{
                fill: "#fff",
                opacity: 0.75,
                pointerEvents: "none",
              }}
              onClick={(_, index) => {
                setSelectedRating(index === selectedRating ? undefined : index);
              }}
              onMouseOver={(_, index) => {
                setHoveredRating(index);
              }}
              onMouseOut={() => {
                setHoveredRating(undefined);
              }}
              startAngle={270}
            />
          )}
          {getStatistics.isLoading && <Skeleton height="300px" />}
        </div>

        <div className={styles.chart}>
          <Heading3>Verdeling per domein</Heading3>
          {getStatistics.isSuccess && (
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
          )}
          {getStatistics.isLoading && <Skeleton height="300px" />}
        </div>
      </div>
    </section>
  );
};
