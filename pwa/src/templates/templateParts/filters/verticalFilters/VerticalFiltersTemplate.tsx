import * as React from "react";
import * as styles from "./VerticalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import { FormFieldInput } from "@gemeente-denhaag/form-field";
import { InputCheckbox, SelectMultiple, SelectSingle } from "@conduction/components";
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
import { FormField, FormLabel, RadioButton } from "@utrecht/component-library-react";

interface VerticalFiltersTemplateProps {
  filterSet: any[];
  layoutClassName?: string;
}

export const VerticalFiltersTemplate: React.FC<VerticalFiltersTemplateProps> = ({ filterSet, layoutClassName }) => {
  const [filters, setFilters] = React.useContext(FiltersContext);
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
      "embedded.maintenance.type": maintenanceTypeRadioFilter,
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
    const unsetPlatformFilter = platforms.filter(
      (platform) => filters.platforms && !filters.platforms.includes(platform.value),
    );

    unsetPlatformFilter.map((platform: any) => {
      const checkBox = document.getElementById(`checkbox${platform.label}`) as HTMLInputElement | null;
      if (checkBox && checkBox.checked === true) {
        checkBox.click();
      }
    });
  }, [filters.platforms]);

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

  React.useEffect(() => {
    if (filters.softwareType === softwareTypeRadioFilter) return;
    if (filters.softwareType === undefined) {
      setSoftwareTypeRadioFilter("");
    }
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
        transitionTime={100}
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
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormLabel htmlFor={"sortFormULP"}>
                <span className={styles.filterTitle}>
                  UPL <span className={styles.filterCountIndicator}>({upls.length})</span>
                </span>
              </FormLabel>

              <div className={styles.selectBorder}>
                <SelectMultiple id="sortFormULP" name="upl" options={upls} {...{ errors, control, register }} />
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
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
                    {...{ errors, control, register }}
                  />
                )}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
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
                  {...{ errors, control, register }}
                />
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
                  <div
                    onChange={() => addToPlatformsArray({ label: platform.label, value: platform.value })}
                    key={platform.value}
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
                    key={status.value}
                  >
                    <RadioButton
                      value={status.value}
                      checked={filters.developmentStatus === status.value}
                    />
                    <span className={styles.radioLabel} onClick={() => setStatusRadioFilter(status.value)}>
                      {status.label}
                    </span>
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
                    key={maintenanceType.value}
                  >
                    <RadioButton
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
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
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
                  {...{ errors, control, register }}
                />
              </div>
            </FormFieldInput>
          </FormField>

          <FormField id="sortFormCompanyFunction">
            <FormFieldInput>
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
                  {...{ errors, control, register }}
                />
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
                    <span className={styles.filterTitle}>
                      Softwaretypes <span className={styles.filterCountIndicator}>({softwareTypes.length})</span>
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
                    onChange={() => setSoftwareTypeRadioFilter(softwareType.value)}
                    key={softwareType.value}
                  >
                    <RadioButton
                      value={softwareType.value}
                      checked={filters.softwareType === softwareType.value}
                    />
                    <span className={styles.radioLabel} onClick={() => setSoftwareTypeRadioFilter(softwareType.value)}>
                      {softwareType.label}
                    </span>
                  </div>
                ))}
              </Collapsible>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
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
                  {...{ errors, control, register }}
                />
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
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
