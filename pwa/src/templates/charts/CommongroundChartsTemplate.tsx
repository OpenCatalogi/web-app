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

interface hoverProps {
  ontwikkelingsfases?: number | undefined;
  initiatieven?: number | undefined;
  domein?: number | undefined;
  layer?: number | undefined;
  rating?: number | undefined;
  organization?: number | undefined;
}

export const CommongroundCartsTemplate: React.FC = () => {
  const { t } = useTranslation();
  const { setFilters } = useFiltersContext();
  const { pagination, setPagination } = usePaginationContext();

  const [hovered, setHovered] = React.useState<hoverProps>();

  const [showPrecentages, setShowPrecentages] = React.useState<boolean>(false);
  const [dataOntwikkelingsfases, setDataOntwikkelingsfases] = React.useState<any>([]);
  const [dataInitiatieven, setDataInitiatieven] = React.useState<any>([]);
  const [dataRating, setDataRating] = React.useState<any>([]);
  const [dataDomein, setDataDomein] = React.useState<any>([]);
  const [dataOrganization, setDataOrganization] = React.useState<any>([]);
  const [dataLayer, setDataLayer] = React.useState<any>([]);

  const _useFilters = useAvailableFilters();
  const getStatistics = _useFilters.getStatistics();

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

  const LayerLegend = [
    { title: t("Interface"), color: "#1a75ff" },
    { title: t("Process"), color: "#dd3c49" },
    { title: t("Integration"), color: "#efc025" },
    { title: t("Service"), color: "#69b090" },
    { title: t("Data"), color: "#7a51c8" },
  ];

  React.useEffect(() => {
    if (!getStatistics.isSuccess) return;

    const dataOntwikkelingsfases: any[] = getStatistics.data.developmentStatus.map((option: any) => {
      const getTitle = (id: string) => {
        switch (id) {
          case "stable":
            return "Doorontwikkeling en beheer";
          case "beta":
            return "Opschaling";
          case "development":
            return "Realisatie";
          case "concept":
            return "Initatie";
        }
      };
      const color = ontwikkelingsfasesLegend.find((_option) => {
        return _option.title === getTitle(option._id);
      });
      return {
        title: getTitle(option._id),
        value: option.count ?? 0,
        color: color?.color ?? `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        filter: option._id,
      };
    });

    const dataSoftwareTypeStandalone = getDataSoftwareTypeStandalone();
    const dataSoftwareTypeNoStandalone = getStatistics.data.softwareType.filter((option: any) => {
      return !option._id.includes("standalone");
    });
    const dataSoftwareTypes = [dataSoftwareTypeStandalone, ...dataSoftwareTypeNoStandalone];
    const dataInitiatieven: any[] = dataSoftwareTypes.map((option: any) => {
      const getTitle = (id: string) => {
        switch (id) {
          case "standalone":
            return "Toepassing";
          case "softwareAddon":
            return "Component";
          case "api":
            return "Standaard";
        }
      };
      const color = initiatievenLegend.find((_option) => {
        return _option.title === getTitle(option._id);
      });
      return {
        title: getTitle(option._id),
        value: option.count ?? 0,
        color: color?.color ?? `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        filter: option._id,
      };
    });

    const sortRatingList = [1, 2, 3];
    const sortedRatings = getStatistics.data["embedded.nl.embedded.commonground.rating"].sort((a: any, b: any) => {
      return sortRatingList.indexOf(a._id) - sortRatingList.indexOf(b._id);
    });
    const dataRating: any[] = sortedRatings.map((option: any) => {
      const getTitle = (id: number) => {
        switch (id) {
          case 1:
            return t("Bronze");
          case 2:
            return t("Silver");
          case 3:
            return t("Gold");
        }
      };
      const color = RatingLegend.find((_option) => {
        return _option.title === getTitle(option._id);
      });
      return {
        title: getTitle(option._id),
        value: option.count ?? 0,
        color: color?.color ?? `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        filter: `exact${option._id}`,
      };
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

    const sortLayerList = ["interface", "process", "integration", "service", "data"];
    const sortedLayers = getStatistics.data["embedded.nl.embedded.commonground.layerType"].sort((a: any, b: any) => {
      return sortLayerList.indexOf(a._id) - sortLayerList.indexOf(b._id);
    });
    const dataLayer: any[] = sortedLayers.map((option: any) => {
      const color = LayerLegend.find((_option) => {
        return _option.title === t(_.upperFirst(option._id));
      });
      return {
        title: t(_.upperFirst(option._id)),
        value: option.count ?? 0,
        color: color?.color ?? `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        filter: option._id,
      };
    });

    const dataOrganization: any[] =
      getStatistics.isSuccess &&
      getStatistics.data["embedded.url.embedded.organisation.name"].map((option: any, idx: number) => {
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
    setDataLayer(dataLayer);
    setDataOrganization(dataOrganization);
  }, [getStatistics.isSuccess]);

  const convertHover = (data: any, index: number | undefined): dataProps[] => {
    return data.map((entry: dataProps, i: number) => {
      if (index === i) {
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
                data={convertHover(dataOntwikkelingsfases, hovered?.ontwikkelingsfases)}
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
                  setHovered({ ontwikkelingsfases: index });
                }}
                onMouseOut={() => {
                  setHovered({ ontwikkelingsfases: undefined });
                }}
                startAngle={270}
              />
              <div>
                {ontwikkelingsfasesLegend.map((option: any, idx: number) => (
                  <div key={idx} className={styles.legend}>
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
                data={convertHover(dataInitiatieven, hovered?.initiatieven)}
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
                  setHovered({ initiatieven: index });
                }}
                onMouseOut={() => {
                  setHovered({ initiatieven: undefined });
                }}
                startAngle={270}
              />
              <div>
                {initiatievenLegend.map((option: any, idx: number) => (
                  <div key={idx} className={styles.legend}>
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
                data={convertHover(dataRating, hovered?.rating)}
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
                  setHovered({ rating: index });
                }}
                onMouseOut={() => {
                  setHovered({ rating: undefined });
                }}
                startAngle={270}
              />
              <div>
                {RatingLegend.map((option: any, idx: number) => (
                  <div key={idx} className={styles.legend}>
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
                data={convertHover(dataDomein, hovered?.domein)}
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
                  setHovered({ domein: index });
                }}
                onMouseOut={() => {
                  setHovered({ domein: undefined });
                }}
                startAngle={270}
              />
              <div>
                {dataDomein.map((option: any, idx: number) => (
                  <div key={idx} className={styles.legend}>
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
        <div className={styles.chart}>
          <Heading3>Verdeling per laag</Heading3>
          {getStatistics.isSuccess && (
            <div className={styles.chartLegendContainer}>
              <PieChart
                data={convertHover(dataLayer, hovered?.layer)}
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
                    "embedded.nl.embedded.commonground.layerType": [dataLayer[index].filter],
                  });
                  setPagination({
                    ...pagination,
                    componentsCurrentPage: 1,
                  });
                  navigate("/components");
                }}
                onMouseOver={(_, index) => {
                  setHovered({ layer: index });
                }}
                onMouseOut={() => {
                  setHovered({ layer: undefined });
                }}
                startAngle={270}
              />
              <div>
                {LayerLegend.map((option: any, idx: number) => (
                  <div key={idx} className={styles.legend}>
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
          <Heading3>Verdeling per organisatie</Heading3>
          {getStatistics.isSuccess && (
            <div className={styles.chartLegendContainer}>
              <PieChart
                data={convertHover(dataOrganization, hovered?.organization)}
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
                    "embedded.url.embedded.organisation.name": dataOrganization[index].title,
                  });
                  setPagination({
                    ...pagination,
                    componentsCurrentPage: 1,
                  });
                  navigate("/components");
                }}
                onMouseOver={(_, index) => {
                  setHovered({ organization: index });
                }}
                onMouseOut={() => {
                  setHovered({ organization: undefined });
                }}
                startAngle={270}
              />
              <div>
                {dataOrganization.map((option: any, idx: number) => (
                  <div key={idx} className={styles.legend}>
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
