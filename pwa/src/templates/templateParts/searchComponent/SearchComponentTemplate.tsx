import * as React from "react";
import * as styles from "./SearchComponentTemplate.module.css";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { IFiltersContext, useFiltersContext } from "../../../context/filters";
import { navigate } from "gatsby";
import { FormField, Textbox, ButtonGroup, Button } from "@utrecht/component-library-react/dist/css-module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { usePaginationContext } from "../../../context/pagination";

interface SearchComponentTemplateProps {
  layoutClassName?: string;
}

export const SearchComponentTemplate: React.FC<SearchComponentTemplateProps> = ({ layoutClassName }) => {
  const { filters, setFilters } = useFiltersContext();
  const { pagination, setPagination } = usePaginationContext();
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
    } as IFiltersContext);
    setPagination({
      ...pagination,
      componentsCurrentPage: pagination.componentsCurrentPage,
      applicationCurrentPage: pagination.applicationCurrentPage,
    });

    navigate("/components");
  };

  const clearFilters = () => {
    setFilters({
      resultDisplayLayout: filters.resultDisplayLayout,
      dependenciesDisplayLayout: filters.dependenciesDisplayLayout,
      landingDisplayLayout: filters.landingDisplayLayout,
    } as IFiltersContext);
    setPagination({
      ...pagination,
      componentsCurrentPage: pagination.componentsCurrentPage,
      applicationCurrentPage: pagination.applicationCurrentPage,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={layoutClassName}>
      <FormField>
        <Textbox
          id="searchComponentFormTextBox"
          {...register("name")}
          invalid={errors["name"]}
          placeholder={t("Search all components")}
        />
      </FormField>
      <ButtonGroup className={styles.buttons}>
        <Button type="submit" appearance="primary-action-button">
          <FontAwesomeIcon icon={faSearch} />

          {t("Search")}
        </Button>

        <Button
          onClick={() => {
            navigate("/components"), clearFilters();
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
          {t("View all components")}
        </Button>
      </ButtonGroup>
    </form>
  );
};
