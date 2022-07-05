import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { FormField, FormFieldInput, FormFieldLabel, Heading2 } from "@gemeente-denhaag/components-react";
import { HamburgerIcon, HouseIcon } from "@gemeente-denhaag/icons";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { InputText, RichContentCard, Container, SelectMultiple } from "@conduction/components";
import { components as c } from "./../../testData/components";
import { FiltersContext } from "../../context/filters";

interface IFilters {
  name?: string;
  layers?: Array<string | undefined>;
}

export const ComponentsTemplate: React.FC = () => {
  const [components] = React.useState<any[]>(c);
  const [filters, setFilters] = React.useContext(FiltersContext);
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

const getFilteredComponents = (c: any[], f: IFilters): any[] => {
  let filteredComponents = c;

  if (f.name) {
    filteredComponents = filteredComponents.filter((c) => _.toLower(c.name).includes(_.toLower(f.name)));
  }

  if (f.layers?.length) {
    filteredComponents = filteredComponents.filter((c) => f.layers?.includes(c.layer));
  }

  return filteredComponents;
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
