import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { Container } from "../../components/container/Container";
import { FormField, FormFieldInput, FormFieldLabel, Heading2 } from "@gemeente-denhaag/components-react";
import { useForm } from "react-hook-form";
import { InputText, SelectMultiple } from "../../components/formFields";
import { SearchIcon } from "@gemeente-denhaag/icons";
import { ISelectValue } from "../../components/formFields/select/select";
import { components as _components } from "../../testData/components";
import { RichContentCard } from "../../components/card";
import { HamburgerIcon, HouseIcon } from "@gemeente-denhaag/icons";

interface ComponentsTemplateProps {
  defaultTypeFilter?: string;
}

export const ComponentsTemplate: React.FC<ComponentsTemplateProps> = ({ defaultTypeFilter }) => {
  const [components] = React.useState<any[]>(_components);
  const [filteredComponents, setFilteredComponents] = React.useState<any[]>(_components);

  const {
    register,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    reset({ name: "", types: getTypeFromValue(defaultTypeFilter) });

    filterComponents("", [getTypeFromValue(defaultTypeFilter)]);
  }, [defaultTypeFilter]);

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
      filteredComponents = filteredComponents.filter((component) => _types.includes(component.layerType));
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
            <InputText {...{ register, errors }} name="name" icon={<SearchIcon />} validation={{ required: true }} />
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
            link={{ label: component.name, href: `/components/${component.id}` }}
            labelsWithIcon={[
              { label: _.upperFirst(component.layerType), icon: <HamburgerIcon /> },
              { label: _.upperFirst(component.organisationName), icon: <HouseIcon /> },
            ]}
            tags={[component.status, component.reuseType]}
            contentLinks={[
              { title: "Repository", subTitle: "Bekijk de repository op GitHub", href: component.repositoryUrl },
            ]}
          />
        ))}
      </div>
    </Container>
  );
};

const types: ISelectValue[] = [
  { label: "Interactie", value: "interactie" },
  { label: "Proces", value: "proces" },
  { label: "Integratie", value: "integratie" },
  { label: "Services", value: "services" },
  { label: "Data", value: "data" },
];

const getTypeFromValue = (typeValue: string | undefined): ISelectValue | undefined => {
  return types.find((t) => t.value === typeValue);
};
