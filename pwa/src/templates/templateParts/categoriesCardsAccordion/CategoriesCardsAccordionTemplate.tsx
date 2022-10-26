import * as React from "react";
import * as styles from "./CategoriesCardsAccordionTemplate.module.css";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { CategoriesAccordion } from "../categoriesAccordion/CategoriesAccordionTemplate";
import { CategoriesAccordionFiltersTemplate } from "../categoriesAccordion/filters/CategoriesAccordionFiltersTemplate";
import { CategoriesCardsAccordionHeaderTemplate } from "./header/CategoriesCardsAccordionHeaderTemplate";
import { CategoryCard } from "../../../components/categoryCard/CategoryCard";

interface CategoriesardsAccordionProps {
  categories: any[];
}

export const CategoriesardsAccordionTemplate: React.FC<CategoriesardsAccordionProps> = ({ categories }) => {
  const Accordion = CategoriesAccordion.accordion;
  const AccordionCardsController = CategoriesAccordion.controller;
  const { t } = useTranslation();

  const { open: openGovernance, setOpen: setOpenGovernance } = AccordionCardsController();
  const { open: openSocial, setOpen: setOpenSocial } = AccordionCardsController();
  const { open: openSpace, setOpen: setOpenSpace } = AccordionCardsController();
  const { open: openPublicServices, setOpen: setOpenPublicServices } = AccordionCardsController();
  const { open: openPublicOrderAndSafety, setOpen: setOpenPublicOrderAndSafety } = AccordionCardsController();
  const { open: openSupport, setOpen: setOpenSupport } = AccordionCardsController();

  return (
    <>
      <CategoriesAccordionFiltersTemplate
        items={[
          { label: "Bestuur", handleClick: setOpenGovernance, active: openGovernance },
          { label: "Sociaal", handleClick: setOpenSocial, active: openSocial },
          { label: "Ruimte", handleClick: setOpenSpace, active: openSpace },
          { label: "Publieksdiensten", handleClick: setOpenPublicServices, active: openPublicServices },
          {
            label: "Openbare orde en veiligheid",
            handleClick: setOpenPublicOrderAndSafety,
            active: openPublicOrderAndSafety,
          },
          { label: "Ondersteuning", handleClick: setOpenSupport, active: openSupport },
        ]}
      />

      <Accordion
        open={openGovernance}
        setOpen={setOpenGovernance}
        header={<CategoriesCardsAccordionHeaderTemplate title="Bestuur" active={openGovernance} />}
      >
        <Categories {...{ categories }} />
      </Accordion>

      <Accordion
        open={openSocial}
        setOpen={setOpenSocial}
        header={<CategoriesCardsAccordionHeaderTemplate title="Sociaal" active={openSocial} />}
      >
        <Categories {...{ categories }} />
      </Accordion>

      <Accordion
        open={openSpace}
        setOpen={setOpenSpace}
        header={<CategoriesCardsAccordionHeaderTemplate title="Ruimte" active={openSpace} />}
      >
        <Categories {...{ categories }} />
      </Accordion>

      <Accordion
        open={openPublicServices}
        setOpen={setOpenPublicServices}
        header={<CategoriesCardsAccordionHeaderTemplate title="Publieksdiensten" active={openPublicServices} />}
      >
        <Categories {...{ categories }} />
      </Accordion>

      <Accordion
        open={openPublicOrderAndSafety}
        setOpen={setOpenPublicOrderAndSafety}
        header={
          <CategoriesCardsAccordionHeaderTemplate
            title="Openbare orde en veiligheid"
            active={openPublicOrderAndSafety}
          />
        }
      >
        <Categories {...{ categories }} />
      </Accordion>

      <Accordion
        open={openSupport}
        setOpen={setOpenSupport}
        header={<CategoriesCardsAccordionHeaderTemplate title="Ondersteuning" active={openSupport} />}
      >
        <Categories {...{ categories }} />
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
    </div>
  );
};
