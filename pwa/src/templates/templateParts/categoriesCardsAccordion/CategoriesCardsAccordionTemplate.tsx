import * as React from "react";
import * as styles from "./CategoriesCardsAccordionTemplate.module.css";
import { getTokenValue } from "../../../services/getTokenValue";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { LayerAccordion } from "../layerAccordion/LayerAccordionTemplate";
import { LayerAccordionFiltersTemplate } from "../layerAccordion/filters/LayerAccordionFiltersTemplate";
import { CategoriesCardsAccordionHeaderTemplate } from "./header/CategoriesCardsAccordionHeaderTemplate";
import { CategoryCard } from "../../../components/categoryCard/CategoryCard";
import { TEMPORARY_PORTFOLIOS } from "../../../data/portfolio";

interface CategoriesardsAccordionProps {
  categories: any[];
}

export const CategoriesardsAccordionTemplate: React.FC<CategoriesardsAccordionProps> = ({ categories }) => {
  const Accordion = LayerAccordion.accordion;
  const AccordionCardsController = LayerAccordion.controller;
  const { t } = useTranslation();

  const { open: openInteraction, setOpen: setOpenInteraction } = AccordionCardsController();
  const { open: openProcess, setOpen: setOpenProcess } = AccordionCardsController();
  const { open: openIntegration, setOpen: setOpenIntegration } = AccordionCardsController();
  const { open: openServices, setOpen: setOpenServices } = AccordionCardsController();
  const { open: openData, setOpen: setOpenData } = AccordionCardsController();

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
        header={<CategoriesCardsAccordionHeaderTemplate title="Interactie" active={openInteraction} />}
      >
        <Categories categories={categories} />
      </Accordion>

      <Accordion
        open={openProcess}
        setOpen={setOpenProcess}
        color="#dd3c49"
        header={<CategoriesCardsAccordionHeaderTemplate title="Proces" active={openProcess} />}
      >
        <Categories categories={categories} />
      </Accordion>

      <Accordion
        open={openIntegration}
        setOpen={setOpenIntegration}
        color="#efc025"
        header={<CategoriesCardsAccordionHeaderTemplate title="Integratie" active={openIntegration} />}
      >
        <Categories categories={categories} />
      </Accordion>

      <Accordion
        open={openServices}
        setOpen={setOpenServices}
        color="#69b090"
        header={<CategoriesCardsAccordionHeaderTemplate title="Services" active={openServices} />}
      >
        <Categories categories={categories} />
      </Accordion>

      <Accordion
        open={openData}
        setOpen={setOpenData}
        color="#7a51c8"
        header={<CategoriesCardsAccordionHeaderTemplate title="Data" active={openData} />}
      >
        <Categories categories={categories} />
      </Accordion>
    </>
  );
};

interface CategoriesProps {
  categories: any[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className={styles.ComponentsGrid}>
      {categories.map((category, idx) => (
        <CategoryCard
          key={idx}
          title={{ label: category.title, href: `/categories/${category.id}` }}
          description={category.description}
          icon={category.icon}
          domain={"domain"}
        />
      ))}
      {/* {components.map((component, idx) => (
        <ComponentCard
          key={idx}
          title={{ label: component.name, href: `/components/${component.id}` }}
          description={component.embedded?.description?.shortDescription}
          layer={component.embedded?.nl.embedded?.commonground.layerType}
          category={{ label: "functie autorisatie", icon: <FontAwesomeIcon icon={faLock} /> }}
          tags={{
            status: component.developmentStatus,
            installations: component.usedBy?.length.toString() ?? "0",
            organization: component.embedded?.url?.embedded?.organisation?.name,
            licence: component?.embedded?.legal?.license,
            githubLink: component?.embedded?.url?.url,
          }}
        />
      ))} */}
    </div>
  );
};
