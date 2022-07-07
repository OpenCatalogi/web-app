import * as React from "react";
import * as styles from "./LandingTemplate.module.css";
import {
  Heading3,
  Heading2,
  FormField,
  FormFieldInput,
  FormFieldLabel,
  Button,
} from "@gemeente-denhaag/components-react";
import SpotAPI from "./../../assets/svgs/SpotAPI.svg";
import { useTranslation } from "react-i18next";
import { ImageAndDetailsCard, Container, InputText } from "@conduction/components";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../context/filters";
import { navigate } from "gatsby";
import { SearchIcon } from "@gemeente-denhaag/icons";

export const LandingTemplate: React.FC = () => {
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
    <Container>
      <div className={styles.heading}>
        <Heading2>{t("A central place for reuse of information technology within the government")}</Heading2>
        <span className={styles.subHeading}>Sed posuere consectetur est at lobortis.</span>
      </div>

      <Heading3 className={styles.subHeading}>
        {t("Here you will find components for all Common Ground layers")}
      </Heading3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField className={styles.form}>
          <FormFieldInput>
            <FormFieldLabel>{t("Search through all Open Catalogi components")}</FormFieldLabel>
            <InputText name="name" validation={{ required: true }} {...{ errors, register }} />
          </FormFieldInput>
          <div className={styles.button}>
            <Button type="submit" icon={<SearchIcon />}>
              {t("Search")}
            </Button>
          </div>
        </FormField>
      </form>

      <div className={styles.cardsContainer}>
        <ImageAndDetailsCard
          title={t("All Open Catalog components")}
          image={<img src={SpotAPI} />}
          introduction="Etiam porta sem malesuada magna mollis euismod. Curabitur blandit tempus porttitor."
          link={{
            label: t("View all components"),
            href: "/components",
          }}
        />
      </div>
    </Container>
  );
};
