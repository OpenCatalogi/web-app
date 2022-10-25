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

  const interaction = categories.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Interaction");
  });
  const process = categories.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Process");
  });
  const integration = categories.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Integration");
  });
  const services = categories.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Service");
  });
  const data = categories.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Data");
  });

  return (
    <>
      <LayerAccordionFiltersTemplate
        items={[
          {
            label: "Interaction",
            handleClick: setOpenInteraction,
            active: openInteraction,
            disabled: !interaction.length,
          },
          { label: "Process", handleClick: setOpenProcess, active: openProcess, disabled: !process.length },
          {
            label: "Integration",
            handleClick: setOpenIntegration,
            active: openIntegration,
            disabled: !integration.length,
          },
          { label: "Service", handleClick: setOpenServices, active: openServices, disabled: !services.length },
          { label: "Data", handleClick: setOpenData, active: openData, disabled: !data.length },
        ]}
      />

      <Accordion
        open={openInteraction}
        setOpen={setOpenInteraction}
        color={getTokenValue(styles.layerColorInteraction)}
        disabled={!interaction.length}
        header={
          <CategoriesCardsAccordionHeaderTemplate
            title="Interaction"
            active={openInteraction}
            badgeNumber={interaction.length}
          />
        }
      >
        <Categories categories={categories} />
      </Accordion>

      <Accordion
        open={openProcess}
        setOpen={setOpenProcess}
        color={getTokenValue(styles.layerColorProcess)}
        disabled={!process.length}
        header={
          <CategoriesCardsAccordionHeaderTemplate title="Process" active={openProcess} badgeNumber={process.length} />
        }
      >
        <Categories categories={categories} />
      </Accordion>

      <Accordion
        open={openIntegration}
        setOpen={setOpenIntegration}
        color={getTokenValue(styles.layerColorIntegration)}
        disabled={!integration.length}
        header={
          <CategoriesCardsAccordionHeaderTemplate
            title="Integration"
            active={openIntegration}
            badgeNumber={integration.length}
          />
        }
      >
        <Categories categories={categories} />
      </Accordion>

      <Accordion
        open={openServices}
        setOpen={setOpenServices}
        color={getTokenValue(styles.layerColorServices)}
        disabled={!services.length}
        header={
          <CategoriesCardsAccordionHeaderTemplate
            title="Services"
            active={openServices}
            badgeNumber={services.length}
          />
        }
      >
        <Categories categories={categories} />
      </Accordion>

      <Accordion
        open={openData}
        setOpen={setOpenData}
        color={getTokenValue(styles.layerColorData)}
        disabled={!data.length}
        header={<CategoriesCardsAccordionHeaderTemplate title="Data" active={openData} badgeNumber={data.length} />}
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
