import * as React from "react";
import * as styles from "./SearchComponentTemplate.module.css";
import { FormField, FormFieldInput, Button } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../context/filters";
import { navigate } from "gatsby";
import { ArrowRightIcon, SearchIcon } from "@gemeente-denhaag/icons";
import { InputText } from "@conduction/components";

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
    setFilters({ ...filters, search: data.name });
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
        <Button className={styles.button} type="submit" icon={<SearchIcon />}>
          {t("Search")}
        </Button>
        <Button
          className={styles.button}
          icon={<ArrowRightIcon />}
          iconAlign="start"
          onClick={() => navigate("/components")}
          variant="secondary-action"
        >
          {t("View all components")}
        </Button>
      </div>
    </form>
  );
};
