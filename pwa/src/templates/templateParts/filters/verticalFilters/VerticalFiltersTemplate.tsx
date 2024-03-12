import * as React from "react";
import * as styles from "./VerticalFiltersTemplate.module.css";
import clsx from "clsx";
import qs from "qs";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { IFiltersContext, defaultFiltersContext, ratingDefault, useFiltersContext } from "../../../../context/filters";
import { InputCheckbox, SelectMultiple, SelectSingle } from "@conduction/components";
import {
  upls,
  platforms,
  maintenanceTypes,
  softwareTypes,
  licenses,
  statuses,
  bedrijfsfuncties,
  bedrijfsservices,
  applicatiefuncties,
  referentieComponenten,
  categories,
  layers,
} from "./../../../../data/filters";
import {
  getSelectedItemFromFilters,
  getSelectedItemsFromFilters,
} from "../../../../services/getSelectedItemsFromFilters";
import Collapsible from "react-collapsible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useOrganization } from "../../../../hooks/organization";
import { QueryClient } from "react-query";
import Skeleton from "react-loading-skeleton";
import { FormField, FormLabel, RadioButton, Separator, Textbox } from "@utrecht/component-library-react";
import { useTranslation } from "react-i18next";
import { useGatsbyContext } from "../../../../context/gatsby";
import { navigate } from "gatsby";
import { filtersToUrlQueryParams } from "../../../../services/filtersToQueryParams";
import { usePaginationContext } from "../../../../context/pagination";
import { useResultDisplayLayoutContext } from "../../../../context/resultDisplayLayout";

interface VerticalFiltersTemplateProps {
  filterSet: any[];
  layoutClassName?: string;
}

