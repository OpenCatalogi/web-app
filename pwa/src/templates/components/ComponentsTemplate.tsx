import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { Button, FormField, FormFieldInput, FormFieldLabel, Heading2 } from "@gemeente-denhaag/components-react";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { InputText, Container, SelectMultiple } from "@conduction/components";
import { ComponentResultTemplate, TComponentResultsLayout } from "../componentResult/ComponentResultsTemplate";

interface ComponentsTemplateProps {
  defaultTypeFilter?: string;
}

export const ComponentsTemplate: React.FC<ComponentsTemplateProps> = ({ defaultTypeFilter }) => {
  const [components, setComponents] = React.useState<any[]>([]);
  const [display, setDisplay] = React.useState<TComponentResultsLayout>("table");
  const [filteredComponents, setFilteredComponents] = React.useState<any[]>([]);

  const _useComponent = useComponent();
  const getComponents = _useComponent.getAll();

  const {
    register,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (!getComponents.isSuccess) return;

    setComponents(getComponents.data);
    setFilteredComponents(getComponents.data);
  }, [getComponents.isSuccess]);

  React.useEffect(() => {
    reset({ name: "", types: getTypeFromValue(defaultTypeFilter) });
  }, [defaultTypeFilter, getComponents.isSuccess]);

  React.useEffect(() => {
    defaultTypeFilter && filterComponents("", [getTypeFromValue(defaultTypeFilter)]);
  }, [defaultTypeFilter, components]);

  React.useEffect(() => {
    const subscription = watch(({ name, types }) => filterComponents(name, types));

    return () => subscription.unsubscribe();
  });

  const filterComponents = (name: string, types: any): void => {
    let _types: string[] = [];

    if (Array.isArray(types)) {
      _types = types.map((type: any) => type.value);
    } else {
      _types.push(types.value);
    }

    let filteredComponents = components;

    if (name) {
      filteredComponents = filteredComponents.filter((component) =>
        _.toLower(component.name).includes(_.toLower(name)),
      );
    }

    if (_types?.length) {
      filteredComponents = filteredComponents.filter((component) => _types.includes(component.intendedAudience));
    }

    setFilteredComponents(filteredComponents);
  };

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
            <InputText
              disabled={getComponents.isLoading}
              name="name"
              validation={{ required: true }}
              {...{ errors, register }}
            />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>Filter op type</FormFieldLabel>
            <SelectMultiple
              defaultValue={getTypeFromValue(defaultTypeFilter)}
              name="types"
              options={types}
              disabled={getComponents.isLoading}
              {...{ errors, control, register }}
            />
          </FormFieldInput>
        </FormField>
      </form>

      {!getComponents.isLoading && filteredComponents.length > 0 && (
        <ComponentResultTemplate results={filteredComponents} type={display} />
      )}
      {getComponents.isLoading && <Skeleton height="250px" />}

      {!filteredComponents.length && !getComponents.isLoading && t("No components found with active filters")}
    </Container>
  );
};

const types = [
  { label: "Interactie", value: "interactie" },
  { label: "Proces", value: "proces" },
  { label: "Integratie", value: "integratie" },
  { label: "Services", value: "services" },
  { label: "Data", value: "data" },
];

const getTypeFromValue = (typeValue: string | undefined): any | undefined => {
  return types.find((t) => t.value === typeValue);
};
