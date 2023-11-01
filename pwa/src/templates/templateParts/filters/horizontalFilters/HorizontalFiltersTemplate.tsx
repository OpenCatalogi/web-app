import * as React from "react";
import { useForm } from "react-hook-form";
import { useFiltersContext } from "../../../../context/filters";
import { FormField, FormLabel, Textbox } from "@utrecht/component-library-react/dist/css-module";
import { usePaginationContext } from "../../../../context/pagination";

export const HorizontalFiltersTemplate: React.FC = () => {
  const { filters, setFilters } = useFiltersContext();
  const { pagination, setPagination } = usePaginationContext();
  const searchTimeout = React.useRef<NodeJS.Timeout | null>(null);

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

  const watchName = watch("name");

  React.useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setFilters({
        ...filters,
        _search: watchName === undefined ? "" : watchName, //This check is important for the react lifecycle
      }),
        setPagination({ ...pagination, componentsCurrentPage: 1 });
    }, 500);
  }, [watchName]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormField>
        <FormLabel htmlFor={"componentSearchFormInput"}>Zoek op naam</FormLabel>
        <Textbox id="componentSearchFormInput" {...register("name", { required: true })} invalid={errors["name"]} />
      </FormField>
    </form>
  );
};
