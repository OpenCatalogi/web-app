import * as React from "react";
import * as styles from "./VerticalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { SelectSingle } from "@conduction/components";
import { upl } from "../../../../data/upl";
import _ from "lodash";
import clsx from "clsx";
import { Divider } from "@gemeente-denhaag/components-react";

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
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(({ upl }) => {
      setFilters({ ...filters, upl: upl?.value });
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
      </form>
    </div>
  );
};
