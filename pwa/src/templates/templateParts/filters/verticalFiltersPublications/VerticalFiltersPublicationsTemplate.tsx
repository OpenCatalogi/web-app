import * as React from "react";
import * as styles from "./VerticalFiltersPublicationsTemplate.module.css";
import clsx from "clsx";
import qs from "qs";
import _ from "lodash";
import { useForm } from "react-hook-form";
import Collapsible from "react-collapsible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { FormField, RadioButton, Separator } from "@utrecht/component-library-react";
import { useTranslation } from "react-i18next";
import { useGatsbyContext } from "../../../../context/gatsby";
import { navigate } from "gatsby";
import { filtersToPublicationsUrlQueryParams } from "../../../../services/filtersToPublicationsQueryParams";
import { usePaginationContext } from "../../../../context/pagination";
import { useResultDisplayLayoutContext } from "../../../../context/resultDisplayLayout";
import {
  defaultPublicationFiltersContext,
  IPublicationFiltersContext,
  usePublicationFiltersContext,
} from "../../../../context/publicationFilters";
import { usePublication } from "../../../../hooks/publication";
import { QueryClient } from "react-query";

interface VerticalFiltersPublicationsTemplateProps {
  filterSet: any[];
  layoutClassName?: string;
}

export const VerticalFiltersPublicationsTemplate: React.FC<VerticalFiltersPublicationsTemplateProps> = ({
  filterSet,
  layoutClassName,
}) => {
  const { t } = useTranslation();
  const { publicationFilters, setPublicationFilters } = usePublicationFiltersContext();
  const { screenSize, location } = useGatsbyContext();
  const { pagination, setPagination } = usePaginationContext();
  const { resultDisplayLayout } = useResultDisplayLayoutContext();

  const [queryParams, setQueryParams] = React.useState<IPublicationFiltersContext>(defaultPublicationFiltersContext);
  const [parsedParamsFilters, setParsedParamsFilters] = React.useState<any>();

  const [statusOptions, setStatusOptions] = React.useState<any>();
  const [themesOptions, setThemesOptions] = React.useState<any>();
  const [typesOptions, setTypesOptions] = React.useState<any>();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [isOpenStatus, setIsopenStatus] = React.useState<boolean>(true);

  React.useEffect(() => setIsOpen(screenSize === "desktop"), [screenSize]);

  const {
    watch,
    reset,
    setValue,
  } = useForm();

  const resetPaginationOnFilter = () => {
    setPagination({
      ...pagination,
      componentsCurrentPage: 1,
    });
  };

  React.useEffect(() => {
    //Prevents loop that puts user at top of page after scroll
    const allFilters = { ...publicationFilters, ...pagination, ...resultDisplayLayout };
    if (_.isEqual(allFilters, queryParams)) return;

    setQueryParams({ ...publicationFilters, ...pagination, ...resultDisplayLayout });
    navigate(filtersToPublicationsUrlQueryParams({ ...publicationFilters, ...pagination }, location.pathname));
  }, [publicationFilters, pagination, resultDisplayLayout]);

  React.useEffect(() => {
    reset({
      status: publicationFilters.status,
    });
  }, [publicationFilters]);

  React.useEffect(() => {
    const subscription = watch(({ status }) => {
      setPublicationFilters({
        ...publicationFilters,

        status: status?.value,
      });
      setPagination({
        ...pagination,
        publicationCurrentPage: 1,
      });
    });

    return () => subscription.unsubscribe();
  }, [filterSet]);

  const handleSetFormValuesFromParams = (params: any): void => {
    setPublicationFilters({
      ...publicationFilters,
      status: window.sessionStorage.getItem("FILTER_SOFTWARE_TYPE") !== "false" && params.status ? params.status : "",
    });
    setPagination({
      ...pagination,
      publicationCurrentPage: params.publicationCurrentPage ? _.toNumber(params.publicationCurrentPage) : 1,
    });
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
  const queryClient = new QueryClient();
  const _usePublication = usePublication(queryClient);
  const getFilterOptions = _usePublication.getFilterOptions();

  const handleSetSelectFormValues = (params: any): void => {
    setValue("status", statusOptions?.find((option: any) => option.value === params?.status));
    setValue("themes", themesOptions?.find((option: any) => option.value === params?.themes));
    setValue("type", themesOptions?.find((option: any) => option.value === params?.type));
  };
  React.useEffect(() => {
    if (_.isEmpty(statusOptions)) return;

    handleSetSelectFormValues(parsedParamsFilters);
  }, [statusOptions]);
  React.useEffect(() => {
    if (_.isEmpty(themesOptions)) return;

    handleSetSelectFormValues(parsedParamsFilters);
  }, [themesOptions]);

  const getCount = (filterData: string, label: string) => {
    const result = getFilterOptions.data.facets[filterData].find((option: any) => {
      return option._id === label;
    });

    return result?.count ?? "0";
  };

  React.useEffect(() => {
    if (!getFilterOptions.isSuccess) return;

    // Status
    const statusWithData = getFilterOptions.data.facets["data.status"]?.map((status: any) => ({
      label: _.upperFirst(status._id ?? "unknown"),
      value: status._id,
    }));
    // Themes
    const themesWithData = getFilterOptions.data.facets["data.themes"]?.map((theme: any) => (
      {
      label: _.upperFirst(theme._id ?? "unknown"),
      value: theme._id,
    }));
    // Types (attachments.type)
    const typesWithData = getFilterOptions.data.facets["attachments.type"]?.map((type: any) => (
      {
      label: _.upperFirst(type._id ?? "unknown"),
      value: type._id,
    }));
    const uniqueStatusOptions: any[] = _.orderBy(_.uniqBy(statusWithData, "value"), "label", "asc");
    const uniqueThemesOptions: any[] = _.orderBy(_.uniqBy(themesWithData, "value"), "label", "asc");
    const uniqueTypesOptions: any[] = _.orderBy(_.uniqBy(typesWithData, "value"), "label", "asc");
    setStatusOptions(uniqueStatusOptions);
    setThemesOptions(uniqueThemesOptions);
    setTypesOptions(uniqueTypesOptions);
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
          {statusOptions?.length > 0 && (
            <FormField>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>
                      Status
                      <span className={styles.filterCountIndicator}> ({statusOptions?.length})</span>
                    </span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenStatus && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenStatus}
                transitionTime={100}
                onOpening={() => setIsopenStatus(true)}
                onClosing={() => setIsopenStatus(false)}
              >
                {statusOptions?.map((status: any) => (
                  <div className={styles.radioContainer} key={status.value} onClick={() => resetPaginationOnFilter()}>
                    <RadioButton
                      className={styles.radioButton}
                      value={status.value}
                      checked={publicationFilters.status === status.value}
                      onClick={() =>
                        setPublicationFilters({
                          ...publicationFilters,
                          status: status.value,
                        })
                      }
                    />
                    <span
                      className={styles.radioLabel}
                      onClick={() =>
                        setPublicationFilters({
                          ...publicationFilters,
                          status: status.value,
                        })
                      }
                    >
                      {t(status.label)} {`(${getCount("data.status", status.value)})`}
                    </span>
                  </div>
                ))}
              </Collapsible>
            </FormField>
          )}
          {themesOptions?.length > 0 && (
            <FormField>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>
                      Thema
                      <span className={styles.filterCountIndicator}> ({themesOptions?.length})</span>
                    </span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenStatus && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenStatus}
                transitionTime={100}
                onOpening={() => setIsopenStatus(true)}
                onClosing={() => setIsopenStatus(false)}
              >
                {themesOptions?.map((theme: any) => (
                  <div className={styles.radioContainer} key={theme.label} onClick={() => resetPaginationOnFilter()}>
                    <RadioButton
                      className={styles.radioButton}
                      value={theme.label}
                      checked={publicationFilters["data.themes"] === theme.label}
                      onClick={() =>
                        setPublicationFilters({
                          ...publicationFilters,
                          "data.themes": theme.label

                        })
                      }
                    />
                    <span
                      className={styles.radioLabel}
                      onClick={() =>
                        setPublicationFilters({
                          ...publicationFilters,
                          "data.themes": theme.label
                        })
                      }
                    >
                      {t(theme.label)} {`(${getCount("data.themes", theme.label)})`}
                    </span>
                  </div>
                ))}
              </Collapsible>
            </FormField>
          )}
          {typesOptions?.length > 0 && (
            <FormField>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>
                      Formaat
                      <span className={styles.filterCountIndicator}> ({typesOptions?.length})</span>
                    </span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenStatus && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenStatus}
                transitionTime={100}
                onOpening={() => setIsopenStatus(true)}
                onClosing={() => setIsopenStatus(false)}
              >
                {typesOptions?.map((type: any) => (
                  <div className={styles.radioContainer} key={type.label} onClick={() => resetPaginationOnFilter()}>
                    <RadioButton
                      className={styles.radioButton}
                      value={type.label}
                      checked={publicationFilters["attachments.type"] === type.label}
                      onClick={() =>
                        setPublicationFilters({
                          ...publicationFilters,
                          "attachments.type": type.label

                        })
                      }
                    />
                    <span
                      className={styles.radioLabel}
                      onClick={() =>
                        setPublicationFilters({
                          ...publicationFilters,
                          "attachments.type": type.label
                        })
                      }
                    >
                      {t(type.label)} {`(${getCount("attachments.type", type.label)})`}
                    </span>
                  </div>
                ))}
              </Collapsible>
            </FormField>
          )}
          </form>
        )}
        {getFilterOptions.isLoading && <Skeleton height="1000px" />}
      </Collapsible>
    </div>
  );
};
