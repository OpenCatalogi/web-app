import * as React from "react";
import { useForm } from "react-hook-form";
import { useFiltersContext } from "../../../../context/filters";
import { FormField, FormLabel, Textbox } from "@utrecht/component-library-react/dist/css-module";

export const OrganizationSearchFiltersTemplate: React.FC = () => {
  const { filters, setFilters } = useFiltersContext();
  const searchTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  React.useEffect(() => {
    reset({
      name: filters.organizationSearch,
    });
  }, [filters]);

  const watchName = watch("name");

  React.useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(
      () =>
        setFilters({
          ...filters,
          organizationSearch: watchName === undefined ? "" : watchName, //This check is important for the react lifecycle
        }),
      500,
    );
  }, [watchName]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormField>
        <FormLabel htmlFor={"OrganizationSearchFormInput"}>Zoek op naam</FormLabel>
        <Textbox id="OrganizationSearchFormInput" {...register("name", { required: true })} invalid={errors["name"]} />
      </FormField>
    </form>
  );
};
