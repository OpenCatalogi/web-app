import * as React from "react";
import * as styles from "./CardsSearchTemplate.module.css";
import { getTokenValue } from "../../../services/getTokenValue";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { TCategories } from "../../../data/categories";
import { ComponentCard } from "../../../components/componentCard/ComponentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { LayerAccordion } from "../layerAccordion/LayerAccordionTemplate";
import { LayerAccordionFiltersTemplate } from "../layerAccordion/filters/LayerAccordionFiltersTemplate";

interface CardsSearchTemplateProps {
  components: any[];
}

export const CardsSearchTemplate: React.FC<CardsSearchTemplateProps> = ({ components }) => {
  const Accordion = LayerAccordion.accordion;
  const AccordionCardsController = LayerAccordion.controller;
  const { t } = useTranslation();

  const { open: openInteraction, setOpen: setOpenInteraction } = AccordionCardsController();
  const { open: openProcess, setOpen: setOpenProcess } = AccordionCardsController();
  const { open: openIntegration, setOpen: setOpenIntegration } = AccordionCardsController();
  const { open: openServices, setOpen: setOpenServices } = AccordionCardsController();
  const { open: openData, setOpen: setOpenData } = AccordionCardsController();

  const interaction = components.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Interaction");
  });
  const process = components.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Process");
  });
  const intergration = components.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Integration");
  });
  const services = components.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Service");
  });
  const data = components.filter((component) => {
    return t(_.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType)) === t("Data");
  });

  return (
    <>
      <LayerAccordionFiltersTemplate
        items={[
          {
            label: "Interactie",
            handleClick: setOpenInteraction,
            active: openInteraction,
            badgeNumber: interaction.length,
          },
          { label: "Proces", handleClick: setOpenProcess, active: openProcess, badgeNumber: process.length },
          {
            label: "Integratie",
            handleClick: setOpenIntegration,
            active: openIntegration,
            badgeNumber: intergration.length,
          },
          { label: "Service", handleClick: setOpenServices, active: openServices, badgeNumber: services.length },
          { label: "Data", handleClick: setOpenData, active: openData, badgeNumber: data.length },
        ]}
      />

      <Accordion
        title="Interaction"
        open={interaction.length > 0 && openInteraction}
        setOpen={setOpenInteraction}
        color={getTokenValue(styles.layerColorInteraction)}
        badgeNumber={interaction.length}
      >
        <Components components={interaction} layer="Interactie" />
      </Accordion>

      <Accordion
        title="Process"
        open={process.length > 0 && openProcess}
        setOpen={setOpenProcess}
        color={getTokenValue(styles.layerColorProcess)}
        badgeNumber={process.length}
      >
        <Components components={process} layer="Proces" />
      </Accordion>
      <Accordion
        title="Integration"
        open={intergration.length > 0 && openIntegration}
        setOpen={setOpenIntegration}
        color={getTokenValue(styles.layerColorIntegration)}
        badgeNumber={intergration.length}
      >
        <Components components={intergration} layer="Integratie" />
      </Accordion>

      <Accordion
        title="Services"
        open={services.length > 0 && openServices}
        setOpen={setOpenServices}
        color={getTokenValue(styles.layerColorServices)}
        badgeNumber={services.length}
      >
        <Components components={services} layer="Service" />
      </Accordion>

      <Accordion
        title="Data"
        open={data.length > 0 && openData}
        setOpen={setOpenData}
        color={getTokenValue(styles.layerColorData)}
        badgeNumber={data.length}
      >
        <Components components={data} layer="Data" />
      </Accordion>
    </>
  );
};

interface ComponentsProps {
  layer: TCategories;
  components: any[];
}

const Components: React.FC<ComponentsProps> = ({ layer, components }) => {
  return (
    <div className={styles.ComponentsGrid}>
      {components.map((component, idx) => (
        <ComponentCard
          key={idx}
          title={{ label: component.name, href: `/components/${component.id}` }}
          description={component.embedded?.description?.shortDescription}
          layer={component.embedded?.nl.embedded?.commonground.layerType}
          category={{ label: "functie autorisatie", icon: <FontAwesomeIcon icon={faLock} /> }}
          tags={{
            status: component.developmentStatus,
            installations: component.usedBy?.length(),
            organisation: component?.embedded?.legal?.embedded?.repoOwner.name,
            licence: component?.embedded?.legal?.license,
            githubLink: component?.embedded?.url?.url,
          }}
        />
      ))}
    </div>
  );
};
