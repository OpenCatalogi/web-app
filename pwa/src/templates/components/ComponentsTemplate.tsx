import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { FormField, FormFieldInput, FormFieldLabel, Heading2 } from "@gemeente-denhaag/components-react";
import { HamburgerIcon, HouseIcon } from "@gemeente-denhaag/icons";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { InputText, RichContentCard, Container, SelectMultiple } from "@conduction/components";
import { components as c } from "./../../testData/components";

interface ComponentsTemplateProps {
  defaultTypeFilter?: string;
}

export const ComponentsTemplate: React.FC<ComponentsTemplateProps> = ({ defaultTypeFilter }) => {
  const [components, setComponents] = React.useState<any[]>(c);
  const [filteredComponents, setFilteredComponents] = React.useState<any[]>([]);

  const {
    register,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    reset({ name: "", types: getTypeFromValue(defaultTypeFilter) });
  }, [defaultTypeFilter]);

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
        <Heading2>Components</Heading2>
        <span>Donec id elit non mi porta gravida at eget metus.</span>
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
            <FormFieldLabel>Filter op type</FormFieldLabel>
            <SelectMultiple
              defaultValue={getTypeFromValue(defaultTypeFilter)}
              name="types"
              options={types}
              {...{ errors, control, register }}
            />
          </FormFieldInput>
        </FormField>
      </form>

      <div className={styles.componentsGrid}>
        {filteredComponents.map((component) => (
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
        ))}

        {!filteredComponents.length && t("No components found with active filters")}
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
