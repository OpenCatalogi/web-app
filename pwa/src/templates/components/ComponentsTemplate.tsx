import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { Button, FormField, FormFieldInput, FormFieldLabel, Heading2 } from "@gemeente-denhaag/components-react";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { InputText, Container, SelectMultiple } from "@conduction/components";
import { ComponentResultTemplate, TComponentResultsLayout } from "../componentResult/ComponentResultsTemplate";
import { components as c } from "./../../testData/components";
import { FiltersContext } from "../../context/filters";
import { getFilteredComponents } from "../../services/getFilteredComponents";

export const ComponentsTemplate: React.FC = () => {
  const [components] = React.useState<any[]>(c);
  const [filters, setFilters] = React.useContext(FiltersContext);

  const [display, setDisplay] = React.useState<TComponentResultsLayout>("table");

  const [filteredComponents, setFilteredComponents] = React.useState<any[]>([]);

  const {
    register,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    reset({ name: filters.name, layers: filters.layers?.map((t) => getSelectObjectFromValue(t)) });

    setFilteredComponents(getFilteredComponents(components, filters));
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(({ name, layers }) => {
      setFilters({ name: name, layers: layers?.map((t: any) => t.value) });
    });

    return () => subscription.unsubscribe();
  });

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <div>
          <Heading2>Components</Heading2>
          <span>Donec id elit non mi porta gravida at eget metus.</span>
        </div>
        <div className={styles.resultsDisplaySwitchButtons}>
          <Button
            variant={display === "table" ? "primary-action" : "secondary-action"}
            onClick={() => setDisplay("table")}
          >
            {t("Table")}
          </Button>
          <Button
            variant={display === "cards" ? "primary-action" : "secondary-action"}
            onClick={() => setDisplay("cards")}
          >
            {t("Cards")}
          </Button>
          <Button
            variant={display === "layer" ? "primary-action" : "secondary-action"}
            onClick={() => setDisplay("layer")}
          >
            {t("Layers")}
          </Button>
        </div>
      </div>

      <form className={styles.form}>
        <FormField>
          <FormFieldInput>
            <FormFieldLabel>Filter op naam</FormFieldLabel>
            <InputText name="name" validation={{ required: true }} {...{ errors, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>Filter op laag</FormFieldLabel>
            <SelectMultiple
              defaultValue={filters.layers?.map((f) => getSelectObjectFromValue(f))}
              name="layers"
              options={layers}
              {...{ errors, control, register }}
            />
          </FormFieldInput>
        </FormField>
      </form>

      {filteredComponents.length > 0 && <ComponentResultTemplate results={filteredComponents} type={display} />}

      {!filteredComponents.length && t("No components found with active filters")}
    </Container>
  );
};

const getSelectObjectFromValue = (value: string | undefined): any | undefined => {
  return layers.find((t) => t.value === value);
};

const layers = [
  { label: "Interactie", value: "interactie" },
  { label: "Proces", value: "proces" },
  { label: "Integratie", value: "integratie" },
  { label: "Services", value: "services" },
  { label: "Data", value: "data" },
];
