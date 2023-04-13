import * as React from "react";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import { FormFieldInput } from "@gemeente-denhaag/form-field";
import { FormField, FormLabel, Textbox } from "@utrecht/component-library-react/dist/css-module";

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
      name: filters._search,
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(({ name }) => {
      setFilters({
        ...filters,
        currentPage: 1,
        _search: name,
      });
    });

    return () => subscription.unsubscribe();
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormField>
        <FormFieldInput>
          <FormLabel htmlFor={"componentSearchFormInput"}>Zoek op naam</FormLabel>
          <Textbox id="componentSearchFormInput" {...register("name", { required: true })} invalid={errors["name"]} />
        </FormFieldInput>
      </FormField>
    </form>
  );
};
