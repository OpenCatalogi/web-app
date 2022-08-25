import * as React from "react";
import * as styles from "./CardsSearchTemplate.module.css";
import { LayerAccordionCards } from "../layerAccordionCards/LayerAccordionCardsTemplate";
import { getTokenValue } from "../../../services/getTokenValue";
import { LayerAccordionCardsFiltersTemplate } from "../layerAccordionCards/filters/LayerAccordionCardsFiltersTemplate";
import _ from "lodash";
import { useTranslation } from "react-i18next";

interface CardsSearchTemplateProps {
  components: any[];
}

export const CardsSearchTemplate: React.FC<CardsSearchTemplateProps> = ({ components }) => {
  const Accordion = LayerAccordionCards.accordion;
  const AccordionCardsController = LayerAccordionCards.controller;
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
      <LayerAccordionCardsFiltersTemplate
        items={[
          { label: "Interactie", handleClick: setOpenInteraction, active: openInteraction, count: interaction.length },
          { label: "Proces", handleClick: setOpenProcess, active: openProcess, count: process.length },
          { label: "Integratie", handleClick: setOpenIntegration, active: openIntegration, count: intergration.length },
          { label: "Service", handleClick: setOpenServices, active: openServices, count: services.length },
          { label: "Data", handleClick: setOpenData, active: openData, count: data.length },
        ]}
      />

      <Accordion
        title="Interaction"
        open={interaction.length > 0 && openInteraction}
        setOpen={setOpenInteraction}
        color={getTokenValue(styles.layerColorInteraction)}
        components={interaction}
      />

      <Accordion
        title="Process"
        open={process.length > 0 && openProcess}
        setOpen={setOpenProcess}
        color={getTokenValue(styles.layerColorProcess)}
        components={process}
      />

      <Accordion
        title="Integration"
        open={intergration.length > 0 && openIntegration}
        setOpen={setOpenIntegration}
        color={getTokenValue(styles.layerColorIntegration)}
        components={intergration}
      />

      <Accordion
        title="Services"
        open={services.length > 0 && openServices}
        setOpen={setOpenServices}
        color={getTokenValue(styles.layerColorServices)}
        components={services}
      />

      <Accordion
        title="Data"
        open={data.length > 0 && openData}
        setOpen={setOpenData}
        color={getTokenValue(styles.layerColorData)}
        components={data}
      />
    </>
  );
};
