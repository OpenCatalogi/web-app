import * as React from "react";
import * as styles from "./HorizontalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../context/filters";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { InputText, SelectMultiple, SelectSingle } from "@conduction/components";
import { upl } from "../../../data/upl";
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
      upl: upl.find((upl) => upl.value === filters.upl),
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(({ name, layers, upl }) => {
      setFilters({ ...filters, name: name, layers: layers?.map((t: any) => t.value), upl: upl?.value });
    });

    return () => subscription.unsubscribe();
  });

  return (
    <form className={styles.formFilter}>
      <span className={styles.title}>Filters</span>
      <FormField>
        <FormFieldInput>
          <FormFieldLabel className={styles.filterLabel}>Status</FormFieldLabel>
          <SelectMultiple name="status" options={layers} {...{ errors, control, register }} />
        </FormFieldInput>
      </FormField>

      <FormField>
        <FormFieldInput>
          <FormFieldLabel className={styles.filterLabel}>Organisatie</FormFieldLabel>
          <SelectMultiple name="layers" options={layers} {...{ errors, control, register }} />
        </FormFieldInput>
      </FormField>

      <FormField>
        <FormFieldInput>
          <FormFieldLabel className={styles.filterLabel}>UPL</FormFieldLabel>
          <SelectSingle name="upl" options={upl} {...{ errors, control, register }} />
        </FormFieldInput>
      </FormField>

      <FormField>
        <FormFieldInput>
          <FormFieldLabel className={styles.filterLabel}>Laag</FormFieldLabel>
          <SelectSingle name="layers" options={layers} {...{ errors, control, register }} />
        </FormFieldInput>
      </FormField>

      <FormField>
        <FormFieldInput>
          <FormFieldLabel className={styles.filterLabel}>Gemma</FormFieldLabel>
          <SelectSingle name="gemma" options={layers} {...{ errors, control, register }} />
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
