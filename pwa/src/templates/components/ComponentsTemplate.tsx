import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { Button, FormField, FormFieldInput, FormFieldLabel, Heading2 } from "@gemeente-denhaag/components-react";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { InputText, Container, SelectMultiple } from "@conduction/components";
import { ComponentResultTemplate, TComponentResultsLayout } from "../componentResult/ComponentResultsTemplate";
import { FiltersContext } from "../../context/filters";
import { getFilteredComponents } from "../../services/getFilteredComponents";
import { useComponent } from "../../hooks/components";
import { QueryClient } from "react-query";

export const ComponentsTemplate: React.FC = () => {
  const [components, setComponents] = React.useState<any[]>([]);
  const [filters, setFilters] = React.useContext(FiltersContext);
  const [filteredComponents, setFilteredComponents] = React.useState<any[]>([]);
  const [display, setDisplay] = React.useState<TComponentResultsLayout>("table");

  const queryClient = new QueryClient();
  const _useComponent = useComponent(queryClient);
  const getComponents = _useComponent.getAll();

  React.useEffect(() => {
    if (!getComponents.isSuccess) return;

    setComponents(getComponents.data);

    setFilteredComponents(getFilteredComponents(getComponents.data, filters));
  }, [getComponents.isSuccess]);

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
