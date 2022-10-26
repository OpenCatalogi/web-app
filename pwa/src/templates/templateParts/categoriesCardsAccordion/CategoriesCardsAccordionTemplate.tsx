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

  const support = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Support");
  });
  const governance = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Governance");
  });
  const social = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Social");
  });
  const space = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Space");
  });
  const publicServices = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Public services");
  });
  const publicOrderAndSafety = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Pulbic order and safety");
  });

  return (
    <>
      <CategoriesAccordionFiltersTemplate
        items={[
          { label: "Ondersteuning", handleClick: setOpenSupport, active: openSupport, disabled: !support.length },
          { label: "Bestuur", handleClick: setOpenGovernance, active: openGovernance, disabled: !governance.length },
          { label: "Sociaal", handleClick: setOpenSocial, active: openSocial, disabled: !social.length },
          { label: "Ruimte", handleClick: setOpenSpace, active: openSpace, disabled: !space.length },
          {
            label: "Publieksdiensten",
            handleClick: setOpenPublicServices,
            active: openPublicServices,
            disabled: !publicServices.length,
          },
          {
            label: "Openbare orde en veiligheid",
            handleClick: setOpenPublicOrderAndSafety,
            active: openPublicOrderAndSafety,
            disabled: !publicOrderAndSafety.length,
          },
        ]}
      />

      <Accordion
        open={openSupport}
        setOpen={setOpenSupport}
        header={
          <CategoriesCardsAccordionHeaderTemplate
            title="Ondersteuning"
            active={openSupport}
            badgeNumber={support.length}
          />
        }
      >
        <Categories categories={support} />
      </Accordion>

      <Accordion
        open={openGovernance}
        setOpen={setOpenGovernance}
        header={
          <CategoriesCardsAccordionHeaderTemplate
            title="Bestuur"
            active={openGovernance}
            badgeNumber={governance.length}
          />
        }
      >
        <Categories categories={governance} />
      </Accordion>

      <Accordion
        open={openSocial}
        setOpen={setOpenSocial}
        header={
          <CategoriesCardsAccordionHeaderTemplate title="Sociaal" active={openSocial} badgeNumber={social.length} />
        }
      >
        <Categories categories={social} />
      </Accordion>

      <Accordion
        open={openSpace}
        setOpen={setOpenSpace}
        header={<CategoriesCardsAccordionHeaderTemplate title="Ruimte" active={openSpace} badgeNumber={space.length} />}
      >
        <Categories categories={space} />
      </Accordion>

      <Accordion
        open={openPublicServices}
        setOpen={setOpenPublicServices}
        header={
          <CategoriesCardsAccordionHeaderTemplate
            title="Publieksdiensten"
            active={openPublicServices}
            badgeNumber={publicServices.length}
          />
        }
      >
        <Categories categories={publicServices} />
      </Accordion>

      <Accordion
        open={openPublicOrderAndSafety}
        setOpen={setOpenPublicOrderAndSafety}
        header={
          <CategoriesCardsAccordionHeaderTemplate
            title="Openbare orde en veiligheid"
            active={openPublicOrderAndSafety}
            badgeNumber={publicOrderAndSafety.length}
          />
        }
      >
        <Categories categories={publicOrderAndSafety} />
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
          description={category.shortDescription}
          icon={category.icon}
        />
      ))}
    </div>
  );
};
