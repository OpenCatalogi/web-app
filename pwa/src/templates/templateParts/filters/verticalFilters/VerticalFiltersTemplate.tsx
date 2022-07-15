import * as React from "react";
import * as styles from "./VerticalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { SelectMultiple, SelectSingle } from "@conduction/components";
import _ from "lodash";
import clsx from "clsx";
import { Divider } from "@gemeente-denhaag/components-react";
import { upls, platforms, maintenanceTypes, softwareTypes, licenses } from "./../../../../data/filters";

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
      upl: filters.nl?.upl?.map((upl) => upls.find((u) => u.value === upl)),
      platforms: filters.platforms?.map((platform) => platforms.find((p) => p.value === platform)),
      softwareType: softwareTypes.find((sT) => sT.value === filters.softwareType),
      maintenanceType: maintenanceTypes.find((mT) => mT.value === filters.maintenance?.type),
      license: licenses.find((l) => l.value === filters.legal?.license),
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(({ upl, platforms, maintenanceType, softwareType, license }) => {
      setFilters({
        ...filters,
        platforms: platforms?.map((p: any) => p.value),
        softwareType: softwareType?.value,
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
