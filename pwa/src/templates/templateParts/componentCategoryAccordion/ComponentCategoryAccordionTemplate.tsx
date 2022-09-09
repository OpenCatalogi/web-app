import * as React from "react";
import * as styles from "./ComponentCategoryAccordionTemplate.module.css";
import { categories, TCategories } from "../../../data/categories";
import { LayerAccordion } from "../layerAccordion/LayerAccordionTemplate";
import { LayerAccordionFiltersTemplate } from "../layerAccordion/filters/LayerAccordionFiltersTemplate";
import { Button } from "@gemeente-denhaag/components-react";
import { FiltersContext } from "../../../context/filters";
import clsx from "clsx";
import { navigate } from "gatsby";
import _ from "lodash";

export const ComponentCategoryAccordionTemplate: React.FC = () => {
  const Accordion = LayerAccordion.accordion;
  const AccordionController = LayerAccordion.controller;

  const { open: openInteraction, setOpen: setOpenInteraction } = AccordionController();
  const { open: openProcess, setOpen: setOpenProcess } = AccordionController();
  const { open: openIntegration, setOpen: setOpenIntegration } = AccordionController();
  const { open: openServices, setOpen: setOpenServices } = AccordionController();
  const { open: openData, setOpen: setOpenData } = AccordionController();

  return (
    <>
      <LayerAccordionFiltersTemplate
        items={[
          { label: "Interactie", handleClick: setOpenInteraction, active: openInteraction },
          { label: "Proces", handleClick: setOpenProcess, active: openProcess },
          { label: "Integratie", handleClick: setOpenIntegration, active: openIntegration },
          { label: "Service", handleClick: setOpenServices, active: openServices },
          { label: "Data", handleClick: setOpenData, active: openData },
        ]}
      />

      <Accordion title="Interactie" open={openInteraction} setOpen={setOpenInteraction} color="#1a75ff">
        <Categories layer="Interactie" />
      </Accordion>

      <Accordion title="Proces" open={openProcess} setOpen={setOpenProcess} color="#dd3c49">
        <Categories layer="Proces" />
      </Accordion>

      <Accordion title="Integratie" open={openIntegration} setOpen={setOpenIntegration} color="#efc025">
        <Categories layer="Integratie" />
      </Accordion>

      <Accordion title="Services" open={openServices} setOpen={setOpenServices} color="#69b090">
        <Categories layer="Service" />
      </Accordion>

      <Accordion title="Data" open={openData} setOpen={setOpenData} color="#7a51c8">
        <Categories layer="Data" />
      </Accordion>
    </>
  );
};

interface CategoriesProps {
  layer: TCategories;
}

const Categories: React.FC<CategoriesProps> = ({ layer }) => {
  const [filters, setFilters] = React.useContext(FiltersContext);

  return (
    <div className={styles.items}>
      {categories[layer].map((category) => (
        <Button
          className={clsx(styles[_.camelCase(`${layer} category`)], styles.categoryButton)}
          variant="secondary-action"
          icon={category.icon}
          onClick={() => {
            setFilters({ ...filters, category: _.lowerCase(category?.value) });
            navigate("/components");
          }}
        >
          {category.title}
        </Button>
      ))}
    </div>
  );
};
