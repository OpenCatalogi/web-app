import * as React from "react";
import * as styles from "./SearchComponentTemplate.module.css";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FiltersContext, IFilters } from "../../../context/filters";
import { navigate } from "gatsby";
import { Button } from "@utrecht/component-library-react";
import { ButtonLink } from "../../../components";
import { FormField, Textbox, ButtonGroup } from "@utrecht/component-library-react/dist/css-module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";

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

        <ButtonLink to="/components" onClick={clearFilters}>
          <FontAwesomeIcon icon={faArrowRight} />
          {t("View all components")}
        </ButtonLink>
      </ButtonGroup>
    </form>
  );
};
