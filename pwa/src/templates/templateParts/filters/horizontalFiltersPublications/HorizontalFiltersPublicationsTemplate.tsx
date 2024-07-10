import * as React from "react";
import { useForm } from "react-hook-form";
import { usePublicationFiltersContext } from "../../../../context/publicationFilters";
import { FormField, FormLabel, Textbox } from "@utrecht/component-library-react/dist/css-module";
import { usePaginationContext } from "../../../../context/pagination";

export const HorizontalFiltersPublicationsTemplate: React.FC = () => {
  const { publicationFilters, setPublicationFilters } = usePublicationFiltersContext();
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
      name: publicationFilters._search,
    });
  }, [publicationFilters]);

  const watchName = watch("name");

  React.useEffect(() => {
    if (watchName === undefined || watchName === publicationFilters._search) return;

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      setPublicationFilters({
        ...publicationFilters,
        _search: watchName === undefined ? "" : watchName, //This check is important for the react lifecycle
      });

      setPagination({ ...pagination, publicationCurrentPage: 1 });
    }, 500);
  }, [watchName]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormField>
        <FormLabel htmlFor={"publicationSearchFormInput"}>Zoek op naam</FormLabel>
        <Textbox
          id="publicationSearchFormInput"
          defaultValue=""
          {...register("name", { required: true })}
          invalid={!!errors["name"]}
        />
      </FormField>
    </form>
  );
};
