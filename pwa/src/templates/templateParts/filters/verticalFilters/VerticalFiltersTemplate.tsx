import * as React from "react";
import * as styles from "./VerticalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { SelectMultiple, SelectSingle } from "@conduction/components";
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
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { screenSize } = React.useContext(GatsbyContext);

  const queryClient = new QueryClient();
  const _useOrganisation = useOrganization(queryClient);
  const getOrganisations = _useOrganisation.filtersGetAll();

  React.useEffect(() => setIsOpen(screenSize === "desktop"), [screenSize]);

  const {
    register,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

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
      organization: getSelectedItemFromFilters(organizations, filters["url.organisation.name"]),
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(
      ({
        layerType,
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
          "nl.commonground.layerType": layerType?.map((l: any) => l.value),
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
              <FormFieldLabel>
                <span className={styles.label}>Laag</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <div className={styles.selectBorder}>
                  <SelectMultiple name="layerType" options={layers} {...{ errors, control, register }} />{" "}
                </div>
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.label}>UPL</span>
              </FormFieldLabel>

              <div className={styles.selectBorder}>
                <SelectMultiple name="upl" options={upls} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.label}>Organisatie</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                {getOrganisations.isLoading && <Skeleton height="50px" />}

                {getOrganisations.isSuccess && (
                  <SelectSingle
                    options={getOrganisations.data?.results?.map((organisation: any) => ({
                      label: organisation.name,
                      value: organisation.name,
                    }))}
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
                <span className={styles.label}>Categorie</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectSingle isClearable name="category" options={categories} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.label}>Platforms</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectMultiple name="platforms" options={platforms} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.label}>Status</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectSingle isClearable name="status" options={statuses} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.label}>Onderhoudstypes</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectSingle
                  isClearable
                  name="maintenanceType"
                  options={maintenanceTypes}
                  {...{ errors, control, register }}
                />
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.label}>Softwaretypes</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectSingle
                  isClearable
                  name="softwareType"
                  options={softwareTypes}
                  {...{ errors, control, register }}
                />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.label}>Licentie</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectSingle isClearable name="license" options={licenses} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.label}>Bedrijfsfuncties</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectMultiple name="bedrijfsfuncties" options={bedrijfsfuncties} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.label}>Bedrijfsservices</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectMultiple name="bedrijfsservices" options={bedrijfsservices} {...{ errors, control, register }} />{" "}
              </div>
            </FormFieldInput>
          </FormField>

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.label}>Referentie componenten</span>
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

          <FormField>
            <FormFieldInput>
              <FormFieldLabel>
                <span className={styles.label}>Applicatiefunctie</span>
              </FormFieldLabel>
              <div className={styles.selectBorder}>
                <SelectSingle
                  isClearable
                  name="applicatiefunctie"
                  options={applicatiefuncties}
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
