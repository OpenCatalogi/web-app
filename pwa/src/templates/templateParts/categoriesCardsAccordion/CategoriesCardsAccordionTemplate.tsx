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

  const { open: openControl, setOpen: setOpenControl } = AccordionCardsController();
  const { open: openDevelopment, setOpen: setOpenDevelopment } = AccordionCardsController();
  const { open: openSurveillance, setOpen: setOpenSurveillance } = AccordionCardsController();
  const { open: openDirecting, setOpen: setOpenDirecting } = AccordionCardsController();
  const { open: openCustomerAndChainInteraction, setOpen: setOpenCustomerAndChainInteraction } =
    AccordionCardsController();
  const { open: openExecution, setOpen: setOpenExecution } = AccordionCardsController();
  const { open: openSupport, setOpen: setOpenSupport } = AccordionCardsController();

  const Control = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Control");
  });
  const Development = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Development");
  });
  const Surveillance = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Surveillance");
  });
  const Directing = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Directing");
  });
  const CustomerAndChainInteraction = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Customer and chain interaction");
  });
  const Execution = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Execution");
  });
  const support = categories.filter((category) => {
    return t(_.upperFirst(category.domain)) === t("Support");
  });

  return (
    <>
      <CategoriesAccordionFiltersTemplate
        items={[
          { label: t("Control"), handleClick: setOpenControl, active: openControl, disabled: !Control.length },
          {
            label: t("Development"),
            handleClick: setOpenDevelopment,
            active: openDevelopment,
            disabled: !Development.length,
          },
          {
            label: t("Surveillance"),
            handleClick: setOpenSurveillance,
            active: openSurveillance,
            disabled: !Surveillance.length,
          },
          {
            label: t("Directing"),
            handleClick: setOpenDirecting,
            active: openDirecting,
            disabled: !Directing.length,
          },
          {
            label: t("Customer and chain interaction"),
            handleClick: setOpenCustomerAndChainInteraction,
            active: openCustomerAndChainInteraction,
            disabled: !CustomerAndChainInteraction.length,
          },
          {
            label: t("Execution"),
            handleClick: setOpenExecution,
            active: openExecution,
            disabled: !Execution.length,
          },
          { label: t("Support"), handleClick: setOpenSupport, active: openSupport, disabled: !support.length },
        ]}
      />
      <div id="Control">
        <Accordion
          open={openControl}
          setOpen={setOpenControl}
          header={
            <CategoriesCardsAccordionHeaderTemplate
              title={t("Control")}
              active={openControl}
              badgeNumber={Control.length}
            />
          }
        >
          <Categories categories={Control} />
        </Accordion>
      </div>

      <div id="Development">
        <Accordion
          open={openDevelopment}
          setOpen={setOpenDevelopment}
          header={
            <CategoriesCardsAccordionHeaderTemplate
              title={t("Development")}
              active={openDevelopment}
              badgeNumber={Development.length}
            />
          }
        >
          <Categories categories={Development} />
        </Accordion>
      </div>

      <div id="Surveillance">
        <Accordion
          open={openSurveillance}
          setOpen={setOpenSurveillance}
          header={
            <CategoriesCardsAccordionHeaderTemplate
              title={t("Surveillance")}
              active={openSurveillance}
              badgeNumber={Surveillance.length}
            />
          }
        >
          <Categories categories={Surveillance} />
        </Accordion>
      </div>

      <div id="Directing">
        <Accordion
          open={openDirecting}
          setOpen={setOpenDirecting}
          header={
            <CategoriesCardsAccordionHeaderTemplate
              title={t("Directing")}
              active={openDirecting}
              badgeNumber={Directing.length}
            />
          }
        >
          <Categories categories={Directing} />
        </Accordion>
      </div>

      <div id="Customer and chain interaction">
        <Accordion
          open={openCustomerAndChainInteraction}
          setOpen={setOpenCustomerAndChainInteraction}
          header={
            <CategoriesCardsAccordionHeaderTemplate
              title={t("Customer and chain interaction")}
              active={openCustomerAndChainInteraction}
              badgeNumber={CustomerAndChainInteraction.length}
            />
          }
        >
          <Categories categories={CustomerAndChainInteraction} />
        </Accordion>
      </div>

      <div id="Execution">
        <Accordion
          open={openExecution}
          setOpen={setOpenExecution}
          header={
            <CategoriesCardsAccordionHeaderTemplate
              title={t("Execution")}
              active={openExecution}
              badgeNumber={Execution.length}
            />
          }
        >
          <Categories categories={Execution} />
        </Accordion>
      </div>

      <div id="Support">
        <Accordion
          open={openSupport}
          setOpen={setOpenSupport}
          header={
            <CategoriesCardsAccordionHeaderTemplate
              title={t("Support")}
              active={openSupport}
              badgeNumber={support.length}
            />
          }
        >
          <Categories categories={support} />
        </Accordion>
      </div>
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
