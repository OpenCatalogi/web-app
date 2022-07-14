import * as React from "react";
import * as styles from "./VerticalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { SelectSingle } from "@conduction/components";
import _ from "lodash";
import clsx from "clsx";
import { Divider } from "@gemeente-denhaag/components-react";
import { upl, platforms, maintenanceTypes, softwareTypes, licenses } from "./../../../../data/filters";

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
      upl: upl.find((upl) => upl.value === filters.upl),
      platform: platforms.find((p) => p.value === filters.platform),
      maintenanceType: maintenanceTypes.find((mT) => mT.value === filters.maintenanceType),
      softwareType: softwareTypes.find((sT) => sT.value === filters.softwareType),
      license: licenses.find((l) => l.value === filters.license),
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(({ upl, platform, maintenanceType, softwareType, license }) => {
      setFilters({
        ...filters,
        upl: upl?.value,
        platform: platform?.value,
        maintenanceType: maintenanceType?.value,
        softwareType: softwareType?.value,
        license: license?.value,
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
            <SelectSingle name="upl" options={upl} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Platform</span>
            </FormFieldLabel>
            <SelectSingle name="platform" options={platforms} {...{ errors, control, register }} />
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
