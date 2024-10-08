import * as React from "react";
import * as styles from "./VerticalFiltersTemplate.module.css";
import clsx from "clsx";
import qs from "qs";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { IFiltersContext, defaultFiltersContext, ratingDefault, useFiltersContext } from "../../../../context/filters";
import { InputCheckbox, SelectMultiple, SelectSingle } from "@conduction/components";
import {
  platforms,
  maintenanceTypes,
  softwareTypes,
  statuses,
  bedrijfsservices,
  applicatiefuncties,
  referentieComponenten,
  categories,
  layers,
  bedrijfsfuncties,
} from "./../../../../data/filters";
import {
  getSelectedItemFromFilters,
  getSelectedItemsFromFilters,
  getSelectedItemsFromFiltersMultiSelect,
} from "../../../../services/getSelectedItemsFromFilters";
import Collapsible from "react-collapsible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { FormField, FormLabel, RadioButton, Separator, Textbox } from "@utrecht/component-library-react";
import { useTranslation } from "react-i18next";
import { useGatsbyContext } from "../../../../context/gatsby";
import { navigate } from "gatsby";
import { filtersToUrlQueryParams } from "../../../../services/filtersToQueryParams";
import { usePaginationContext } from "../../../../context/pagination";
import { useResultDisplayLayoutContext } from "../../../../context/resultDisplayLayout";
import { useAvailableFilters } from "../../../../hooks/availableFilters";
import { getSoftwareTypeLabel } from "../../../../services/getSoftwareTypeLabel";

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
  const [parsedParamsFilters, setParsedParamsFilters] = React.useState<any>();

  const [categoriesOptions, setCategoriesOptions] = React.useState<any>();
  const [organizationOptions, setOrganizationOptions] = React.useState<any>();
  const [uplOptions, setUplOptions] = React.useState<any>();
  const [platformsOptions, setPlatformsOptions] = React.useState<any>();
  const [licenseOptions, setLicenseOptions] = React.useState<any>();
  const [businessFunctionsOptions, setBusinessFunctionsOptions] = React.useState<any>();
  const [softwareTypeOptions, setSoftwareTypeOptions] = React.useState<any>();
  const [businessServicesOptions, setBusinessServicesOptions] = React.useState<any>();
  const [referenceComponentsOptions, setReferenceComponentsOptions] = React.useState<any>();

  const [statusRadioFilter, setStatusRadioFilter] = React.useState<string>("");
  const [maintenanceTypeRadioFilter, setMaintenanceTypeRadioFilter] = React.useState<string>(
    filters["embedded.maintenance.type"] ?? "",
  );

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

  React.useEffect(() => setIsOpen(screenSize === "desktop"), [screenSize]);

  const {
    register,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const isForked = (status: boolean) => {
    if (status) {
      setFilters({ ...filters, isForked: false });
    }
    if (!status) {
      setFilters({ ...filters, isForked: true });
    }
  };

  const isOrdered = (status: boolean) => {
    if (status) {
      setFilters({ ...filters, orderRating: false });
    }
    if (!status) {
      setFilters({ ...filters, orderRating: true });
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
    const platformObject: any = {};
    const setPlatformObject = () =>
      platformsOptions &&
      platformsOptions.map((platform: any) => {
        platformObject[platform.value] = filters.platforms?.includes(platform.value);
      });

    setPlatformObject();

    reset({
      layerType: getSelectedItemsFromFilters(layers, filters["embedded.nl.embedded.commonground.layerType"]),
      upl: getSelectedItemsFromFilters(uplOptions, filters["embedded.nl.embedded.upl"]),
      platforms: platformsOptions && getSelectedItemsFromFilters(platformsOptions ?? platforms, filters.platforms),
      category: getSelectedItemFromFilters(categoriesOptions ?? categories, filters.category),
      bedrijfsfuncties: getSelectedItemsFromFiltersMultiSelect(
        businessFunctionsOptions ?? bedrijfsfuncties,
        filters["embedded.nl.embedded.gemma.bedrijfsfuncties"],
      ),
      bedrijfsservices: getSelectedItemsFromFiltersMultiSelect(
        businessFunctionsOptions ?? bedrijfsservices,
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
      softwareType: getSelectedItemFromFilters(softwareTypeOptions ?? softwareTypes, filters.softwareType),
      status: getSelectedItemFromFilters(statuses, filters.developmentStatus),
      maintenanceType: getSelectedItemFromFilters(maintenanceTypes, filters["embedded.maintenance.type"]),
      license: licenseOptions && getSelectedItemFromFilters(licenseOptions, filters["embedded.legal.license"]),
      organization:
        organizationOptions &&
        getSelectedItemFromFilters(organizationOptions, filters["embedded.url.embedded.organisation.name"]),
      interface: filters["embedded.nl.embedded.commonground.layerType"]?.includes("interface"),
      process: filters["embedded.nl.embedded.commonground.layerType"]?.includes("process"),
      integration: filters["embedded.nl.embedded.commonground.layerType"]?.includes("integration"),
      service: filters["embedded.nl.embedded.commonground.layerType"]?.includes("service"),
      data: filters["embedded.nl.embedded.commonground.layerType"]?.includes("data"),
      ...platformObject,
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
    if (_.isEmpty(platformsOptions)) return;

    const unsetPlatformsFilter = platformsOptions?.filter(
      (platform: any) => filters.platforms && !filters.platforms.includes(platform.value),
    );

    unsetPlatformsFilter.map((platform: any) => {
      const checkBox = document.getElementById(`checkbox${platform.value}`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked === true) {
        checkBox.click();
      }
    });
  }, [filters.platforms, platformsOptions]);

  React.useEffect(() => {
    if (filters.isForked === true) return;
    if (filters.isForked === false) {
      const checkBox = document.getElementById(`checkboxhideForks`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked === true) {
        checkBox.click();
      }
    }
  }, [filters.isForked]);

  React.useEffect(() => {
    if (filters.orderRating === true) return;
    if (filters.orderRating === false) {
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
    setParsedParamsFilters(parsedParams);
  }, []);

  // Availible Filters
  const _useFilters = useAvailableFilters();
  const getFilterOptions = _useFilters.getFilterOptions();

  const layerOptions =
    getFilterOptions.isSuccess &&
    getFilterOptions.data["embedded.nl.embedded.commonground.layerType"].map((layer: any) => layer._id);

  const handleSetSelectFormValues = (params: any): void => {
    setValue(
      "organization",
      organizationOptions?.find((option: any) => option.value === params["embedded.url.embedded.organisation.name"]),
    );

    setValue("category", categoriesOptions?.find((option: any) => option.value === params.category?.toLowerCase()));

    setValue(
      "license",
      licenseOptions?.find((option: any) => option.value === params["embedded.legal.license"]?.toLowerCase()),
    );

    setValue("softwareType", softwareTypeOptions?.find((option: any) => option.value === params.softwareType));
  };
  React.useEffect(() => {
    if (_.isEmpty(parsedParamsFilters)) return;
    if (_.isEmpty(organizationOptions)) return;
    if (_.isEmpty(categoriesOptions)) return;
    if (_.isEmpty(licenseOptions)) return;
    if (_.isEmpty(softwareTypeOptions)) return;

    handleSetSelectFormValues(parsedParamsFilters);
  }, [organizationOptions, categoriesOptions, licenseOptions, softwareTypeOptions]);

  const getCount = (filterData: string, label: string) => {
    const result = getFilterOptions.data[filterData].find((option: any) => {
      return option._id === label;
    });

    return result?.count ?? "0";
  };

  const filterOutUndifined = (array: any) => {
    return array.filter(function (el: any) {
      return el != null;
    });
  };

  React.useEffect(() => {
    if (!getFilterOptions.isSuccess) return;

    // Organizations
    const organizationsWithData = getFilterOptions.data["embedded.url.embedded.organisation.name"].map(
      (organization: any) => {
        if (organization._id === "" || organization._id === " ") return;

        return {
          label: organization._id,
          value: organization._id,
        };
      },
    );

    const uniqueOrganizationOptions: any[] = _.orderBy(
      _.uniqBy(filterOutUndifined(organizationsWithData), "value"),
      "label",
      "asc",
    );
    setOrganizationOptions(uniqueOrganizationOptions);

    // Upl
    const uplWithData = getFilterOptions.data["embedded.nl.embedded.upl"].map((upl: any) => ({
      label: upl._id,
      value: upl._id,
    }));
    const uniqueUplOptions: any[] = _.orderBy(_.uniqBy(uplWithData, "value"), "label", "asc");
    setUplOptions(uniqueUplOptions);

    // Categories
    const categoriesWithData = getFilterOptions.data.categories.map((category: any) => {
      if (category._id === "" || category._id === " ") return;

      return {
        label: _.upperFirst(category._id),
        value: category._id,
      };
    });

    const uniqueCategoriesOptions: any[] = _.orderBy(
      _.uniqBy(filterOutUndifined(categoriesWithData), "value"),
      "label",
      "asc",
    );
    setCategoriesOptions(uniqueCategoriesOptions);

    // Platforms
    const platformsWithData = getFilterOptions.data.platforms.map((category: any) => ({
      label: _.upperFirst(category._id),
      value: category._id,
    }));
    const uniquePlatformsOptions: any[] = _.orderBy(_.uniqBy(platformsWithData, "value"), "label", "asc");
    setPlatformsOptions(uniquePlatformsOptions);

    // Licenses
    const licensesWithData = getFilterOptions.data["embedded.legal.license"].map((license: any) => {
      if (license._id === "" || license._id === " ") return;

      return {
        label: _.upperFirst(license._id),
        value: _.toLower(license._id),
      };
    });
    const uniqueLicenseOptions: any[] = _.orderBy(
      _.uniqBy(filterOutUndifined(licensesWithData), "value"),
      "label",
      "asc",
    );
    setLicenseOptions(uniqueLicenseOptions);

    // Business Functions
    const businessFunctionsWithData = getFilterOptions.data["embedded.nl.embedded.gemma.bedrijfsfuncties"].map(
      (businessFunction: any) => {
        if (businessFunction._id === "" || businessFunction._id === " ") return;

        return {
          label: businessFunction._id,
          value: businessFunction._id,
        };
      },
    );
    const uniqueBusinessFunctionsOptions: any[] = _.orderBy(
      _.uniqBy(filterOutUndifined(businessFunctionsWithData), "value"),
      "label",
      "asc",
    );
    setBusinessFunctionsOptions(uniqueBusinessFunctionsOptions);

    // Softwaretype
    const softwareTypeWithData = getFilterOptions.data.softwareType.map((softwareType: any) => ({
      label: getSoftwareTypeLabel(softwareType._id),
      value: softwareType._id,
    }));
    const uniqueSoftwaretypeOptions: any[] = _.orderBy(_.uniqBy(softwareTypeWithData, "value"), "label", "asc");
    setSoftwareTypeOptions(uniqueSoftwaretypeOptions);

    // Business Services
    const businessServicesWithData = getFilterOptions.data["embedded.nl.embedded.gemma.bedrijfsservices"].map(
      (businessService: any) => {
        if (businessService._id === "" || businessService._id === " ") return;
        return {
          label: businessService._id,
          value: businessService._id,
        };
      },
    );
    const uniquBusinessServicesOptions: any[] = _.orderBy(
      _.uniqBy(filterOutUndifined(businessServicesWithData), "value"),
      "label",
      "asc",
    );
    setBusinessServicesOptions(uniquBusinessServicesOptions);

    // Reference Components
    const referenceComponentsWithData = getFilterOptions.data["embedded.nl.embedded.gemma.referentieComponenten"].map(
      (referenceComponent: any) => ({
        label: referenceComponent._id,
        value: referenceComponent._id,
      }),
    );
    const uniquReferenceComponentsOptions: any[] = _.orderBy(
      _.uniqBy(referenceComponentsWithData, "value"),
      "label",
      "asc",
    );
    setReferenceComponentsOptions(uniquReferenceComponentsOptions);
  }, [getFilterOptions.isSuccess]);

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
        {getFilterOptions.isSuccess && (
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
                      <span className={styles.filterTitle}>Laag</span>
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
                        <InputCheckbox
                          disabled={!layerOptions.includes(_.toLower(layer.value))}
                          label={`${layer.label} (${getCount(
                            "embedded.nl.embedded.commonground.layerType",
                            layer.value,
                          )})`}
                          name={layer.value}
                          {...{ errors, control, register }}
                        />
                      </div>
                    ))}
                  </div>
                </Collapsible>
              </FormField>
            )}

            {window.sessionStorage.getItem("FILTER_UPL") !== "false" && uplOptions?.length > 0 && (
              <FormField>
                <FormLabel htmlFor={"sortFormULP"}>
                  <span className={styles.filterTitle}>
                    UPL <span className={styles.filterCountIndicator}>({uplOptions?.length ?? "0"})</span>
                  </span>
                </FormLabel>

                <div className={styles.selectBorder}>
                  <SelectMultiple
                    id="sortFormULP"
                    name="upl"
                    options={uplOptions}
                    {...{ errors, control, register }}
                    ariaLabel={t("Select UPL")}
                  />
                </div>
              </FormField>
            )}

            {window.sessionStorage.getItem("FILTER_ORGANISATION") !== "false" && organizationOptions?.length > 0 && (
              <FormField>
                <FormLabel htmlFor={"sortFormOrginisation"}>
                  <span className={styles.filterTitle}>
                    Organisatie{" "}
                    <span className={styles.filterCountIndicator}>({organizationOptions?.length ?? "0"})</span>
                  </span>
                </FormLabel>
                <div className={styles.selectBorder}>
                  {getFilterOptions.isLoading && <Skeleton height="50px" />}

                  {organizationOptions && (
                    <SelectSingle
                      id="sortFormOrginisation"
                      isClearable
                      options={organizationOptions}
                      name="organization"
                      ariaLabel={t("Select organization")}
                      {...{ errors, control, register }}
                    />
                  )}
                </div>
              </FormField>
            )}

            {window.sessionStorage.getItem("FILTER_CATEGORY") !== "false" && categoriesOptions?.length > 0 && (
              <FormField>
                <FormLabel htmlFor={"sortFormCategory"}>
                  <span className={styles.filterTitle}>
                    Categorie <span className={styles.filterCountIndicator}>({categoriesOptions?.length})</span>
                  </span>
                </FormLabel>
                <div className={styles.selectBorder}>
                  <SelectSingle
                    id="sortFormCategory"
                    isClearable
                    name="category"
                    options={categoriesOptions}
                    ariaLabel={t("Select category")}
                    {...{ errors, control, register }}
                  />
                </div>
              </FormField>
            )}

            {window.sessionStorage.getItem("FILTER_PLATFORMS") !== "false" && platformsOptions?.length > 0 && (
              <FormField>
                <Collapsible
                  className={styles.collapsible}
                  openedClassName={styles.collapsible}
                  triggerClassName={styles.title}
                  triggerOpenedClassName={styles.title}
                  trigger={
                    <div className={styles.trigger}>
                      <span className={styles.filterTitle}>
                        Platforms <span className={styles.filterCountIndicator}>({platformsOptions?.length})</span>
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
                  {platformsOptions?.map((platform: any) => (
                    <div onChange={(e) => handlePlatformChange(platform, e)} key={platform.value}>
                      <InputCheckbox
                        label={`${platform.label} (${getCount("platforms", platform.value)})`}
                        name={platform.value}
                        {...{ errors, control, register }}
                      />
                    </div>
                  ))}
                </Collapsible>
              </FormField>
            )}

            {window.sessionStorage.getItem("FILTER_STATUS") !== "false" && platformsOptions?.length > 0 && (
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
                        disabled={getCount("developmentStatus", status.value) === "0"}
                      />
                      <span className={styles.radioLabel} onClick={() => setStatusRadioFilter(status.value)}>
                        {t(status.label)} {`(${getCount("developmentStatus", status.value)})`}
                      </span>
                    </div>
                  ))}
                </Collapsible>
              </FormField>
            )}

            {window.sessionStorage.getItem("FILTER_MAINTENANCE_TYPES") !== "false" && maintenanceTypes?.length > 0 && (
              <FormField>
                <Collapsible
                  className={styles.collapsible}
                  openedClassName={styles.collapsible}
                  triggerClassName={styles.title}
                  triggerOpenedClassName={styles.title}
                  trigger={
                    <div className={styles.trigger}>
                      <span className={styles.filterTitle}>Onderhoudstypes</span>
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
                        disabled={getCount("embedded.maintenance.type", maintenanceType.value) === "0"}
                      />

                      <span
                        className={styles.radioLabel}
                        onClick={() => setMaintenanceTypeRadioFilter(maintenanceType.value)}
                      >
                        {maintenanceType.label} {`(${getCount("embedded.maintenance.type", maintenanceType.value)})`}
                      </span>
                    </div>
                  ))}
                </Collapsible>
              </FormField>
            )}

            {window.sessionStorage.getItem("FILTER_LICENSE") !== "false" && licenseOptions?.length > 0 && (
              <FormField>
                <FormLabel htmlFor={"sortFormLicense"}>
                  <span className={styles.filterTitle}>
                    Licentie <span className={styles.filterCountIndicator}>({licenseOptions?.length})</span>
                  </span>
                </FormLabel>
                <div className={styles.selectBorder}>
                  <SelectSingle
                    id="sortFormLicense"
                    isClearable
                    name="license"
                    options={licenseOptions}
                    ariaLabel={t("Select license")}
                    {...{ errors, control, register }}
                  />
                </div>
              </FormField>
            )}

            {window.sessionStorage.getItem("FILTER_BUSINESS_FUNCTIONS") !== "false" &&
              businessFunctionsOptions?.length > 0 && (
                <FormField id="sortFormCompanyFunction">
                  <FormLabel htmlFor={"sortFormCompanyFunction"}>
                    <span className={styles.filterTitle}>
                      Bedrijfsfuncties{" "}
                      <span className={styles.filterCountIndicator}>({businessFunctionsOptions?.length})</span>
                    </span>
                  </FormLabel>
                  <div className={styles.selectBorder}>
                    <SelectMultiple
                      id="sortFormCompanyFunction"
                      name="bedrijfsfuncties"
                      options={businessFunctionsOptions}
                      ariaLabel={t("Select business function")}
                      {...{ errors, control, register }}
                    />
                  </div>
                </FormField>
              )}

            {window.sessionStorage.getItem("FILTER_SOFTWARE_TYPE") !== "false" && softwareTypeOptions?.length > 0 && (
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
                        <span className={styles.filterCountIndicator}> ({softwareTypeOptions?.length})</span>
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
                  {softwareTypeOptions?.map((softwareType: any) => (
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
                        {t(softwareType.label)} {`(${getCount("softwareType", softwareType.value)})`}
                      </span>
                    </div>
                  ))}
                </Collapsible>
              </FormField>
            )}

            {window.sessionStorage.getItem("FILTER_BUSINESS_SERVICES") !== "false" &&
              businessServicesOptions?.length > 0 && (
                <FormField>
                  <FormLabel htmlFor={"sortFormServices"}>
                    <span className={styles.filterTitle}>
                      Bedrijfsservices{" "}
                      <span className={styles.filterCountIndicator}>({businessServicesOptions?.length})</span>
                    </span>
                  </FormLabel>
                  <div className={styles.selectBorder}>
                    <SelectMultiple
                      id="sortFormServices"
                      name="bedrijfsservices"
                      options={businessServicesOptions}
                      ariaLabel={t("Select business services")}
                      {...{ errors, control, register }}
                    />
                  </div>
                </FormField>
              )}

            {window.sessionStorage.getItem("FILTER_REFERENCE_COMPONENTS") !== "false" &&
              referenceComponentsOptions?.length > 0 && (
                <FormField>
                  <FormLabel htmlFor={"sortFormReference"}>
                    <span className={styles.filterTitle}>
                      Referentie componenten
                      <span className={styles.filterCountIndicator}> ({referenceComponentsOptions?.length})</span>
                    </span>
                  </FormLabel>
                  <div className={styles.selectBorder}>
                    <SelectMultiple
                      id="sortFormReference"
                      name="referentieComponenten"
                      options={referenceComponentsOptions}
                      ariaLabel={t("Select reference components")}
                      {...{ errors, control, register }}
                    />
                  </div>
                </FormField>
              )}
          </form>
        )}
        {getFilterOptions.isLoading && <Skeleton height="1000px" />}
      </Collapsible>
    </div>
  );
};
