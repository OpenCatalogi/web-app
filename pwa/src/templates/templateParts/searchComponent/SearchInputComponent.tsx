import * as React from "react";
import * as styles from "./SearchInputComponent.module.css";
import { FormField, FormFieldInput, Button, TextField } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../context/filters";
import { navigate } from "gatsby";
import { SearchIcon } from "@gemeente-denhaag/icons";

export const SearchInputComponent: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any): void => {
    setFilters({ name: data.name });
    navigate("/components");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormField>
        <FormFieldInput>
          <TextField name="name" {...{ errors, register }} placeholder={t("Search all components")} />
        </FormFieldInput>
      </FormField>

      <Button type="submit" icon={<SearchIcon />}>
        {t("Search")}
      </Button>
    </form>
  );
};
