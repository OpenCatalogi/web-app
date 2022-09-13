import * as React from "react";
import * as styles from "./ComponentCardsAccordionTemplate.module.css";
import { getTokenValue } from "../../../services/getTokenValue";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { ComponentCard } from "../../../components/componentCard/ComponentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { LayerAccordion } from "../layerAccordion/LayerAccordionTemplate";
import { LayerAccordionFiltersTemplate } from "../layerAccordion/filters/LayerAccordionFiltersTemplate";
import { ComponentCardsAccordionHeaderTemplate } from "./header/ComponentCardsAccordionHeaderTemplate";

interface ComponentCardsAccordionProps {
  components: any[];
}

export const ComponentCardsAccordionTemplate: React.FC<ComponentCardsAccordionProps> = ({ components }) => {
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
  const integration = components.filter((component) => {
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
            badgeNumber: integration.length,
          },
          { label: "Service", handleClick: setOpenServices, active: openServices, badgeNumber: services.length },
          { label: "Data", handleClick: setOpenData, active: openData, badgeNumber: data.length },
        ]}
      />

      <Accordion
        open={openInteraction}
        setOpen={setOpenInteraction}
        color={getTokenValue(styles.layerColorInteraction)}
        disabled={interaction.length === 0}
        header={
          <ComponentCardsAccordionHeaderTemplate
            title="Interaction"
            active={openInteraction}
            badgeNumber={interaction.length}
          />
        }
      >
        <Components components={interaction} />
      </Accordion>

      <Accordion
        open={openProcess}
        setOpen={setOpenProcess}
        color={getTokenValue(styles.layerColorProcess)}
        disabled={process.length === 0}
        header={
          <ComponentCardsAccordionHeaderTemplate title="Process" active={openProcess} badgeNumber={process.length} />
        }
      >
        <Components components={process} />
      </Accordion>

      <Accordion
        open={openIntegration}
        setOpen={setOpenIntegration}
        color={getTokenValue(styles.layerColorIntegration)}
        disabled={integration.length === 0}
        header={
          <ComponentCardsAccordionHeaderTemplate
            title="Integration"
            active={openIntegration}
            badgeNumber={integration.length}
          />
        }
      >
        <Components components={integration} />
      </Accordion>

      <Accordion
        open={openServices}
        setOpen={setOpenServices}
        color={getTokenValue(styles.layerColorServices)}
        disabled={services.length === 0}
        header={
          <ComponentCardsAccordionHeaderTemplate title="Services" active={openServices} badgeNumber={services.length} />
        }
      >
        <Components components={services} />
      </Accordion>

      <Accordion
        open={openData}
        setOpen={setOpenData}
        color={getTokenValue(styles.layerColorData)}
        disabled={data.length === 0}
        header={<ComponentCardsAccordionHeaderTemplate title="Data" active={openData} badgeNumber={data.length} />}
      >
        <Components components={data} />
      </Accordion>
    </>
  );
};

interface ComponentsProps {
  components: any[];
}

const Components: React.FC<ComponentsProps> = ({ components }) => {
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
            installations: component.usedBy?.length,
            organization: component?.embedded?.legal?.embedded?.repoOwner.name,
            licence: component?.embedded?.legal?.license,
            githubLink: component?.embedded?.url?.url,
          }}
        />
      ))}
    </div>
  );
};
