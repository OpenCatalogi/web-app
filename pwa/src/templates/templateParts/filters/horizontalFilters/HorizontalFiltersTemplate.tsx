import * as React from "react";
import * as styles from "./HorizontalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { InputText } from "@conduction/components";
import _ from "lodash";

export const HorizontalFiltersTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);

  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    reset({
      name: filters.search,
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(({ name }) => {
      setFilters({
        ...filters,
        currentPage: 1,
        search: name,
      });
    });

    return () => subscription.unsubscribe();
  });

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormField className={styles.container}>
        <FormFieldInput className={styles.content}>
          <FormFieldLabel>Zoek op naam</FormFieldLabel>
          <InputText name="name" validation={{ required: true }} {...{ errors, register }} />
        </FormFieldInput>
      </FormField>
    </form>
  );
};
