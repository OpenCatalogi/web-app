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
} from "./../../../../data/filters";
import {
  getSelectedItemFromFilters,
  getSelectedItemsFromFilters,
} from "../../../../services/getSelectedItemsFromFilters";

interface VerticalFiltersTemplateProps {
  layoutClassName?: string;
}

export const VerticalFiltersTemplate: React.FC<VerticalFiltersTemplateProps> = ({ layoutClassName }) => {
  const [filters, setFilters] = React.useContext(FiltersContext);

  const {
    register,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    reset({
      upl: getSelectedItemsFromFilters(upls, filters["nl.upl"]),
      platforms: getSelectedItemsFromFilters(platforms, filters.platforms),
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
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(
      ({
        upl,
        platforms,
        maintenanceType,
        status,
        softwareType,
        license,
        bedrijfsservices,
        bedrijfsfuncties,
        referentieComponenten,
        applicatiefunctie,
      }) => {
        setFilters({
          ...filters,
          currentPage: 1,
          platforms: platforms?.map((p: any) => p.value),
          "nl.gemma.bedrijfsfuncties": bedrijfsfuncties?.map((b: any) => b.value),
          "nl.gemma.bedrijfsservices": bedrijfsservices?.map((b: any) => b.value),
          "nl.gemma.referentieComponenten": referentieComponenten?.map((rC: any) => rC.value),
          "nl.gemma.applicatiefunctie": applicatiefunctie?.value,
          softwareType: softwareType?.value,
          developmentStatus: status?.value,
          "maintenance.type": maintenanceType?.value,
          "legal.license": license?.value,
          "nl.upl": upl?.map((u: any) => u.value),
        });
      },
    );

    return () => subscription.unsubscribe();
  });

  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <span className={styles.title}>Filters</span>

      <Divider />

      <form className={styles.form}>
        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>UPL</span>
            </FormFieldLabel>
            <SelectMultiple name="upl" options={upls} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Platforms</span>
            </FormFieldLabel>
            <SelectMultiple name="platforms" options={platforms} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Status</span>
            </FormFieldLabel>
            <SelectSingle name="status" options={statuses} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Onderhoudstypes</span>
            </FormFieldLabel>
            <SelectSingle name="maintenanceType" options={maintenanceTypes} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Softwaretypes</span>
            </FormFieldLabel>
            <SelectSingle name="softwareType" options={softwareTypes} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Licentie</span>
            </FormFieldLabel>
            <SelectSingle name="license" options={licenses} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Bedrijfsfuncties</span>
            </FormFieldLabel>
            <SelectMultiple name="bedrijfsfuncties" options={bedrijfsfuncties} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Bedrijfsservices</span>
            </FormFieldLabel>
            <SelectMultiple name="bedrijfsservices" options={bedrijfsservices} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Referentie componenten</span>
            </FormFieldLabel>
            <SelectMultiple
              name="referentieComponenten"
              options={referentieComponenten}
              {...{ errors, control, register }}
            />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Applicatiefunctie</span>
            </FormFieldLabel>
            <SelectSingle name="applicatiefunctie" options={applicatiefuncties} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>
      </form>
    </div>
  );
};
