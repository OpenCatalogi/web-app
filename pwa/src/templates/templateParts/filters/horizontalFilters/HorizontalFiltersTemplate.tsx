import * as React from "react";
import * as styles from "./HorizontalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { InputText, SelectMultiple } from "@conduction/components";
import _ from "lodash";

export const HorizontalFiltersTemplate: React.FC = () => {
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
      name: filters.name,
      layers: filters.layers?.map((t) => getSelectObjectFromValue(t)),
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(({ name, layers }) => {
      setFilters({ ...filters, name: name, layers: layers?.map((t: any) => t.value) });
    });

    return () => subscription.unsubscribe();
  });

  return (
    <form className={styles.form}>
      <FormField>
        <FormFieldInput>
          <FormFieldLabel>Search</FormFieldLabel>
          <InputText name="name" validation={{ required: true }} {...{ errors, register }} />
        </FormFieldInput>
      </FormField>

      <FormField>
        <FormFieldInput>
          <FormFieldLabel>Type</FormFieldLabel>
          <SelectMultiple name="layers" options={layers} {...{ errors, control, register }} />
        </FormFieldInput>
      </FormField>
    </form>
  );
};

const getSelectObjectFromValue = (value: string | undefined): any | undefined => {
  return layers.find((t) => t.value === value);
};

const layers = [
  { label: "Interactie", value: "interactie" },
  { label: "Proces", value: "proces" },
  { label: "Integratie", value: "integratie" },
  { label: "Services", value: "services" },
  { label: "Data", value: "data" },
];
