import * as React from "react";
import * as styles from "./SearchComponentTemplate.module.css";
import { FormField, FormFieldInput, Button } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../context/filters";
import { navigate } from "gatsby";
import { ArrowRightIcon, SearchIcon } from "@gemeente-denhaag/icons";
import { InputText } from "@conduction/components";

export const SearchComponentTemplate: React.FC = () => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField className={styles.searchFormComponent}>
        <FormFieldInput>
          <InputText name="name" {...{ errors, register }} placeholder={t("Search all components")} icon={<SearchIcon />} />
        </FormFieldInput>
      </FormField>
      <div className={styles.buttons}>
        <Button type="submit" icon={<SearchIcon />}>
          {t("Search")}
        </Button>
        <Button
          className={styles.submit}
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
