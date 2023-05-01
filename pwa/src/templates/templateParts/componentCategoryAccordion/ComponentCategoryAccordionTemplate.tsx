import * as React from "react";
import * as styles from "./ComponentCategoryAccordionTemplate.module.css";
import { categories, TCategories } from "../../../data/categories";
import { LayerAccordion } from "../layerAccordion/LayerAccordionTemplate";
import { LayerAccordionFiltersTemplate } from "../layerAccordion/filters/LayerAccordionFiltersTemplate";
import { Button } from "@gemeente-denhaag/button";
import { baseFilters, FiltersContext } from "../../../context/filters";
import clsx from "clsx";
import { navigate } from "gatsby";
import _ from "lodash";
import { ComponentCategoryAccordionHeaderTemplate } from "./header/ComponentCategoryAccordionHeaderTemplate";

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
          { label: "Interaction", handleClick: setOpenInteraction, active: openInteraction },
          { label: "Process", handleClick: setOpenProcess, active: openProcess },
          { label: "Integration", handleClick: setOpenIntegration, active: openIntegration },
          { label: "Service", handleClick: setOpenServices, active: openServices },
          { label: "Data", handleClick: setOpenData, active: openData },
        ]}
      />

      <Accordion
        open={openInteraction}
        setOpen={setOpenInteraction}
        color="#1a75ff"
        header={<ComponentCategoryAccordionHeaderTemplate title="Interactie" active={openInteraction} />}
      >
        <Categories layer="Interactie" />
      </Accordion>

      <Accordion
        open={openProcess}
        setOpen={setOpenProcess}
        color="#dd3c49"
        header={<ComponentCategoryAccordionHeaderTemplate title="Proces" active={openProcess} />}
      >
        <Categories layer="Proces" />
      </Accordion>

      <Accordion
        open={openIntegration}
        setOpen={setOpenIntegration}
        color="#efc025"
        header={<ComponentCategoryAccordionHeaderTemplate title="Integratie" active={openIntegration} />}
      >
        <Categories layer="Integratie" />
      </Accordion>

      <Accordion
        open={openServices}
        setOpen={setOpenServices}
        color="#69b090"
        header={<ComponentCategoryAccordionHeaderTemplate title="Services" active={openServices} />}
      >
        <Categories layer="Service" />
      </Accordion>

      <Accordion
        open={openData}
        setOpen={setOpenData}
        color="#7a51c8"
        header={<ComponentCategoryAccordionHeaderTemplate title="Data" active={openData} />}
      >
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
      {categories[layer].map((category, idx) => (
        <Button
          key={idx}
          className={clsx(styles[_.camelCase(`${layer} category`)], styles.categoryButton)}
          variant="secondary-action"
          icon={category.icon}
          onClick={() => {
            setFilters({ ...baseFilters, category: _.lowerCase(category?.value) });
            navigate("/components");
          }}
        >
          {category.title}
        </Button>
      ))}
    </div>
  );
};
