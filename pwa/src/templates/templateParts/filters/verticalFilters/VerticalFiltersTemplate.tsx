import * as React from "react";
import * as styles from "./VerticalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { SelectSingle } from "@conduction/components";
import { upl } from "../../../../data/filters/upl";
import _ from "lodash";
import clsx from "clsx";
import { Divider } from "@gemeente-denhaag/components-react";
import { platforms } from "../../../../data/filters/platform";
import { maintenanceTypes } from "../../../../data/filters/maintenanceType";
import { softwareTypes } from "../../../../data/filters/softwareType";

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
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(({ upl, platform, maintenanceType, softwareType }) => {
      setFilters({
        ...filters,
        upl: upl?.value,
        platform: platform?.value,
        maintenanceType: maintenanceType?.value,
        softwareType: softwareType?.value,
      });
    });

    return () => subscription.unsubscribe();
  });

  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <span className={styles.title}>Filters</span>

      <Divider />

      <form>
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
      </form>
    </div>
  );
};
