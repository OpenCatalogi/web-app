import * as React from "react";
import * as styles from "./CommongroundChartsTemplate.module.css";
import _ from "lodash";
import Skeleton from "react-loading-skeleton";
import { useAvailableFilters } from "../../hooks/availableFilters";
import { useTranslation } from "react-i18next";
import { statisticsColors } from "../../data/statisticsColors";
import { Button, Heading3 } from "@utrecht/component-library-react";
import { PieChart } from "react-minimal-pie-chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { TOOLTIP_ID } from "../../layout/Layout";
import { navigate } from "gatsby";
import { defaultFiltersContext, useFiltersContext } from "../../context/filters";
import { usePaginationContext } from "../../context/pagination";

interface dataProps {
  title: string;
  value: number;
  color: string;
}

export const CommongroundCartsTemplate: React.FC = () => {
  const { t } = useTranslation();
  const { setFilters } = useFiltersContext();
  const { pagination, setPagination } = usePaginationContext();

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

  const dataSoftwareTypeAPI =
    getStatistics.isSuccess &&
    getStatistics.data.softwareType.find((option: any) => {
      return option._id === "api";
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

  const ontwikkelingsfasesLegend = [
    { title: "Doorontwikkeling en beheer", color: "#118dff" },
    { title: "Opschaling", color: "#12239e" },
    { title: "Realisatie", color: "#e66c37" },
    { title: "Initiatie", color: "#6b007b" },
  ];

  const initiatievenLegend = [
    { title: "Toepassing", color: "#118dff" },
    { title: "Component", color: "#12239e" },
    { title: "Standaard", color: "#e66c37" },
  ];

  const RatingLegend = [
    { title: t("Gold"), color: "#d4af37" },
    { title: t("Silver"), color: "#bcc6cc" },
    { title: t("Bronze"), color: "#a97142" },
  ];

  React.useEffect(() => {
    if (!getStatistics.isSuccess) return;

    const dataOntwikkelingsfases: any[] = [];
    dataDevelopmentStatusStable?.count &&
      dataDevelopmentStatusStable?.count !== 0 &&
      dataOntwikkelingsfases.push({
        title: "Doorontwikkeling en beheer",
        value: dataDevelopmentStatusStable?.count ?? 0,
        color: "#118dff",
        filter: "stable",
      });

    dataDevelopmentStatusBeta?.count &&
      dataDevelopmentStatusBeta?.count !== 0 &&
      dataOntwikkelingsfases.push({
        title: "Opschaling",
        value: dataDevelopmentStatusBeta?.count ?? 0,
        color: "#12239e",
        filter: "beta",
      });

    dataDevelopmentStatusDevelopment?.count &&
      dataDevelopmentStatusDevelopment?.count !== 0 &&
      dataOntwikkelingsfases.push({
        title: "Realisatie",
        value: dataDevelopmentStatusDevelopment?.count ?? 0,
        color: "#e66c37",
        filter: "development",
      });

    dataDevelopmentStatusConcept?.count &&
      dataDevelopmentStatusConcept?.count !== 0 &&
      dataOntwikkelingsfases.push({
        title: "Initiatie",
        value: dataDevelopmentStatusConcept?.count ?? 0,
        color: "#6b007b",
        filter: "concept",
      });

    const dataInitiatieven: any[] = [];
    const dataSoftwareTypeStandalone = getDataSoftwareTypeStandalone();

    dataSoftwareTypeStandalone?.count &&
      dataSoftwareTypeStandalone?.count !== 0 &&
      dataInitiatieven.push({
        title: "Toepassing (Bruikbare oplossing)",
        value: dataSoftwareTypeStandalone?.count ?? 0,
        color: "#118dff",
        filter: "standalone",
      });

    dataSoftwareTypeSoftwareAddon?.count &&
      dataSoftwareTypeSoftwareAddon?.count !== 0 &&
      dataInitiatieven.push({
        title: "Component (Deel van toepassing)",
        value: dataSoftwareTypeSoftwareAddon?.count ?? 0,
        color: "#12239e",
        filter: "softwareAddon",
      });

    dataSoftwareTypeAPI?.count &&
      dataSoftwareTypeAPI?.count !== 0 &&
      dataInitiatieven.push({
        title: "Standaard",
        value: dataSoftwareTypeAPI?.count ?? 0,
        color: "#e66c37",
        filter: "api",
      });

    const dataRating: any[] = [];

    dataRatingBronze?.count &&
      dataRatingBronze?.count !== 0 &&
      dataRating.push({
        title: t("Bronze"),
        value: dataRatingBronze?.count ?? 0,
        color: "#a97142",
        filter: "exact1",
      });

    dataRatingSilver?.count &&
      dataRatingSilver?.count !== 0 &&
      dataRating.push({
        title: t("Silver"),
        value: dataRatingSilver?.count ?? 0,
        color: "#bcc6cc",
        filter: "exact2",
      });

    dataRatingGold?.count &&
      dataRatingGold?.count !== 0 &&
      dataRating.push({
        title: t("Gold"),
        value: dataRatingGold?.count ?? 0,
        color: "#d4af37",
        filter: "exact3",
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
            <div className={styles.chartLegendContainer}>
              <PieChart
                data={convertDataOntwikkelingsfases(dataOntwikkelingsfases)}
                style={{
                  fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                  fontSize: "6px",
                }}
                radius={50 - 6}
                lineWidth={60}
                segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                segmentsShift={1}
                animate
                label={({ dataEntry }) => (showPrecentages ? Math.round(dataEntry.percentage) + "%" : dataEntry.value)}
                labelPosition={100 - 60 / 2}
                labelStyle={{
                  fill: "#fff",
                  opacity: 0.75,
                  pointerEvents: "none",
                }}
                onClick={(_, index) => {
                  setFilters({
                    ...defaultFiltersContext,
                    developmentStatus: dataOntwikkelingsfases[index].filter,
                  });
                  setPagination({
                    ...pagination,
                    componentsCurrentPage: 1,
                  });
                  navigate("/components");
                }}
                onMouseOver={(_, index) => {
                  setHoveredOntwikkelingsfases(index);
                }}
                onMouseOut={() => {
                  setHoveredOntwikkelingsfases(undefined);
                }}
                startAngle={270}
              />
              <div>
                {ontwikkelingsfasesLegend.map((option: any) => (
                  <div className={styles.legend}>
                    <FontAwesomeIcon style={{ color: option.color }} icon={faSquare} />{" "}
                    <span
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content={option.title}
                      className={styles.legendTitle}
                    >
                      {option.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {getStatistics.isLoading && <Skeleton height="300px" />}
        </div>

        <div className={styles.chart}>
          <Heading3>Verdeling type initiatieven</Heading3>
          {getStatistics.isSuccess && (
            <div className={styles.chartLegendContainer}>
              <PieChart
                data={convertDataInitiatieven(dataInitiatieven)}
                style={{
                  fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                  fontSize: "6px",
                }}
                radius={50 - 6}
                lineWidth={60}
                segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                segmentsShift={1}
                animate
                label={({ dataEntry }) => (showPrecentages ? Math.round(dataEntry.percentage) + "%" : dataEntry.value)}
                labelPosition={100 - 60 / 2}
                labelStyle={{
                  fill: "#fff",
                  opacity: 0.75,
                  pointerEvents: "none",
                }}
                onClick={(_, index) => {
                  setFilters({
                    ...defaultFiltersContext,
                    softwareType: dataInitiatieven[index].filter,
                  });
                  setPagination({
                    ...pagination,
                    componentsCurrentPage: 1,
                  });
                  navigate("/components");
                }}
                onMouseOver={(_, index) => {
                  setHoveredInitiatieven(index);
                }}
                onMouseOut={() => {
                  setHoveredInitiatieven(undefined);
                }}
                startAngle={270}
              />
              <div>
                {initiatievenLegend.map((option: any) => (
                  <div className={styles.legend}>
                    <FontAwesomeIcon style={{ color: option.color }} icon={faSquare} />{" "}
                    <span
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content={option.title}
                      className={styles.legendTitle}
                    >
                      {option.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {getStatistics.isLoading && <Skeleton height="300px" />}
        </div>

        <div className={styles.chart}>
          <Heading3>Verdeling CG portfoliofases</Heading3>
          {getStatistics.isSuccess && (
            <div className={styles.chartLegendContainer}>
              <PieChart
                data={convertDataRating(dataRating)}
                style={{
                  fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                  fontSize: "6px",
                }}
                radius={50 - 6}
                lineWidth={60}
                segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                segmentsShift={1}
                animate
                label={({ dataEntry }) => (showPrecentages ? Math.round(dataEntry.percentage) + "%" : dataEntry.value)}
                labelPosition={100 - 60 / 2}
                labelStyle={{
                  fill: "#fff",
                  opacity: 0.75,
                  pointerEvents: "none",
                }}
                onClick={(_, index) => {
                  setFilters({
                    ...defaultFiltersContext,
                    ratingCommonground: dataRating[index].filter,
                  });
                  setPagination({
                    ...pagination,
                    componentsCurrentPage: 1,
                  });
                  navigate("/components");
                }}
                onMouseOver={(_, index) => {
                  setHoveredRating(index);
                }}
                onMouseOut={() => {
                  setHoveredRating(undefined);
                }}
                startAngle={270}
              />
              <div>
                {RatingLegend.map((option: any) => (
                  <div className={styles.legend}>
                    <FontAwesomeIcon style={{ color: option.color }} icon={faSquare} />{" "}
                    <span
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content={option.title}
                      className={styles.legendTitle}
                    >
                      {option.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {getStatistics.isLoading && <Skeleton height="300px" />}
        </div>

        <div className={styles.chart}>
          <Heading3>Verdeling per domein</Heading3>
          {getStatistics.isSuccess && (
            <div className={styles.chartLegendContainer}>
              <PieChart
                data={convertDataDomein(dataDomein)}
                style={{
                  fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                  fontSize: "6px",
                }}
                radius={50 - 6}
                lineWidth={60}
                segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                segmentsShift={1}
                animate
                label={({ dataEntry }) => (showPrecentages ? Math.round(dataEntry.percentage) + "%" : dataEntry.value)}
                labelPosition={100 - 60 / 2}
                labelStyle={{
                  fill: "#fff",
                  opacity: 0.75,
                  pointerEvents: "none",
                }}
                onClick={(_, index) => {
                  setFilters({
                    ...defaultFiltersContext,
                    category: dataDomein[index].title,
                  });
                  setPagination({
                    ...pagination,
                    componentsCurrentPage: 1,
                  });
                  navigate("/components");
                }}
                onMouseOver={(_, index) => {
                  setHoveredDomein(index);
                }}
                onMouseOut={() => {
                  setHoveredDomein(undefined);
                }}
                startAngle={270}
              />
              <div>
                {dataDomein.map((option: any) => (
                  <div className={styles.legend}>
                    <FontAwesomeIcon style={{ color: option.color }} icon={faSquare} />{" "}
                    <span
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content={_.upperFirst(option.title)}
                      className={styles.legendTitle}
                    >
                      {_.upperFirst(option.title)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {getStatistics.isLoading && <Skeleton height="300px" />}
        </div>
      </div>
    </section>
  );
};
