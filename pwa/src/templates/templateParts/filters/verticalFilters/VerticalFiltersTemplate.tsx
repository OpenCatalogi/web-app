import * as React from "react";
import * as styles from "./VerticalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { InputCheckbox, SelectMultiple, SelectSingle } from "@conduction/components";
import _ from "lodash";
import clsx from "clsx";
import { Divider } from "@gemeente-denhaag/components-react";
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
  organizations,
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
import { GatsbyContext } from "../../../../context/gatsby";
import { useOrganization } from "../../../../hooks/organization";
import { QueryClient } from "react-query";
import Skeleton from "react-loading-skeleton";

interface VerticalFiltersTemplateProps {
  filterSet: any[];
  layoutClassName?: string;
}

export const VerticalFiltersTemplate: React.FC<VerticalFiltersTemplateProps> = ({ filterSet, layoutClassName }) => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const [layersArray, setLayersArray] = React.useState<any[]>([]);
  const [platformsArray, setPlatformsArray] = React.useState<any[]>([]);
  const [statusRadioFilter, setStatusRadioFilter] = React.useState<string>("");
  const [maintenanceTypeRadioFilter, setMaintenanceTypeRadioFilter] = React.useState<string>("");
  const [softwareTypeRadioFilter, setSoftwareTypeRadioFilter] = React.useState<string>("");

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [isOpenLayer, setIsOpenLayer] = React.useState<boolean>(true);
  const [isOpenStatus, setIsOpenStatus] = React.useState<boolean>(true);
  const [isOpenMaintenanceType, setIsOpenMaintenanceType] = React.useState<boolean>(true);
  const [isOpenPlatforms, setIsOpenPlatforms] = React.useState<boolean>(true);
  const [isOpenSoftwareTypes, setIsOpenSoftwareTypes] = React.useState<boolean>(true);

  const { screenSize } = React.useContext(GatsbyContext);

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
    control,
    formState: { errors },
  } = useForm();

  const addToLayerArray = (value: { label: string; value: string }) => {
    !layersArray.some((item) => item.label === value.label) ? layersArray.push(value) : removeLayer(layersArray, value);

    function removeLayer(newLayerArray: any[], value: any) {
      const index = newLayerArray.findIndex((item) => item.label === value.label);
      if (index > -1) {
        newLayerArray.splice(index, 1);
        setLayersArray(newLayerArray);
      }
      return newLayerArray;
    }
    setLayerFilter();
  };

  const addToPlatformsArray = (value: { label: string; value: string }) => {
    !platformsArray.some((item) => item.label === value.label)
      ? platformsArray.push(value)
      : removePlatform(platformsArray, value);

    function removePlatform(newPlatformArray: any[], value: any) {
      const index = newPlatformArray.findIndex((item) => item.label === value.label);
      if (index > -1) {
        newPlatformArray.splice(index, 1);
        setPlatformsArray(newPlatformArray);
      }
      return newPlatformArray;
    }
    setPlatformFilter();
  };

  const setLayerFilter = () => {
    setFilters({
      ...filters,
      "nl.commonground.layerType": layersArray?.map((l: any) => l.value),
    });
  };

  const setPlatformFilter = () => {
    setFilters({
      ...filters,
      platforms: platformsArray?.map((l: any) => l.value),
    });
  };

  React.useEffect(() => {
    setFilters({
      ...filters,
      developmentStatus: statusRadioFilter,
    });
  }, [statusRadioFilter]);

  React.useEffect(() => {
    setFilters({
      ...filters,
      "maintenance.type": maintenanceTypeRadioFilter,
    });
  }, [maintenanceTypeRadioFilter]);

  React.useEffect(() => {
    setFilters({
      ...filters,
      softwareType: softwareTypeRadioFilter,
    });
  }, [softwareTypeRadioFilter]);

  React.useEffect(() => {
    reset({
      layerType: getSelectedItemsFromFilters(layers, filters["nl.commonground.layerType"]),
      upl: getSelectedItemsFromFilters(upls, filters["nl.upl"]),
      platforms: getSelectedItemsFromFilters(platforms, filters.platforms),
      category: getSelectedItemFromFilters(categories, filters.category),
      bedrijfsfuncties: getSelectedItemsFromFilters(bedrijfsfuncties, filters["nl.gemma.bedrijfsfuncties"]),
      bedrijfsservices: getSelectedItemsFromFilters(bedrijfsservices, filters["nl.gemma.bedrijfsservices"]),
      referentieComponenten: getSelectedItemsFromFilters(
        referentieComponenten,
        filters["nl.gemma.referentieComponenten"],
      ),
      applicatiefunctie: getSelectedItemFromFilters(applicatiefuncties, filters["nl.gemma.applicatiefunctie"]),
      softwareType: getSelectedItemFromFilters(softwareTypes, filters.softwareType),
      status: getSelectedItemFromFilters(statuses, filters.developmentStatus),
      maintenanceType: getSelectedItemFromFilters(maintenanceTypes, filters["maintenance.type"]),
      license: getSelectedItemFromFilters(licenses, filters["legal.license"]),
      organization: organizations && getSelectedItemFromFilters(organizations, filters["url.organisation.name"]),
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(
      ({
        upl,
        platforms,
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
          currentPage: 1,
          platforms: platforms?.map((p: any) => p.value),
          category: category?.value,
          "nl.gemma.bedrijfsfuncties": bedrijfsfuncties?.map((b: any) => b.value),
          "nl.gemma.bedrijfsservices": bedrijfsservices?.map((b: any) => b.value),
          "nl.gemma.referentieComponenten": referentieComponenten?.map((rC: any) => rC.value),
          "nl.gemma.applicatiefunctie": applicatiefunctie?.value,
          softwareType: softwareType?.value,
          developmentStatus: status?.value,
          "maintenance.type": maintenanceType?.value,
          "legal.license": license?.value,
          "url.organisation.name": organization?.value,
          "nl.upl": upl?.map((u: any) => u.value),
        });
      },
    );

    return () => subscription.unsubscribe();
  }, [filterSet]);

  //useEffects to uncheck checkboxes and radio

  React.useEffect(() => {
    const unsetLayerFilter = layers.filter(
      (layer) => filters["nl.commonground.layerType"] && !filters["nl.commonground.layerType"].includes(layer.value),
    );

    unsetLayerFilter.map((layer: any) => {
      var checkBox = document.getElementById(`checkbox${layer.label}`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked === true) {
        checkBox.click();
      }
    });
  }, [filters["nl.commonground.layerType"]]);

  React.useEffect(() => {
    const unsetPlatformFilter = platforms.filter(
      (platform) => filters.platforms && !filters.platforms.includes(platform.value),
    );

    unsetPlatformFilter.map((platform: any) => {
      var checkBox = document.getElementById(`checkbox${platform.label}`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked === true) {
        checkBox.click();
      }
    });
  }, [filters.platforms]);

  React.useEffect(() => {
    const unsetStatusFilter = statuses.filter((status) => filters.developmentStatus !== status.value);

    unsetStatusFilter.map((status: any) => {
      var checkBox = document.getElementById(`checkbox${status.label}`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked == true) {
        checkBox.checked = false;
      }
    });
  }, [filters.developmentStatus]);

  React.useEffect(() => {
    const unsetMaintenenceTypeFilter = maintenanceTypes.filter(
      (maintenenceType) => filters["maintenance.type"] !== maintenenceType.value,
    );

    unsetMaintenenceTypeFilter.map((MaintenenceType: any) => {
      var checkBox = document.getElementById(`checkbox${MaintenenceType.label}`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked == true) {
        checkBox.checked = false;
      }
    });
  }, [filters["maintenance.type"]]);

  React.useEffect(() => {
    const unsetSoftwareTypeFilter = softwareTypes.filter((softwareType) => filters.softwareType !== softwareType.value);

    unsetSoftwareTypeFilter.map((SoftwareType: any) => {
      var checkBox = document.getElementById(`checkbox${SoftwareType.label}`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked == true) {
        checkBox.checked = false;
      }
    });
  }, [filters.softwareType]);

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
        transitionTime={200}
        onOpening={() => setIsOpen(true)}
        onClosing={() => setIsOpen(false)}
      >
        <Divider className={styles.divider} />

        <form className={styles.form}>
          <FormField>
            <FormFieldInput>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>Laag ({layers.length}) </span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenLayer && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenLayer}
                transitionTime={200}
                onOpening={() => setIsOpenLayer(true)}
                onClosing={() => setIsOpenLayer(false)}
              >
                <div>
                  {layers.map((layer) => (
                    <div
                      className={styles.checkColor}
                      onChange={() => addToLayerArray({ label: layer.label, value: layer.value })}
                    >
                      <InputCheckbox label={layer.label} name={layer.label} {...{ errors, control, register }} />
                    </div>
                  ))}
                </div>
              </Collapsible>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.filterTitle}>UPL ({upls.length})</span>
              </FormFieldLabel>

              <div className={styles.selectBorder}>
                <SelectMultiple name="upl" options={upls} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.filterTitle}>Organisatie ({organizations.length ?? "-"})</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                {getOrganisations.isLoading && <Skeleton height="50px" />}

                {getOrganisations.isSuccess && (
                  <SelectSingle
                    isClearable
                    options={organizations}
                    name="organization"
                    {...{ errors, control, register }}
                  />
                )}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.filterTitle}>Categorie ({categories.length})</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectSingle isClearable name="category" options={categories} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>Platforms ({platforms.length}) </span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenPlatforms && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenPlatforms}
                transitionTime={200}
                onOpening={() => setIsOpenPlatforms(true)}
                onClosing={() => setIsOpenPlatforms(false)}
              >
                {platforms.map((platform) => (
                  <div
                    className={styles.checkColor}
                    onChange={() => addToPlatformsArray({ label: platform.label, value: platform.value })}
                  >
                    <InputCheckbox label={platform.label} name={platform.label} {...{ errors, control, register }} />
                  </div>
                ))}
              </Collapsible>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>Status ({statuses.length})</span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenStatus && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenStatus}
                transitionTime={200}
                onOpening={() => setIsOpenStatus(true)}
                onClosing={() => setIsOpenStatus(false)}
              >
                {statuses.map((status) => (
                  <div className={styles.checkColor} onChange={() => setStatusRadioFilter(status.value)}>
                    <input id={`checkbox${status.label}`} type="radio" value={status.value} name="status" />{" "}
                    {status.label}
                  </div>
                ))}
              </Collapsible>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>Onderhoudstypes ({maintenanceTypes.length})</span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenMaintenanceType && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenMaintenanceType}
                transitionTime={200}
                onOpening={() => setIsOpenMaintenanceType(true)}
                onClosing={() => setIsOpenMaintenanceType(false)}
              >
                {maintenanceTypes.map((maintenanceType) => (
                  <div
                    className={styles.checkColor}
                    onChange={() => setMaintenanceTypeRadioFilter(maintenanceType.value)}
                  >
                    <input
                      id={`checkbox${maintenanceType.label}`}
                      type="radio"
                      value={maintenanceType.value}
                      name="maintenanceType"
                    />
                    {maintenanceType.label}
                  </div>
                ))}
              </Collapsible>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.filterTitle}>Licentie ({licenses.length})</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectSingle isClearable name="license" options={licenses} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.filterTitle}>Bedrijfsfuncties ({bedrijfsfuncties.length})</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectMultiple name="bedrijfsfuncties" options={bedrijfsfuncties} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <Collapsible
                className={styles.collapsible}
                openedClassName={styles.collapsible}
                triggerClassName={styles.title}
                triggerOpenedClassName={styles.title}
                trigger={
                  <div className={styles.trigger}>
                    <span className={styles.filterTitle}>Softwaretypes ({softwareTypes.length})</span>
                    <FontAwesomeIcon
                      className={clsx(styles.toggleIcon, isOpenSoftwareTypes && styles.isOpen)}
                      icon={faChevronRight}
                    />
                  </div>
                }
                open={isOpenSoftwareTypes}
                transitionTime={200}
                onOpening={() => setIsOpenSoftwareTypes(true)}
                onClosing={() => setIsOpenSoftwareTypes(false)}
              >
                {softwareTypes.map((softwareType) => (
                  <div className={styles.checkColor} onChange={() => setSoftwareTypeRadioFilter(softwareType.value)}>
                    <input
                      id={`checkbox${softwareType.label}`}
                      type="radio"
                      value={softwareType.value}
                      name="softwareTypes"
                    />{" "}
                    {softwareType.label}
                  </div>
                ))}
              </Collapsible>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.filterTitle}>Bedrijfsservices ({bedrijfsservices.length})</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectMultiple name="bedrijfsservices" options={bedrijfsservices} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.filterTitle}>Referentie componenten ({referentieComponenten.length})</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectMultiple
                  name="referentieComponenten"
                  options={referentieComponenten}
                  {...{ errors, control, register }}
                />
              </div>
            </FormFieldInput>
          </FormField>
        </form>
      </Collapsible>
    </div>
  );
};
