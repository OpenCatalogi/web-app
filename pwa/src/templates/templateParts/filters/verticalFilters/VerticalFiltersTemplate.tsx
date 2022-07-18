import * as React from "react";
import * as styles from "./VerticalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { SelectMultiple, SelectSingle } from "@conduction/components";
import _ from "lodash";
import clsx from "clsx";
import { Divider } from "@gemeente-denhaag/components-react";
import { upls, platforms, maintenanceTypes, softwareTypes, licenses, statuses } from "./../../../../data/filters";
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
      upl: getSelectedItemsFromFilters(upls, filters.nl?.upl),
      platforms: getSelectedItemsFromFilters(platforms, filters.platforms),
      softwareType: getSelectedItemFromFilters(softwareTypes, filters.softwareType),
      status: getSelectedItemFromFilters(statuses, filters.status),
      maintenanceType: getSelectedItemFromFilters(maintenanceTypes, filters.maintenance?.type),
      license: getSelectedItemFromFilters(licenses, filters.legal?.license),
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(({ upl, platforms, maintenanceType, status, softwareType, license }) => {
      setFilters({
        ...filters,
        platforms: platforms?.map((p: any) => p.value),
        softwareType: softwareType?.value,
        status: status?.value,
        maintenance: {
          type: maintenanceType?.value,
        },
        legal: {
          license: license?.value,
        },
        nl: {
          upl: upl?.map((u: any) => u.value),
        },
      });
    });

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
      </form>
    </div>
  );
};