export const VerticalFiltersTemplate: React.FC<VerticalFiltersTemplateProps> = ({ filterSet, layoutClassName }) => {
  const { t } = useTranslation();
  const { filters, setFilters } = useFiltersContext();
  const { screenSize, location } = useGatsbyContext();
  const { pagination, setPagination } = usePaginationContext();
  const { resultDisplayLayout, setResultDisplayLayout } = useResultDisplayLayoutContext();

  const [queryParams, setQueryParams] = React.useState<IFiltersContext>(defaultFiltersContext);

  const [statusRadioFilter, setStatusRadioFilter] = React.useState<string>("");
  const [maintenanceTypeRadioFilter, setMaintenanceTypeRadioFilter] = React.useState<string>("");

  const [ratingFilter, setRatingFilter] = React.useState<string>(ratingDefault);
  const [ratingFilterCommonground, setRatingFilterCommonground] = React.useState<string>(ratingDefault);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [isOpenExtra, setIsOpenExtra] = React.useState<boolean>(true);
  const [isOpenLayer, setIsOpenLayer] = React.useState<boolean>(true);
  const [isOpenStatus, setIsOpenStatus] = React.useState<boolean>(true);
  const [isOpenMaintenanceType, setIsOpenMaintenanceType] = React.useState<boolean>(true);
  const [isOpenPlatforms, setIsOpenPlatforms] = React.useState<boolean>(true);
  const [isOpenSoftwareTypes, setIsOpenSoftwareTypes] = React.useState<boolean>(true);
  const [isOpenRating, setIsOpenRating] = React.useState<boolean>(true);

  const ratingFilterTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const queryClient = new QueryClient();
  const _useOrganisation = useOrganization(queryClient);
  const getOrganisations = _useOrganisation.filtersGetAll();

  const organizations =
    getOrganisations.isSuccess &&
    getOrganisations.data?.results?.map((organisation: any) => ({
      label: organisation.name,
      value: organisation.name,
    }));

  React.useEffect(() => setIsOpen(screenSize === "desktop"), [screenSize]);

  const {
    register,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const isForked = (status: string) => {
    if (status) {
      setFilters({ ...filters, isForked: "false" });
    }
    if (!status) {
      setFilters({ ...filters, isForked: "true" });
    }
  };

  const isOrdered = (status: string) => {
    if (status) {
      setFilters({ ...filters, orderRating: "false" });
    }
    if (!status) {
      setFilters({ ...filters, orderRating: "true" });
    }
  };

  const resetPaginationOnFilter = () => {
    setPagination({
      ...pagination,
      componentsCurrentPage: 1,
    });
  };

  React.useEffect(() => {
    //Prevents loop that puts user at top of page after scroll
    const allFilters = { ...filters, ...pagination, ...resultDisplayLayout };
    if (_.isEqual(allFilters, queryParams)) return;

    setQueryParams({ ...filters, ...pagination, ...resultDisplayLayout });
    navigate(filtersToUrlQueryParams({ ...filters, ...pagination, ...resultDisplayLayout }, location.pathname));
  }, [filters, pagination, resultDisplayLayout]);

  const handleLayerChange = (layer: any, e: any) => {
    const currentFilters = filters["embedded.nl.embedded.commonground.layerType"] ?? [];

    if (e.target.checked) {
      setFilters({ ...filters, "embedded.nl.embedded.commonground.layerType": [...currentFilters, layer.value] });

      return; // added the layer to filters, no need to also remove an entry
    }

    setFilters({
      ...filters,
      "embedded.nl.embedded.commonground.layerType": currentFilters.filter((l) => l !== layer.value),
    });
  };

  const handlePlatformChange = (platform: any, e: any) => {
    const currentFilters = filters.platforms ?? [];

    if (e.target.checked) {
      setFilters({ ...filters, platforms: [...currentFilters, platform.value] });

      return; // added the platform to filters, no need to also remove an entry
    }

    setFilters({
      ...filters,
      platforms: currentFilters.filter((l) => l !== platform.value),
    });
  };

  const handleSetFormValues = (): void => {
    window.sessionStorage.getItem("FILTER_FORKS") !== "false" && setValue("hideForks", filters.isForked);
    window.sessionStorage.getItem("FILTER_RATING") !== "false" && setValue("orderRating", filters.orderRating);
  };

  React.useEffect(() => {
    setFilters({
      ...filters,
      developmentStatus: statusRadioFilter,
    });
  }, [statusRadioFilter]);

  React.useEffect(() => {
    handleSetFormValues();
  }, [filters]);

  React.useEffect(() => {
    setFilters({
      ...filters,
      "embedded.maintenance.type": maintenanceTypeRadioFilter,
    });
  }, [maintenanceTypeRadioFilter]);

  React.useEffect(() => {
    reset({
      layerType: getSelectedItemsFromFilters(layers, filters["embedded.nl.embedded.commonground.layerType"]),
      upl: getSelectedItemsFromFilters(upls, filters["embedded.nl.embedded.upl"]),
      platforms: getSelectedItemsFromFilters(platforms, filters.platforms),
      category: getSelectedItemFromFilters(categories, filters.category),
      bedrijfsfuncties: getSelectedItemsFromFilters(
        bedrijfsfuncties,
        filters["embedded.nl.embedded.gemma.bedrijfsfuncties"],
      ),
      bedrijfsservices: getSelectedItemsFromFilters(
        bedrijfsservices,
        filters["embedded.nl.embedded.gemma.bedrijfsservices"],
      ),
      referentieComponenten: getSelectedItemsFromFilters(
        referentieComponenten,
        filters["embedded.nl.embedded.gemma.referentieComponenten"],
      ),
      applicatiefunctie: getSelectedItemFromFilters(
        applicatiefuncties,
        filters["embedded.nl.embedded.gemma.applicatiefunctie"],
      ),
      softwareType: getSelectedItemFromFilters(softwareTypes, filters.softwareType),
      status: getSelectedItemFromFilters(statuses, filters.developmentStatus),
      maintenanceType: getSelectedItemFromFilters(maintenanceTypes, filters["embedded.maintenance.type"]),
      license: getSelectedItemFromFilters(licenses, filters["embedded.legal.license"]),
      organization:
        organizations && getSelectedItemFromFilters(organizations, filters["embedded.url.embedded.organisation.name"]),
      interface: filters["embedded.nl.embedded.commonground.layerType"]?.includes("interface"),
      process: filters["embedded.nl.embedded.commonground.layerType"]?.includes("process"),
      integration: filters["embedded.nl.embedded.commonground.layerType"]?.includes("integration"),
      service: filters["embedded.nl.embedded.commonground.layerType"]?.includes("service"),
      data: filters["embedded.nl.embedded.commonground.layerType"]?.includes("data"),
      web: filters.platforms?.includes("web"),
      windows: filters.platforms?.includes("windows"),
      mac: filters.platforms?.includes("mac"),
      linux: filters.platforms?.includes("linux"),
      ios: filters.platforms?.includes("ios"),
      android: filters.platforms?.includes("android"),
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(
      ({
        upl,
        category,
        maintenanceType,
        status,
        softwareType,
        license,
        bedrijfsservices,
        bedrijfsfuncties,
        referentieComponenten,
        applicatiefunctie,
        organization,
      }) => {
        setFilters({
          ...filters,
          category: category?.value,
          "embedded.nl.embedded.gemma.bedrijfsfuncties": bedrijfsfuncties?.map((b: any) => b.value),
          "embedded.nl.embedded.gemma.bedrijfsservices": bedrijfsservices?.map((b: any) => b.value),
          "embedded.nl.embedded.gemma.referentieComponenten": referentieComponenten?.map((rC: any) => rC.value),
          "embedded.nl.embedded.gemma.applicatiefunctie": applicatiefunctie?.value,
          softwareType: softwareType?.value,
          developmentStatus: status?.value,
          "embedded.maintenance.type": maintenanceType?.value,
          "embedded.legal.license": license?.value,
          "embedded.url.embedded.organisation.name": organization?.value,
          "embedded.nl.embedded.upl": upl?.map((u: any) => u.value),
        });
        setPagination({
          ...pagination,
          componentsCurrentPage: 1,
        });
        setResultDisplayLayout({
          ...resultDisplayLayout,
          componentsDisplayLayout: resultDisplayLayout.componentsDisplayLayout,
        });
      },
    );

    return () => subscription.unsubscribe();
  }, [filterSet]);

  //useEffects to uncheck checkboxes and radio

  React.useEffect(() => {
    const unsetLayerFilter = layers.filter(
      (layer) =>
        filters["embedded.nl.embedded.commonground.layerType"] &&
        !filters["embedded.nl.embedded.commonground.layerType"].includes(layer.value),
    );

    unsetLayerFilter.map((layer: any) => {
      const checkBox = document.getElementById(`checkbox${layer.label}`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked === true) {
        checkBox.click();
      }
    });
  }, [filters["embedded.nl.embedded.commonground.layerType"]]);

  React.useEffect(() => {
    const unsetPlatformsFilter = platforms.filter(
      (platform) => filters.platforms && !filters.platforms.includes(platform.value),
    );

    unsetPlatformsFilter.map((platform: any) => {
      const checkBox = document.getElementById(`checkbox${platform.label}`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked === true) {
        checkBox.click();
      }
    });
  }, [filters.platforms]);

  React.useEffect(() => {
    if (filters.isForked === "true") return;
    if (filters.isForked === "false") {
      const checkBox = document.getElementById(`checkboxhideForks`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked === true) {
        checkBox.click();
      }
    }
  }, [filters.isForked]);

  React.useEffect(() => {
    if (filters.orderRating === "true") return;
    if (filters.orderRating === "false") {
      const checkBox = document.getElementById(`checkboxorderRating`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked === true) {
        checkBox.click();
      }
    }
  }, [filters.orderRating]);

  React.useEffect(() => {
    if (filters.developmentStatus === statusRadioFilter) return;
    if (filters.developmentStatus === undefined) {
      setStatusRadioFilter("");
    }
  }, [filters.developmentStatus]);

  React.useEffect(() => {
    if (filters["embedded.maintenance.type"] === maintenanceTypeRadioFilter) return;
    if (filters["embedded.maintenance.type"] === undefined) {
      setMaintenanceTypeRadioFilter("");
    }
  }, [filters["embedded.maintenance.type"]]);

  const handleSetFormValuesFromParams = (params: any): void => {
    setFilters({
      ...filters,
      isForked: window.sessionStorage.getItem("FILTER_FORKS") !== "false" && params.isForked ? params.isForked : false,
      orderRating:
        window.sessionStorage.getItem("FILTER_RATING") !== "false" && params.orderRating ? params.orderRating : false,
      rating:
        window.sessionStorage.getItem("FILTER_RATING") !== "false" && params.rating ? params.rating : ratingDefault,
      ratingCommonground:
        window.sessionStorage.getItem("FILTER_RATING") !== "false" && params.ratingCommonground
          ? params.ratingCommonground
          : ratingDefault,
      "embedded.nl.embedded.commonground.layerType":
        window.sessionStorage.getItem("FILTER_LAYER") !== "false" &&
        params["embedded.nl.embedded.commonground.layerType"]
          ? [...params["embedded.nl.embedded.commonground.layerType"]]
          : [],
      "embedded.nl.embedded.upl":
        window.sessionStorage.getItem("FILTER_UPL") !== "false" && params["embedded.nl.embedded.upl"]
          ? [...params["embedded.nl.embedded.upl"]]
          : [],
      "embedded.url.embedded.organisation.name":
        window.sessionStorage.getItem("FILTER_ORGANISATION") !== "false" &&
        params["embedded.url.embedded.organisation.name"]
          ? params["embedded.url.embedded.organisation.name"]
          : undefined,
      category: window.sessionStorage.getItem("FILTER_CATEGORY") !== "false" && params.category ? params.category : "",
      platforms:
        window.sessionStorage.getItem("FILTER_PLATFORMS") !== "false" && params.platforms ? [...params.platforms] : [],
      developmentStatus:
        window.sessionStorage.getItem("FILTER_STATUS") !== "false" && params.developmentStatus
          ? params.developmentStatus
          : "",
      "embedded.maintenance.type":
        window.sessionStorage.getItem("FILTER_MAINTENANCE_TYPES") !== "false" && params["embedded.maintenance.type"]
          ? params["embedded.maintenance.type"]
          : "",
      "embedded.legal.license":
        window.sessionStorage.getItem("FILTER_LICENSE") !== "false" && params["embedded.legal.license"]
          ? params["embedded.legal.license"]
          : "",
      "embedded.nl.embedded.gemma.bedrijfsfuncties":
        window.sessionStorage.getItem("FILTER_BUSINESS_FUNCTIONS") !== "false" &&
        params["embedded.nl.embedded.gemma.bedrijfsfuncties"]
          ? [...params["embedded.nl.embedded.gemma.bedrijfsfuncties"]]
          : [],
      softwareType:
        window.sessionStorage.getItem("FILTER_SOFTWARE_TYPE") !== "false" && params.softwareType
          ? params.softwareType
          : "",
      "embedded.nl.embedded.gemma.bedrijfsservices":
        window.sessionStorage.getItem("FILTER_BUSINESS_SERVICES") !== "false" &&
        params["embedded.nl.embedded.gemma.bedrijfsservices"]
          ? [...params["embedded.nl.embedded.gemma.bedrijfsservices"]]
          : [],
      "embedded.nl.embedded.gemma.referentieComponenten":
        window.sessionStorage.getItem("FILTER_REFERENCE_COMPONENTS") !== "false" &&
        params["embedded.nl.embedded.gemma.referentieComponenten"]
          ? [...params["embedded.nl.embedded.gemma.referentieComponenten"]]
          : [],
    });
    setPagination({
      ...pagination,
      componentsCurrentPage: params.componentsCurrentPage ? _.toNumber(params.componentsCurrentPage) : 1,
    });
    setResultDisplayLayout({
      ...resultDisplayLayout,
      componentsDisplayLayout: params.componentsDisplayLayout !== undefined ? params.componentsDisplayLayout : "table",
    });
    setRatingFilter(params.rating);
  };

  const changeRatingFilter = (e: any) => {
    setRatingFilter(e.target.value);

    if (ratingFilterTimeout.current) clearTimeout(ratingFilterTimeout.current);

    ratingFilterTimeout.current = setTimeout(() => {
      setFilters({
        ...filters,
        rating: e.target.value,
      });
    }, 500);
  };

  const changeCommongroundRatingFilter = (e: any) => {
    setRatingFilterCommonground(e.target.value);

    if (ratingFilterTimeout.current) clearTimeout(ratingFilterTimeout.current);

    ratingFilterTimeout.current = setTimeout(() => {
      setFilters({
        ...filters,
        ratingCommonground: e.target.value,
      });
    }, 500);
  };

  const url = location.search;
  const [, params] = url.split("?");
  const parsedParams = qs.parse(params);

  React.useEffect(() => {
    if (_.isEmpty(parsedParams)) return;

    handleSetFormValuesFromParams(parsedParams);
  }, []);

  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <Collapsible
        className={styles.collapsible}
        openedClassName={styles.collapsible}
        triggerClassName={styles.title}
        triggerOpenedClassName={styles.title}
        trigger={
          <div className={styles.trigger}>
            <span>Filters</span>
            <FontAwesomeIcon className={clsx(styles.toggleIcon, isOpen && styles.isOpen)} icon={faChevronRight} />
          </div>
        }
        open={isOpen}
        transitionTime={100}
        onOpening={() => setIsOpen(true)}
        onClosing={() => setIsOpen(false)}
      >
        <Separator className={styles.separator} />

        <form className={styles.form}>
          {window.sessionStorage.getItem("FILTER_FORKS") !== "false" && (
            <FormField>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>Extra</span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenExtra && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenExtra}
                transitionTime={100}
                onOpening={() => setIsOpenExtra(true)}
                onClosing={() => setIsOpenExtra(false)}
              >
                <div className={styles.radioContainer} onChange={() => isForked(filters.isForked)}>
                  <InputCheckbox label={t("Hide forks")} name={"hideForks"} {...{ errors, control, register }} />
                </div>
              </Collapsible>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_RATING") !== "false" && (
            <FormField>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>
                      {t("Rating")} <span className={styles.filterCountIndicator}></span>
                    </span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenRating && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenRating}
                transitionTime={100}
                onOpening={() => setIsOpenRating(true)}
                onClosing={() => setIsOpenRating(false)}
              >
                <div className={styles.ratingContainer}>
                  <div className={styles.radioContainer} onChange={() => isOrdered(filters.orderRating)}>
                    <InputCheckbox
                      label={t("Order by rating")}
                      name={"orderRating"}
                      {...{ errors, control, register }}
                    />
                  </div>

                  {window.sessionStorage.getItem("FILTER_RATING") === "Commonground" ? (
                    <div>
                      <div className={styles.ratingSliderContainer}>
                        <Textbox
                          className={styles.ratingSlider}
                          type="range"
                          onChange={(e) => changeCommongroundRatingFilter(e)}
                          min={0}
                          max={3}
                          list="ratingDataList"
                          value={ratingFilterCommonground}
                          id="ratingSlider"
                        />
                        <datalist className={styles.dataList} id="ratingDataList">
                          <option value="0" label="N.V.T."></option>
                          <option value="1" label={t("Bronze")}></option>
                          <option value="2" label={t("Silver")}></option>
                          <option value="3" label={t("Gold")}></option>
                        </datalist>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span>
                        {t("Rating")}: <span>{ratingFilter}</span>
                      </span>
                      <div className={styles.ratingSliderContainer}>
                        <Textbox
                          className={styles.ratingSlider}
                          type="range"
                          onChange={(e) => changeRatingFilter(e)}
                          min={0}
                          max={24}
                          list="ratingDataList"
                          value={ratingFilter}
                          id="ratingSlider"
                        />
                        <datalist className={styles.dataList} id="ratingDataList">
                          <option value="0" label="0"></option>
                          <option value="6" label="6"></option>
                          <option value="12" label="12"></option>
                          <option value="18" label="18"></option>
                          <option value="24" label="24"></option>
                        </datalist>
                      </div>
                    </div>
                  )}
                </div>
              </Collapsible>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_LAYER") !== "false" && (
            <FormField>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>
                      Laag <span className={styles.filterCountIndicator}>({layers.length})</span>
                    </span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenLayer && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenLayer}
                transitionTime={100}
                onOpening={() => setIsOpenLayer(true)}
                onClosing={() => setIsOpenLayer(false)}
              >
                <div>
                  {layers.map((layer) => (
                    <div onChange={(e) => handleLayerChange(layer, e)} key={layer.value}>
                      <InputCheckbox label={layer.label} name={layer.value} {...{ errors, control, register }} />
                    </div>
                  ))}
                </div>
              </Collapsible>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_UPL") !== "false" && (
            <FormField>
              <FormLabel htmlFor={"sortFormULP"}>
                <span className={styles.filterTitle}>
                  UPL <span className={styles.filterCountIndicator}>({upls.length})</span>
                </span>
              </FormLabel>

              <div className={styles.selectBorder}>
                <SelectMultiple
                  id="sortFormULP"
                  name="upl"
                  options={upls}
                  {...{ errors, control, register }}
                  ariaLabel={t("Select UPL")}
                />
              </div>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_ORGANISATION") !== "false" && (
            <FormField>
              <FormLabel htmlFor={"sortFormOrginisation"}>
                <span className={styles.filterTitle}>
                  Organisatie <span className={styles.filterCountIndicator}>({organizations?.length ?? "-"})</span>
                </span>
              </FormLabel>
              <div className={styles.selectBorder}>
                {getOrganisations.isLoading && <Skeleton height="50px" />}

                {getOrganisations.isSuccess && (
                  <SelectSingle
                    id="sortFormOrginisation"
                    isClearable
                    options={organizations}
                    name="organization"
                    ariaLabel={t("Select organization")}
                    {...{ errors, control, register }}
                  />
                )}
              </div>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_CATEGORY") !== "false" && (
            <FormField>
              <FormLabel htmlFor={"sortFormCategory"}>
                <span className={styles.filterTitle}>
                  Categorie <span className={styles.filterCountIndicator}>({categories.length})</span>
                </span>
              </FormLabel>
              <div className={styles.selectBorder}>
                <SelectSingle
                  id="sortFormCategory"
                  isClearable
                  name="category"
                  options={categories}
                  ariaLabel={t("Select category")}
                  {...{ errors, control, register }}
                />
              </div>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_PLATFORMS") !== "false" && (
            <FormField>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>
                      Platforms <span className={styles.filterCountIndicator}>({platforms.length})</span>
                    </span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenPlatforms && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenPlatforms}
                transitionTime={100}
                onOpening={() => setIsOpenPlatforms(true)}
                onClosing={() => setIsOpenPlatforms(false)}
              >
                {platforms.map((platform) => (
                  <div onChange={(e) => handlePlatformChange(platform, e)} key={platform.value}>
                    <InputCheckbox label={platform.label} name={platform.value} {...{ errors, control, register }} />
                  </div>
                ))}
              </Collapsible>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_STATUS") !== "false" && (
            <FormField>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>
                      Status <span className={styles.filterCountIndicator}>({statuses.length})</span>
                    </span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenStatus && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenStatus}
                transitionTime={100}
                onOpening={() => setIsOpenStatus(true)}
                onClosing={() => setIsOpenStatus(false)}
              >
                {statuses.map((status) => (
                  <div
                    className={styles.radioContainer}
                    onChange={() => setStatusRadioFilter(status.value)}
                    onClick={() => resetPaginationOnFilter()}
                    key={status.value}
                  >
                    <RadioButton
                      className={styles.radioButton}
                      value={status.value}
                      checked={filters.developmentStatus === status.value}
                    />
                    <span className={styles.radioLabel} onClick={() => setStatusRadioFilter(status.value)}>
                      {t(status.label)}
                    </span>
                  </div>
                ))}
              </Collapsible>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_MAINTENANCE_TYPES") !== "false" && (
            <FormField>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>
                      Onderhoudstypes <span className={styles.filterCountIndicator}>({maintenanceTypes.length})</span>
                    </span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenMaintenanceType && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenMaintenanceType}
                transitionTime={100}
                onOpening={() => setIsOpenMaintenanceType(true)}
                onClosing={() => setIsOpenMaintenanceType(false)}
              >
                {maintenanceTypes.map((maintenanceType) => (
                  <div
                    className={styles.radioContainer}
                    onChange={() => setMaintenanceTypeRadioFilter(maintenanceType.value)}
                    onClick={() => resetPaginationOnFilter()}
                    key={maintenanceType.value}
                  >
                    <RadioButton
                      className={styles.radioButton}
                      value={maintenanceType.value}
                      checked={filters["embedded.maintenance.type"] === maintenanceType.value}
                    />

                    <span
                      className={styles.radioLabel}
                      onClick={() => setMaintenanceTypeRadioFilter(maintenanceType.value)}
                    >
                      {maintenanceType.label}
                    </span>
                  </div>
                ))}
              </Collapsible>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_LICENSE") !== "false" && (
            <FormField>
              <FormLabel htmlFor={"sortFormLicense"}>
                <span className={styles.filterTitle}>
                  Licentie <span className={styles.filterCountIndicator}>({licenses.length})</span>
                </span>
              </FormLabel>
              <div className={styles.selectBorder}>
                <SelectSingle
                  id="sortFormLicense"
                  isClearable
                  name="license"
                  options={licenses}
                  ariaLabel={t("Select license")}
                  {...{ errors, control, register }}
                />
              </div>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_BUSINESS_FUNCTIONS") !== "false" && (
            <FormField id="sortFormCompanyFunction">
              <FormLabel htmlFor={"sortFormCompanyFunction"}>
                <span className={styles.filterTitle}>
                  Bedrijfsfuncties <span className={styles.filterCountIndicator}>({bedrijfsfuncties.length})</span>
                </span>
              </FormLabel>
              <div className={styles.selectBorder}>
                <SelectMultiple
                  id="sortFormLicense"
                  name="bedrijfsfuncties"
                  options={bedrijfsfuncties}
                  ariaLabel={t("Select business function")}
                  {...{ errors, control, register }}
                />
              </div>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_SOFTWARE_TYPE") !== "false" && (
            <FormField>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>
                      Softwaretype
                      <span className={styles.filterCountIndicator}>({softwareTypes.length})</span>
                    </span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenSoftwareTypes && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenSoftwareTypes}
                transitionTime={100}
                onOpening={() => setIsOpenSoftwareTypes(true)}
                onClosing={() => setIsOpenSoftwareTypes(false)}
              >
                {softwareTypes.map((softwareType) => (
                  <div
                    className={styles.radioContainer}
                    key={softwareType.value}
                    onClick={() => resetPaginationOnFilter()}
                  >
                    <RadioButton
                      className={styles.radioButton}
                      value={softwareType.value}
                      checked={filters.softwareType === softwareType.value}
                    />
                    <span
                      className={styles.radioLabel}
                      onClick={() =>
                        setFilters({
                          ...filters,
                          softwareType: softwareType.value,
                        })
                      }
                    >
                      {t(softwareType.label)}
                    </span>
                  </div>
                ))}
              </Collapsible>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_BUSINESS_SERVICES") !== "false" && (
            <FormField>
              <FormLabel htmlFor={"sortFormServices"}>
                <span className={styles.filterTitle}>
                  Bedrijfsservices <span className={styles.filterCountIndicator}>({bedrijfsservices.length})</span>
                </span>
              </FormLabel>
              <div className={styles.selectBorder}>
                <SelectMultiple
                  id="sortFormServices"
                  name="bedrijfsservices"
                  options={bedrijfsservices}
                  ariaLabel={t("Select business services")}
                  {...{ errors, control, register }}
                />
              </div>
            </FormField>
          )}

          {window.sessionStorage.getItem("FILTER_REFERENCE_COMPONENTS") !== "false" && (
            <FormField>
              <FormLabel htmlFor={"sortFormReference"}>
                <span className={styles.filterTitle}>
                  Referentie componenten
                  <span className={styles.filterCountIndicator}>({referentieComponenten.length})</span>
                </span>
              </FormLabel>
              <div className={styles.selectBorder}>
                <SelectMultiple
                  id="sortFormReference"
                  name="referentieComponenten"
                  options={referentieComponenten}
                  ariaLabel={t("Select reference components")}
                  {...{ errors, control, register }}
                />
              </div>
            </FormField>
          )}
        </form>
      </Collapsible>
    </div>
  );
};
