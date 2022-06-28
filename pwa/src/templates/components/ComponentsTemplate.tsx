import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { FormField, FormFieldInput, FormFieldLabel, Heading2 } from "@gemeente-denhaag/components-react";
import { HamburgerIcon, HouseIcon } from "@gemeente-denhaag/icons";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { InputText, RichContentCard, Container, SelectMultiple } from "@conduction/components";

interface ComponentsTemplateProps {
  defaultTypeFilter?: string;
}

export const ComponentsTemplate: React.FC<ComponentsTemplateProps> = ({ defaultTypeFilter }) => {
  const [components, setComponents] = React.useState<any[]>([]);
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
    <Container>
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading2>Components</Heading2>
          <span>Donec id elit non mi porta gravida at eget metus.</span>
        </div>

        <form className={styles.form}>
          <FormField>
            <FormFieldInput>
              <FormFieldLabel>Filter op naam</FormFieldLabel>
              <InputText
                {...{ register, errors }}
                disabled={getComponents.isLoading}
                name="name"
                validation={{ required: true }}
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

        <div className={styles.componentsGrid}>
          {!getComponents.isLoading ? (
            filteredComponents.map((component) => (
              <RichContentCard
                key={component.id}
                link={{ label: component.name, href: `/components/${component.id}` }}
                labelsWithIcon={[
                  { label: _.upperFirst(component.intendedAudience), icon: <HamburgerIcon /> },
                  { label: "Conduction", icon: <HouseIcon /> },
                ]}
                tags={[component.developmentStatus, component.softwareType]}
                contentLinks={[
                  { title: "Repository", subTitle: "Bekijk de repository op GitHub", href: component.isBasedOn },
                ]}
              />
            ))
          ) : (
            <>
              <Skeleton height="250px" />
              <Skeleton height="250px" />
            </>
          )}

          {!filteredComponents.length && !getComponents.isLoading && t("No components found with active filters")}
        </div>
      </div>
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
