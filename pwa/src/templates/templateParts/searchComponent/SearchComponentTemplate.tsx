import * as React from "react";
import * as styles from "./SearchComponentTemplate.module.css";
import {  FormFieldInput, Button } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FiltersContext, IFilters } from "../../../context/filters";
import { navigate } from "gatsby";
import { ArrowRightIcon, SearchIcon } from "@gemeente-denhaag/icons";
import { InputText } from "@conduction/components";
import { FormField } from "@utrecht/component-library-react/dist/css-module";

interface SearchComponentTemplateProps {
  layoutClassName?: string;
}

export const SearchComponentTemplate: React.FC<SearchComponentTemplateProps> = ({ layoutClassName }) => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any): void => {
    setFilters({
      _search: data.name,
      resultDisplayLayout: filters.resultDisplayLayout,
      dependenciesDisplayLayout: filters.dependenciesDisplayLayout,
      landingDisplayLayout: filters.landingDisplayLayout,
      currentPage: filters.currentPage,
      applicationsCurrentPage: filters.applicationsCurrentPage,
    } as IFilters);

    navigate("/components");
  };

  const clearFilters = () => {
    setFilters({
      resultDisplayLayout: filters.resultDisplayLayout,
      dependenciesDisplayLayout: filters.dependenciesDisplayLayout,
      landingDisplayLayout: filters.landingDisplayLayout,
      currentPage: filters.currentPage,
      applicationsCurrentPage: filters.applicationsCurrentPage,
    } as IFilters);
    navigate("/components");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={layoutClassName}>
      <FormField>
        <FormFieldInput>
          <InputText
            name="name"
            {...{ errors, register }}
            placeholder={t("Search all components")}
            icon={<SearchIcon />}
          />
        </FormFieldInput>
      </FormField>
      <div className={styles.buttons}>
        <Button type="submit" icon={<SearchIcon />} variant="secondary-action">
          {t("Search")}
        </Button>
        <Button icon={<ArrowRightIcon />} iconAlign="start" onClick={clearFilters} variant="secondary-action">
          {t("View all components")}
        </Button>
      </div>
    </form>
  );
};
