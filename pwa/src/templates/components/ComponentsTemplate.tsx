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

interface IFilters {
  name?: string;
  types?: Array<string | undefined>;
}

export const ComponentsTemplate: React.FC<ComponentsTemplateProps> = ({ defaultTypeFilter }) => {
  const [components] = React.useState<any[]>(c);
  const [filters, setFilters] = React.useState<IFilters>({ name: "" });
  const [filteredComponents, setFilteredComponents] = React.useState<any[]>([]);

  const {
    register,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (!defaultTypeFilter) return;

    setFilters({ ...filters, types: [defaultTypeFilter] });
  }, [defaultTypeFilter]);

  React.useEffect(() => {
    reset({ name: filters.name, types: filters.types?.map((t) => getTypeFromValue(t)) });

    setFilteredComponents(filterComponents(components, filters));
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(({ name, types }) => {
      setFilters({ name: name, types: types?.map((t: any) => t.value) });
    });

    return () => subscription.unsubscribe();
  });

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
              { label: _.upperFirst(component.layer), icon: <HamburgerIcon /> },
              { label: component.organisation, icon: <HouseIcon /> },
            ]}
            tags={[component.status, component.softwareType]}
            contentLinks={[
              { title: "Repository", subTitle: "Bekijk de repository op GitHub", href: "https://google.nl" },
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

const filterComponents = (c: any[], f: IFilters): any[] => {
  let filteredComponents = c;

  if (f.name) {
    filteredComponents = filteredComponents.filter((c) => _.toLower(c.name).includes(_.toLower(f.name)));
  }

  if (f.types?.length) {
    filteredComponents = filteredComponents.filter((c) => f.types?.includes(c.layer));
  }

  return filteredComponents;
};
